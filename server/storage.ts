// Reference: javascript_log_in_with_replit blueprint and javascript_database blueprint
import {
  users,
  serviceTypes,
  addOns,
  userAddOns,
  bookings,
  chatConversations,
  chatMessages,
  type User,
  type UpsertUser,
  type ServiceType,
  type InsertServiceType,
  type AddOn,
  type InsertAddOn,
  type UserAddOn,
  type InsertUserAddOn,
  type Booking,
  type InsertBooking,
  type ChatConversation,
  type ChatMessage,
  type InsertChatMessage,
} from "@shared/schema";
import { db } from "./db";
import { eq, and, desc, gte } from "drizzle-orm";

export interface IStorage {
  // User operations (Required for Replit Auth)
  getUser(id: string): Promise<User | undefined>;
  upsertUser(user: UpsertUser): Promise<User>;
  updateUserStripeInfo(userId: string, stripeCustomerId: string, stripeSubscriptionId: string, subscriptionStatus: string): Promise<User>;
  
  // Service types
  getAllServiceTypes(): Promise<ServiceType[]>;
  createServiceType(serviceType: InsertServiceType): Promise<ServiceType>;
  
  // Add-ons
  getAllAddOns(): Promise<AddOn[]>;
  getAddOn(id: string): Promise<AddOn | undefined>;
  createAddOn(addOn: InsertAddOn): Promise<AddOn>;
  updateAddOn(id: string, updates: Partial<InsertAddOn>): Promise<AddOn>;
  deleteAddOn(id: string): Promise<void>;
  
  // User add-ons
  getUserAddOns(userId: string): Promise<UserAddOn[]>;
  createUserAddOn(userAddOn: InsertUserAddOn): Promise<UserAddOn>;
  deleteUserAddOn(id: string): Promise<void>;
  
  // Bookings
  getUserBookings(userId: string): Promise<Booking[]>;
  getBooking(id: string): Promise<Booking | undefined>;
  createBooking(booking: InsertBooking): Promise<Booking>;
  updateBooking(id: string, updates: Partial<InsertBooking>): Promise<Booking>;
  updateBookingStatus(id: string, status: string, completedAt?: Date): Promise<Booking>;
  deleteBooking(id: string): Promise<void>;
  
  // Chat
  getOrCreateConversation(userId: string): Promise<ChatConversation>;
  getConversationMessages(conversationId: string): Promise<ChatMessage[]>;
  createChatMessage(message: InsertChatMessage): Promise<ChatMessage>;
  deleteChatMessage(id: string): Promise<void>;
}

export class DatabaseStorage implements IStorage {
  // User operations
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async upsertUser(userData: UpsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(userData)
      .onConflictDoUpdate({
        target: users.id,
        set: {
          ...userData,
          updatedAt: new Date(),
        },
      })
      .returning();
    return user;
  }

  async updateUserStripeInfo(
    userId: string,
    stripeCustomerId: string,
    stripeSubscriptionId: string,
    subscriptionStatus: string
  ): Promise<User> {
    const [user] = await db
      .update(users)
      .set({
        stripeCustomerId,
        stripeSubscriptionId,
        subscriptionStatus,
        updatedAt: new Date(),
      })
      .where(eq(users.id, userId))
      .returning();
    return user;
  }

  // Service types
  async getAllServiceTypes(): Promise<ServiceType[]> {
    return await db.select().from(serviceTypes);
  }

  async createServiceType(serviceType: InsertServiceType): Promise<ServiceType> {
    const [created] = await db.insert(serviceTypes).values(serviceType).returning();
    return created;
  }

  // Add-ons
  async getAllAddOns(): Promise<AddOn[]> {
    return await db.select().from(addOns);
  }

  async getAddOn(id: string): Promise<AddOn | undefined> {
    const [addon] = await db.select().from(addOns).where(eq(addOns.id, id));
    return addon;
  }

  async createAddOn(addOn: InsertAddOn): Promise<AddOn> {
    const [created] = await db.insert(addOns).values(addOn).returning();
    return created;
  }

  async updateAddOn(id: string, updates: Partial<InsertAddOn>): Promise<AddOn> {
    const [updated] = await db
      .update(addOns)
      .set({ ...updates })
      .where(eq(addOns.id, id))
      .returning();
    return updated;
  }

  async deleteAddOn(id: string): Promise<void> {
    await db.delete(addOns).where(eq(addOns.id, id));
  }

  // User add-ons
  async getUserAddOns(userId: string): Promise<UserAddOn[]> {
    return await db
      .select()
      .from(userAddOns)
      .where(and(eq(userAddOns.userId, userId), eq(userAddOns.isActive, true)));
  }

  async createUserAddOn(userAddOn: InsertUserAddOn): Promise<UserAddOn> {
    const [created] = await db.insert(userAddOns).values(userAddOn).returning();
    return created;
  }

  async deleteUserAddOn(id: string): Promise<void> {
    await db
      .update(userAddOns)
      .set({ isActive: false })
      .where(eq(userAddOns.id, id));
  }

  // Bookings
  async getUserBookings(userId: string): Promise<Booking[]> {
    return await db
      .select()
      .from(bookings)
      .where(eq(bookings.userId, userId))
      .orderBy(desc(bookings.scheduledDate));
  }

  async getBooking(id: string): Promise<Booking | undefined> {
    const [booking] = await db.select().from(bookings).where(eq(bookings.id, id));
    return booking;
  }

  async createBooking(booking: InsertBooking): Promise<Booking> {
    const [created] = await db.insert(bookings).values(booking).returning();
    return created;
  }

  async updateBooking(id: string, updates: Partial<InsertBooking>): Promise<Booking> {
    const [updated] = await db
      .update(bookings)
      .set({ ...updates })
      .where(eq(bookings.id, id))
      .returning();
    return updated;
  }

  async updateBookingStatus(id: string, status: string, completedAt?: Date): Promise<Booking> {
    const [updated] = await db
      .update(bookings)
      .set({ status, completedAt })
      .where(eq(bookings.id, id))
      .returning();
    return updated;
  }

  async deleteBooking(id: string): Promise<void> {
    await db.delete(bookings).where(eq(bookings.id, id));
  }

  // Chat
  async getOrCreateConversation(userId: string): Promise<ChatConversation> {
    const [existing] = await db
      .select()
      .from(chatConversations)
      .where(eq(chatConversations.userId, userId))
      .limit(1);

    if (existing) {
      return existing;
    }

    const [created] = await db
      .insert(chatConversations)
      .values({ userId })
      .returning();
    return created;
  }

  async getConversationMessages(conversationId: string): Promise<ChatMessage[]> {
    return await db
      .select()
      .from(chatMessages)
      .where(eq(chatMessages.conversationId, conversationId))
      .orderBy(chatMessages.createdAt);
  }

  async createChatMessage(message: InsertChatMessage): Promise<ChatMessage> {
    const [created] = await db.insert(chatMessages).values(message).returning();
    return created;
  }

  async deleteChatMessage(id: string): Promise<void> {
    await db.delete(chatMessages).where(eq(chatMessages.id, id));
  }
}

export const storage = new DatabaseStorage();
