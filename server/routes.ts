// Reference: javascript_stripe, javascript_log_in_with_replit, and javascript_openai blueprints
import type { Express } from "express";
import { createServer, type Server } from "http";
import Stripe from "stripe";
import { storage } from "./storage";
import { setupAuth, isAuthenticated } from "./replitAuth";
import { generateChatResponse } from "./ai";
import type { InsertChatMessage } from "@shared/schema";

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('Missing required Stripe secret: STRIPE_SECRET_KEY');
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2023-10-16",
});

export async function registerRoutes(app: Express): Promise<Server> {
  // Auth middleware
  await setupAuth(app);

  // Auth routes
  app.get('/api/auth/user', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const user = await storage.getUser(userId);
      res.json(user);
    } catch (error) {
      console.error("Error fetching user:", error);
      res.status(500).json({ message: "Failed to fetch user" });
    }
  });

  // Create Stripe Customer Portal session
  app.post('/api/create-customer-portal-session', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const user = await storage.getUser(userId);

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      if (!user.stripeCustomerId) {
        return res.status(400).json({ message: "No Stripe customer found. Please subscribe first." });
      }

      // Determine the return URL based on environment
      let returnUrl = 'http://localhost:5000/dashboard?from=portal';
      if (req.headers.origin) {
        returnUrl = `${req.headers.origin}/dashboard?from=portal`;
      } else if (process.env.REPL_SLUG && process.env.REPL_OWNER) {
        returnUrl = `https://${process.env.REPL_SLUG}.${process.env.REPL_OWNER}.repl.co/dashboard?from=portal`;
      }

      // Create portal session
      const session = await stripe.billingPortal.sessions.create({
        customer: user.stripeCustomerId,
        return_url: returnUrl,
      });

      res.json({ url: session.url });
    } catch (error: any) {
      console.error("Customer portal error:", error);
      return res.status(400).json({ error: { message: error.message } });
    }
  });

  // Stripe subscription route
  app.post('/api/get-or-create-subscription', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      let user = await storage.getUser(userId);

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      // If user already has a subscription, return it
      if (user.stripeSubscriptionId) {
        const subscription = await stripe.subscriptions.retrieve(user.stripeSubscriptionId);
        const invoice = subscription.latest_invoice;
        
        let clientSecret = null;
        if (typeof invoice === 'object' && invoice !== null) {
          const paymentIntent = invoice.payment_intent;
          if (typeof paymentIntent === 'object' && paymentIntent !== null) {
            clientSecret = paymentIntent.client_secret;
          }
        }

        return res.json({
          subscriptionId: subscription.id,
          clientSecret,
        });
      }

      if (!user.email) {
        throw new Error('No user email on file');
      }

      // Create Stripe customer
      const customer = await stripe.customers.create({
        email: user.email,
        name: `${user.firstName || ''} ${user.lastName || ''}`.trim() || user.email,
      });

      // Create subscription - using a test price for now
      // In production, you would use a real Stripe Price ID
      const subscription = await stripe.subscriptions.create({
        customer: customer.id,
        items: [{
          price_data: {
            currency: 'usd',
            product_data: {
              name: 'Year-Round Property Maintenance',
              description: 'Snow removal, lawn care, and seasonal cleanups',
            },
            recurring: {
              interval: 'month',
            },
            unit_amount: 18800, // $188.00
          },
        }],
        payment_behavior: 'default_incomplete',
        payment_settings: { save_default_payment_method: 'on_subscription' },
        expand: ['latest_invoice.payment_intent'],
      });

      // Update user with Stripe info
      await storage.updateUserStripeInfo(
        user.id,
        customer.id,
        subscription.id,
        subscription.status
      );

      const invoice = subscription.latest_invoice;
      let clientSecret = null;
      if (typeof invoice === 'object' && invoice !== null) {
        const paymentIntent = invoice.payment_intent;
        if (typeof paymentIntent === 'object' && paymentIntent !== null) {
          clientSecret = paymentIntent.client_secret;
        }
      }

      res.json({
        subscriptionId: subscription.id,
        clientSecret,
      });
    } catch (error: any) {
      console.error("Subscription error:", error);
      return res.status(400).json({ error: { message: error.message } });
    }
  });

  // Service types routes
  app.get('/api/service-types', async (req, res) => {
    try {
      const serviceTypes = await storage.getAllServiceTypes();
      res.json(serviceTypes);
    } catch (error) {
      console.error("Error fetching service types:", error);
      res.status(500).json({ message: "Failed to fetch service types" });
    }
  });

  // Add-ons routes
  app.get('/api/addons', async (req, res) => {
    try {
      const addons = await storage.getAllAddOns();
      res.json(addons);
    } catch (error) {
      console.error("Error fetching add-ons:", error);
      res.status(500).json({ message: "Failed to fetch add-ons" });
    }
  });

  // User add-ons routes
  app.get('/api/user-addons', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const userAddOns = await storage.getUserAddOns(userId);
      res.json(userAddOns);
    } catch (error) {
      console.error("Error fetching user add-ons:", error);
      res.status(500).json({ message: "Failed to fetch user add-ons" });
    }
  });

  app.post('/api/user-addons', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const { addOnId, isActive } = req.body;

      const userAddOn = await storage.createUserAddOn({
        userId,
        addOnId,
        isActive: isActive ?? true,
      });

      res.json(userAddOn);
    } catch (error) {
      console.error("Error creating user add-on:", error);
      res.status(500).json({ message: "Failed to create user add-on" });
    }
  });

  app.delete('/api/user-addons/:id', isAuthenticated, async (req, res) => {
    try {
      const { id } = req.params;
      await storage.deleteUserAddOn(id);
      res.json({ message: "Add-on removed" });
    } catch (error) {
      console.error("Error deleting user add-on:", error);
      res.status(500).json({ message: "Failed to delete user add-on" });
    }
  });

  // Bookings routes
  app.get('/api/bookings', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const bookings = await storage.getUserBookings(userId);
      res.json(bookings);
    } catch (error) {
      console.error("Error fetching bookings:", error);
      res.status(500).json({ message: "Failed to fetch bookings" });
    }
  });

  app.post('/api/bookings', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const { serviceTypeId, scheduledDate, notes } = req.body;

      const booking = await storage.createBooking({
        userId,
        serviceTypeId,
        scheduledDate: new Date(scheduledDate),
        status: 'scheduled',
        notes,
      });

      res.json(booking);
    } catch (error) {
      console.error("Error creating booking:", error);
      res.status(500).json({ message: "Failed to create booking" });
    }
  });

  app.patch('/api/bookings/:id', isAuthenticated, async (req: any, res) => {
    try {
      const { id } = req.params;
      const updates = req.body;

      const booking = await storage.updateBooking(id, updates);
      res.json(booking);
    } catch (error) {
      console.error("Error updating booking:", error);
      res.status(500).json({ message: "Failed to update booking" });
    }
  });

  app.delete('/api/bookings/:id', isAuthenticated, async (req, res) => {
    try {
      const { id } = req.params;
      await storage.deleteBooking(id);
      res.json({ message: "Booking deleted" });
    } catch (error) {
      console.error("Error deleting booking:", error);
      res.status(500).json({ message: "Failed to delete booking" });
    }
  });

  // Chat routes
  app.get('/api/chat/messages', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const conversation = await storage.getOrCreateConversation(userId);
      const messages = await storage.getConversationMessages(conversation.id);
      res.json(messages);
    } catch (error) {
      console.error("Error fetching chat messages:", error);
      res.status(500).json({ message: "Failed to fetch chat messages" });
    }
  });

  app.post('/api/chat/messages', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const { content } = req.body;

      if (!content || !content.trim()) {
        return res.status(400).json({ message: "Message content is required" });
      }

      const conversation = await storage.getOrCreateConversation(userId);

      // Save user message
      await storage.createChatMessage({
        conversationId: conversation.id,
        role: 'user',
        content: content.trim(),
      });

      // Get conversation history for context
      const messages = await storage.getConversationMessages(conversation.id);
      const chatHistory = messages.map(m => ({
        role: m.role,
        content: m.content,
      }));

      // Generate AI response
      const aiResponse = await generateChatResponse(chatHistory);

      // Save AI response
      const assistantMessage = await storage.createChatMessage({
        conversationId: conversation.id,
        role: 'assistant',
        content: aiResponse,
      });

      res.json(assistantMessage);
    } catch (error) {
      console.error("Error processing chat message:", error);
      res.status(500).json({ message: "Failed to process chat message" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
