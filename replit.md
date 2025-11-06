# Walks & Lawns - Year-Round Property Maintenance Service

## Overview

Walks & Lawns is a subscription-based property maintenance service platform for Edmonton, Alberta homeowners. The application provides year-round automated property care including snow removal, lawn mowing, and seasonal cleanups through a single monthly subscription ($188/month). The platform features automated service scheduling via AI, Stripe payment integration, and a comprehensive customer dashboard for managing subscriptions and service history.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Technology Stack:**
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite for fast development and optimized production builds
- **Routing**: Wouter for lightweight client-side routing
- **UI Library**: shadcn/ui components built on Radix UI primitives
- **Styling**: Tailwind CSS with custom design system following "new-york" style preset

**Design System:**
- Custom color scheme using CSS variables for theming support
- Typography: Inter font family from Google Fonts
- Component library includes 40+ pre-built UI components (buttons, cards, forms, dialogs, etc.)
- Responsive design with mobile-first approach
- Design guidelines emphasize professional yet approachable aesthetic inspired by Airbnb and Stripe

**State Management:**
- TanStack Query (React Query) for server state management and caching
- Query invalidation patterns for real-time data updates
- Custom hooks for authentication and common operations

**Key Pages:**
- Landing page with hero, value proposition, pricing, testimonials, and FAQ sections
- Dashboard for authenticated users showing subscription status, upcoming services, and history
- Subscribe page with Stripe payment integration
- 404 fallback page

### Backend Architecture

**Technology Stack:**
- **Runtime**: Node.js with Express.js server
- **Language**: TypeScript with ES modules
- **Database ORM**: Drizzle ORM with Neon serverless PostgreSQL
- **Session Management**: express-session with PostgreSQL store (connect-pg-simple)

**API Design:**
- RESTful API endpoints under `/api` prefix
- Session-based authentication via Replit Auth
- Middleware for logging, JSON parsing, and authentication guards
- Response interceptors for consistent logging format

**Key API Routes:**
- `/api/auth/*` - Authentication endpoints (login, user info)
- `/api/get-or-create-subscription` - Stripe subscription management
- `/api/bookings` - Service booking operations
- `/api/addons` - Add-on service management
- `/api/user-addons` - User-specific add-on subscriptions
- `/api/chat/messages` - AI chatbot integration
- `/api/webhook` - Stripe webhook handler for payment events

**Authentication & Authorization:**
- OpenID Connect (OIDC) integration with Replit Auth
- Passport.js strategy for authentication flow
- Session-based user management with 7-day cookie lifetime
- `isAuthenticated` middleware guards protected routes

### Database Schema

**Core Tables:**
- `users` - User accounts with Stripe integration fields (customerId, subscriptionId, status)
- `sessions` - Express session storage for authentication
- `service_types` - Base service offerings (snow removal, lawn mowing, cleanups)
- `add_ons` - Optional add-on services with pricing (monthly/one-time)
- `user_add_ons` - Junction table for user's active add-ons
- `bookings` - Scheduled and completed service appointments
- `chat_conversations` - AI chatbot conversation threads
- `chat_messages` - Individual messages within conversations

**Key Design Decisions:**
- PostgreSQL via Neon serverless for scalability and connection pooling
- UUID primary keys for distributed system compatibility
- Timestamp fields for audit trails (createdAt, updatedAt)
- Enum-like varchar fields for status tracking (subscription_status, booking status, seasons)
- Decimal type for precise currency values

### External Dependencies

**Payment Processing:**
- **Stripe**: Complete payment infrastructure
  - Subscription management with recurring billing
  - Secure checkout via Stripe Elements
  - Webhook integration for payment event handling
  - API version: 2023-10-16
  - Client-side: @stripe/stripe-js and @stripe/react-stripe-js
  - Server-side: stripe SDK

**AI Integration:**
- **OpenAI API**: GPT-5 model for customer support chatbot
  - Conversational AI assistant with service-specific knowledge
  - Context-aware responses about pricing, scheduling, and services
  - 500 token completion limit for concise responses
  - System prompt customized for Walks & Lawns domain

**Authentication Provider:**
- **Replit Auth**: OAuth 2.0 / OpenID Connect provider
  - Handles user registration and login flows
  - Profile information synchronization
  - Token-based session management with refresh capabilities

**Database Provider:**
- **Neon Serverless PostgreSQL**: Cloud-hosted database
  - WebSocket connection via @neondatabase/serverless
  - Connection pooling for scalability
  - Managed backups and high availability

**Development Tools:**
- Replit-specific plugins for development environment integration
  - Runtime error overlay
  - Cartographer for code navigation
  - Development banner

**Asset Management:**
- Generated images stored in `/attached_assets/generated_images/` for hero sections and testimonials
- Seasonal imagery (summer lawn, winter snow removal) for dynamic hero display