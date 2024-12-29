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
  role: varchar("role", { enum: ["user", "admin"] })
    .notNull()
    .default("user"),
  email: varchar("email", { length: 64 }).unique().notNull(),
  username: varchar("username", { length: 20 }).unique().notNull(),
  password: varchar("password", { length: 64 }).notNull(),
  emailVerified: boolean("email_verified").default(false),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
  status: varchar("status", { enum: ["enabled", "disabled"] })
    .notNull()
    .default("enabled"),
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
  status: varchar("status", { length: 255 }).default("paused"),
  type: varchar("type", {
    enum: ["free", "premium", "premium-plus"],
    length: 50,
  }).default("free"),
  expiresAt: timestamp("expires_at"),
});

export type Subscription = InferSelectModel<typeof subscription>;

export const payment = table("payment", {
  id: uuid("id").primaryKey().notNull().defaultRandom(),
  userId: uuid("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  status: varchar("status", { enum: ["paid", "pending"], length: 12 }).default(
    "pending",
  ),
  amount: integer("amount"),
  currency: varchar("currency", { length: 10 }),
  processedAt: timestamp("processed_at"),
});

export type Payment = InferSelectModel<typeof payment>;

export const emailSends = table("email_sends", {
  id: uuid("id").primaryKey().notNull().defaultRandom(),
  userId: uuid("user_id")
    .references(() => user.id, { onDelete: "cascade" })
    .notNull(),
  code: varchar("code", { length: 6 }),
  actionType: varchar("action_type", {
    enum: ["email_verification", "password_recovery", "email_change"],
  }),
  expiresAt: timestamp("expires_at").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  verifiedAt: timestamp("verified_at").default(sql`NULL`),
});

export type EmailSends = InferSelectModel<typeof emailSends>;

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

export const resource = table("resource", {
  id: uuid("id").primaryKey().notNull().defaultRandom(),
  slug: varchar("slug", { length: 100 }).unique().notNull(),
  name: varchar("name", { length: 100 }).unique().notNull(),
  description: text("description").notNull(),
  about: text("about").notNull(),
});

export type Resource = InferSelectModel<typeof resource>;

export const resourceModule = table("module", {
  id: uuid("id").primaryKey().notNull().defaultRandom(),
  resourceId: uuid("resource_id")
    .notNull()
    .references(() => resource.id, { onDelete: "cascade" }),
  title: varchar("title", { length: 150 }).notNull(),
  slug: varchar("slug", { length: 100 }).notNull(),
  description: text("description"),
  objectives: text("objectives"),
  order: integer("order").notNull(),
});

export type Module = InferSelectModel<typeof resourceModule>;

export const lesson = table("lesson", {
  id: uuid("id").primaryKey().notNull().defaultRandom(),
  moduleId: uuid("module_id")
    .notNull()
    .references(() => resourceModule.id, { onDelete: "cascade" }),
  title: varchar("title", { length: 150 }).notNull(),
  slug: varchar("slug", { length: 100 }).notNull(),
  objective: text("objective"),
  content: text("content"),
  order: integer("order").notNull(),
});

export type Lesson = InferSelectModel<typeof lesson>;

export const exam = table("exam", {
  id: uuid("id").primaryKey().notNull().defaultRandom(),
  moduleId: uuid("module_id")
    .notNull()
    .references(() => resourceModule.id, { onDelete: "cascade" }),
  title: varchar("title", { length: 150 }).notNull(),
  slug: varchar("slug", { length: 100 }).notNull(),
  instructions: text("instructions").notNull(),
});

export type Exam = InferSelectModel<typeof exam>;

export const examQuestion = table("exam_question", {
  id: uuid("id").primaryKey().notNull().defaultRandom(),
  examId: uuid("exam_id")
    .notNull()
    .references(() => exam.id, { onDelete: "cascade" }),
  question: text("question").notNull(),
  options: text("options").notNull(),
  answer: integer("answer").notNull(),
});

export type Question = InferSelectModel<typeof examQuestion>;

export const userCourseProgress = table(
  "user_course_progress",
  {
    userId: uuid("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    courseId: uuid("course_id")
      .notNull()
      .references(() => resource.id, { onDelete: "cascade" }),
    completed: boolean("completed").notNull().default(false),
    progress: integer("progress").default(0).notNull(),
    completedAt: timestamp("completed_at").default(sql`NULL`),
    startedAt: timestamp("started_at").defaultNow(),
  },
  (table) => {
    return {
      pk: primaryKey({ columns: [table.userId, table.courseId] }),
    };
  },
);

export type UserCourseProgress = InferSelectModel<typeof userCourseProgress>;

export const userModuleProgress = table(
  "user_module_progress",
  {
    userId: uuid("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    moduleId: uuid("module_id")
      .notNull()
      .references(() => resourceModule.id, { onDelete: "cascade" }),
    completed: boolean("completed").notNull().default(false),
    progress: integer("progress").default(0),
    startedAt: timestamp("started_at").defaultNow(),
    completedAt: timestamp("completed_at"),
  },
  (table) => {
    return {
      pk: primaryKey({ columns: [table.userId, table.moduleId] }),
    };
  },
);

export type UserModuleProgress = InferSelectModel<typeof userModuleProgress>;

export const userLessonProgress = table(
  "user_lesson_progress",
  {
    userId: uuid("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    lessonId: uuid("lesson_id")
      .notNull()
      .references(() => lesson.id, { onDelete: "cascade" }),
    completed: boolean("completed").notNull().default(false),
    startedAt: timestamp("started_at").defaultNow(),
    completedAt: timestamp("completed_at"),
  },
  (table) => {
    return {
      pk: primaryKey({ columns: [table.userId, table.lessonId] }),
    };
  },
);

export type UserLessonProgress = InferSelectModel<typeof userLessonProgress>;

export const userExamProgress = table(
  "user_exam_progress",
  {
    userId: uuid("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    examId: uuid("exam_id")
      .notNull()
      .references(() => exam.id, { onDelete: "cascade" }),
    completed: boolean("completed").default(false),
    score: integer("score").default(0),
    startedAt: timestamp("started_at").defaultNow(),
    completedAt: timestamp("completed_at"),
  },
  (table) => {
    return {
      pk: primaryKey({ columns: [table.userId, table.examId] }),
    };
  },
);

export type UserExamProgress = InferSelectModel<typeof userExamProgress>;
