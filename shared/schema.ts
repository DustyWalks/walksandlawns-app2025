// Reference: javascript_log_in_with_replit blueprint and javascript_database blueprint
import { sql } from 'drizzle-orm';
import {
  index,
  jsonb,
  pgTable,
  timestamp,
  varchar,
  text,
  integer,
  boolean,
  decimal,
} from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
import { relations } from "drizzle-orm";

// Session storage table - Required for Replit Auth
export const sessions = pgTable(
  "sessions",
  {
    sid: varchar("sid").primaryKey(),
    sess: jsonb("sess").notNull(),
    expire: timestamp("expire").notNull(),
  },
  (table) => [index("IDX_session_expire").on(table.expire)],
);

// User storage table - Required for Replit Auth
export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  email: varchar("email").unique(),
  firstName: varchar("first_name"),
  lastName: varchar("last_name"),
  profileImageUrl: varchar("profile_image_url"),
  stripeCustomerId: varchar("stripe_customer_id"),
  stripeSubscriptionId: varchar("stripe_subscription_id"),
  subscriptionStatus: varchar("subscription_status"), // active, canceled, past_due, etc.
  address: text("address"),
  phone: varchar("phone"),
  isAdmin: boolean("is_admin").default(false),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export type UpsertUser = typeof users.$inferInsert;
export type User = typeof users.$inferSelect;

// Service types table
export const serviceTypes = pgTable("service_types", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: varchar("name").notNull(), // "Snow Removal", "Lawn Mowing", "Spring Cleanup", etc.
  description: text("description"),
  season: varchar("season"), // "winter", "summer", "spring", "fall"
  isBaseService: boolean("is_base_service").default(true), // included in base subscription
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertServiceTypeSchema = createInsertSchema(serviceTypes).omit({
  id: true,
  createdAt: true,
});

export type InsertServiceType = z.infer<typeof insertServiceTypeSchema>;
export type ServiceType = typeof serviceTypes.$inferSelect;

// Add-ons table
export const addOns = pgTable("add_ons", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: varchar("name").notNull(), // "Premium Snow Removal", "Aeration", "Fertilization"
  description: text("description"),
  priceMonthly: decimal("price_monthly", { precision: 10, scale: 2 }),
  priceOneTime: decimal("price_one_time", { precision: 10, scale: 2 }),
  isRecurring: boolean("is_recurring").default(false),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertAddOnSchema = createInsertSchema(addOns).omit({
  id: true,
  createdAt: true,
});

export type InsertAddOn = z.infer<typeof insertAddOnSchema>;
export type AddOn = typeof addOns.$inferSelect;

// User add-ons (subscribed add-ons)
export const userAddOns = pgTable("user_add_ons", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull().references(() => users.id),
  addOnId: varchar("add_on_id").notNull().references(() => addOns.id),
  isActive: boolean("is_active").default(true),
  purchasedAt: timestamp("purchased_at").defaultNow(),
});

export const insertUserAddOnSchema = createInsertSchema(userAddOns).omit({
  id: true,
  purchasedAt: true,
});

export type InsertUserAddOn = z.infer<typeof insertUserAddOnSchema>;
export type UserAddOn = typeof userAddOns.$inferSelect;

// Service bookings/appointments
export const bookings = pgTable("bookings", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull().references(() => users.id),
  serviceTypeId: varchar("service_type_id").notNull().references(() => serviceTypes.id),
  scheduledDate: timestamp("scheduled_date").notNull(),
  status: varchar("status").notNull().default("scheduled"), // scheduled, completed, canceled
  notes: text("notes"),
  completedAt: timestamp("completed_at"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertBookingSchema = createInsertSchema(bookings).omit({
  id: true,
  createdAt: true,
});

export type InsertBooking = z.infer<typeof insertBookingSchema>;
export type Booking = typeof bookings.$inferSelect;

// AI Chat conversations
export const chatConversations = pgTable("chat_conversations", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").references(() => users.id),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export type ChatConversation = typeof chatConversations.$inferSelect;

// AI Chat messages
export const chatMessages = pgTable("chat_messages", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  conversationId: varchar("conversation_id").notNull().references(() => chatConversations.id),
  role: varchar("role").notNull(), // "user" or "assistant"
  content: text("content").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertChatMessageSchema = createInsertSchema(chatMessages).omit({
  id: true,
  createdAt: true,
});

export type InsertChatMessage = z.infer<typeof insertChatMessageSchema>;
export type ChatMessage = typeof chatMessages.$inferSelect;

// Relations
export const usersRelations = relations(users, ({ many }) => ({
  bookings: many(bookings),
  userAddOns: many(userAddOns),
  chatConversations: many(chatConversations),
}));

export const bookingsRelations = relations(bookings, ({ one }) => ({
  user: one(users, {
    fields: [bookings.userId],
    references: [users.id],
  }),
  serviceType: one(serviceTypes, {
    fields: [bookings.serviceTypeId],
    references: [serviceTypes.id],
  }),
}));

export const userAddOnsRelations = relations(userAddOns, ({ one }) => ({
  user: one(users, {
    fields: [userAddOns.userId],
    references: [users.id],
  }),
  addOn: one(addOns, {
    fields: [userAddOns.addOnId],
    references: [addOns.id],
  }),
}));

export const chatConversationsRelations = relations(chatConversations, ({ one, many }) => ({
  user: one(users, {
    fields: [chatConversations.userId],
    references: [users.id],
  }),
  messages: many(chatMessages),
}));

export const chatMessagesRelations = relations(chatMessages, ({ one }) => ({
  conversation: one(chatConversations, {
    fields: [chatMessages.conversationId],
    references: [chatConversations.id],
  }),
}));
