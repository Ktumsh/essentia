import { sql, type InferSelectModel } from "drizzle-orm";
import {
  pgTable as table,
  varchar,
  timestamp,
  json,
  uuid,
  text,
  primaryKey,
  boolean,
  integer,
} from "drizzle-orm/pg-core";

export const user = table("user", {
  id: uuid("id").primaryKey().notNull().defaultRandom(),
  email: varchar("email", { length: 64 }).unique().notNull(),
  username: varchar("username", { length: 20 }).unique().notNull(),
  password: varchar("password", { length: 64 }).notNull(),
  emailVerified: boolean("email_verified").default(false),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export type User = InferSelectModel<typeof user>;

export const userProfile = table("user_profile", {
  userId: uuid("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  firstName: varchar("first_name", { length: 48 }).notNull(),
  lastName: varchar("last_name", { length: 48 }).notNull(),
  birthdate: timestamp("birthdate"),
  genre: varchar("genre", { length: 10 }),
  weight: integer("weight"),
  height: integer("height"),
  profileImage: text("profile_image"),
  bio: varchar("bio", { length: 255 }),
  location: varchar("location", { length: 255 }),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export type UserProfile = InferSelectModel<typeof userProfile>;

export const subscription = table("subscription", {
  userId: uuid("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  subscriptionId: varchar("subscription_id", { length: 255 }),
  clientId: varchar("client_id", { length: 255 }),
  isPremium: boolean("is_premium").notNull().default(false),
  status: varchar("status", { length: 255 }).default("inactive"),
  type: varchar("type", { length: 50 }),
  expiresAt: timestamp("expires_at"),
});

export type Subscription = InferSelectModel<typeof subscription>;

export const payment = table("payment", {
  id: uuid("id").primaryKey().notNull().defaultRandom(),
  userId: uuid("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  status: varchar("status", { length: 12 }).default("pending"),
  amount: integer("amount"),
  currency: varchar("currency", { length: 10 }),
  processedAt: timestamp("processed_at"),
});

export type Payment = InferSelectModel<typeof payment>;

export const emailVerification = table("email_verification", {
  id: uuid("id").primaryKey().notNull().defaultRandom(),
  userId: uuid("user_id")
    .references(() => user.id, { onDelete: "cascade" })
    .notNull(),
  token: varchar("token", { length: 255 }),
  expiresAt: timestamp("expires_at").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  verifiedAt: timestamp("verified_at").default(sql`NULL`),
});

export type EmailVerification = InferSelectModel<typeof emailVerification>;

export const chat = table("chat", {
  id: uuid("id").primaryKey().notNull().defaultRandom(),
  userId: uuid("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  title: text("title").notNull(),
  visibility: varchar("visibility", { enum: ["public", "private"] })
    .notNull()
    .default("private"),
  createdAt: timestamp("created_at").notNull(),
});

export type Chat = InferSelectModel<typeof chat>;

export const chatMessage = table("chat_message", {
  id: uuid("id").primaryKey().notNull().defaultRandom(),
  chatId: uuid("chat_id")
    .notNull()
    .references(() => chat.id, { onDelete: "cascade" }),
  role: varchar("role").notNull(),
  content: json("content").notNull(),
  createdAt: timestamp("created_at").notNull(),
});

export type ChatMessage = InferSelectModel<typeof chatMessage>;

export const chatVote = table(
  "chat_vote",
  {
    chatId: uuid("chat_id")
      .notNull()
      .references(() => chat.id, { onDelete: "cascade" }),
    messageId: uuid("message_id")
      .notNull()
      .references(() => chatMessage.id, { onDelete: "cascade" }),
    isUpvoted: boolean("is_upvoted").notNull(),
  },
  (table) => {
    return {
      pk: primaryKey({ columns: [table.chatId, table.messageId] }),
    };
  },
);

export type ChatVote = InferSelectModel<typeof chatVote>;
