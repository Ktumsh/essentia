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
  foreignKey,
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
  bio: varchar("bio", { length: 2000 }),
  location: varchar("location", { length: 255 }),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export type UserProfile = InferSelectModel<typeof userProfile>;

export const userTrial = table("user_trial", {
  id: uuid("id").primaryKey().notNull().defaultRandom(),
  userId: uuid("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  startedAt: timestamp("started_at").notNull().defaultNow(),
  expiresAt: timestamp("expires_at").notNull(),
  isActive: boolean("is_active").notNull().default(true),
  hasUsed: boolean("has_used").notNull().default(false),
  ip: varchar("ip", { length: 64 }),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export type UserTrial = InferSelectModel<typeof userTrial>;

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
  })
    .references(() => plan.id)
    .default("free"),
  expiresAt: timestamp("expires_at"),
});

export type Subscription = InferSelectModel<typeof subscription>;

export const plan = table("plan", {
  id: varchar("id", { length: 50 }).primaryKey().notNull(),
  name: varchar("name", { length: 100 }).notNull(),
  description: text("description"),
  maxFiles: integer("max_files").notNull().default(6),
  price: integer("price").default(0),
  supportLevel: varchar("support_level", {
    enum: ["basic", "standard", "priority"],
  })
    .notNull()
    .default("basic"),
  isAvailable: boolean("is_available").notNull().default(true),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export type Plan = InferSelectModel<typeof plan>;

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
  parts: json("parts").notNull(),
  attachments: json("attachments").notNull(),
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
  (t) => [primaryKey({ columns: [t.chatId, t.messageId] })],
);

export type ChatVote = InferSelectModel<typeof chatVote>;

export const route = table("route", {
  id: uuid("id").primaryKey().notNull().defaultRandom(),
  slug: varchar("slug", { length: 100 }).unique().notNull(),
  name: varchar("name", { length: 100 }).unique().notNull(),
  description: text("description").notNull(),
  about: text("about").notNull(),
});

export type Route = InferSelectModel<typeof route>;

export const stage = table("stage", {
  id: uuid("id").primaryKey().notNull().defaultRandom(),
  routeId: uuid("route_id")
    .notNull()
    .references(() => route.id, { onDelete: "cascade" }),
  title: varchar("title", { length: 150 }).notNull(),
  slug: varchar("slug", { length: 100 }).notNull(),
  description: text("description"),
  objectives: text("objectives"),
  order: integer("order").notNull(),
});

export type Stage = InferSelectModel<typeof stage>;

export const lesson = table("lesson", {
  id: uuid("id").primaryKey().notNull().defaultRandom(),
  stageId: uuid("stage_id")
    .notNull()
    .references(() => stage.id, { onDelete: "cascade" }),
  title: varchar("title", { length: 150 }).notNull(),
  slug: varchar("slug", { length: 100 }).notNull(),
  objective: text("objective"),
  content: text("content"),
  order: integer("order").notNull(),
});

export type Lesson = InferSelectModel<typeof lesson>;

export const review = table("review", {
  id: uuid("id").primaryKey().notNull().defaultRandom(),
  stageId: uuid("stage_id")
    .notNull()
    .references(() => stage.id, { onDelete: "cascade" }),
  title: varchar("title", { length: 150 }).notNull(),
  slug: varchar("slug", { length: 100 }).notNull(),
  instructions: text("instructions").notNull(),
});

export type Review = InferSelectModel<typeof review>;

export const reviewQuestion = table("review_question", {
  id: uuid("id").primaryKey().notNull().defaultRandom(),
  reviewId: uuid("review_id")
    .notNull()
    .references(() => review.id, { onDelete: "cascade" }),
  question: text("question").notNull(),
  options: text("options").notNull(),
  answer: integer("answer").notNull(),
});

export type ReviewQuestion = InferSelectModel<typeof reviewQuestion>;

export const userRouteProgress = table(
  "user_route_progress",
  {
    userId: uuid("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    routeId: uuid("route_id")
      .notNull()
      .references(() => route.id, { onDelete: "cascade" }),
    completed: boolean("completed").notNull().default(false),
    progress: integer("progress").default(0).notNull(),
    completedAt: timestamp("completed_at").default(sql`NULL`),
    startedAt: timestamp("started_at").defaultNow(),
  },
  (t) => [primaryKey({ columns: [t.userId, t.routeId] })],
);

export type UserRouteProgress = InferSelectModel<typeof userRouteProgress>;

export const userStageProgress = table(
  "user_stage_progress",
  {
    userId: uuid("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    stageId: uuid("stage_id")
      .notNull()
      .references(() => stage.id, { onDelete: "cascade" }),
    routeId: uuid("route_id").notNull(),
    completed: boolean("completed").notNull().default(false),
    progress: integer("progress").default(0),
    startedAt: timestamp("started_at").defaultNow(),
    completedAt: timestamp("completed_at"),
  },
  (t) => [
    primaryKey({ columns: [t.userId, t.stageId] }),
    foreignKey({
      columns: [t.userId, t.routeId],
      foreignColumns: [userRouteProgress.userId, userRouteProgress.routeId],
    }).onDelete("cascade"),
  ],
);

export type UserStageProgress = InferSelectModel<typeof userStageProgress>;

export const userLessonProgress = table(
  "user_lesson_progress",
  {
    userId: uuid("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    lessonId: uuid("lesson_id")
      .notNull()
      .references(() => lesson.id, { onDelete: "cascade" }),
    stageId: uuid("stage_id").notNull(),
    completed: boolean("completed").notNull().default(false),
    startedAt: timestamp("started_at").defaultNow(),
    completedAt: timestamp("completed_at"),
  },
  (t) => [
    primaryKey({ columns: [t.userId, t.lessonId] }),
    foreignKey({
      columns: [t.userId, t.stageId],
      foreignColumns: [userStageProgress.userId, userStageProgress.stageId],
    }).onDelete("cascade"),
  ],
);

export type UserLessonProgress = InferSelectModel<typeof userLessonProgress>;

export const userReviewProgress = table(
  "user_review_progress",
  {
    userId: uuid("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    reviewId: uuid("review_id")
      .notNull()
      .references(() => review.id, { onDelete: "cascade" }),
    stageId: uuid("stage_id").notNull(),
    completed: boolean("completed").default(false),
    score: integer("score").default(0),
    startedAt: timestamp("started_at").defaultNow(),
    completedAt: timestamp("completed_at"),
  },
  (t) => [
    primaryKey({ columns: [t.userId, t.reviewId] }),
    foreignKey({
      columns: [t.userId, t.stageId],
      foreignColumns: [userStageProgress.userId, userStageProgress.stageId],
    }).onDelete("cascade"),
  ],
);

export type UserReviewProgress = InferSelectModel<typeof userReviewProgress>;

export const notificationSubscription = table("notification_subscription", {
  id: uuid("id").primaryKey().notNull().defaultRandom(),
  userId: uuid("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  endpoint: text("endpoint").notNull(),
  p256dh: text("p256dh").notNull(),
  auth: text("auth").notNull(),
  timezone: text("timezone").notNull().default("UTC"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export type NotificationSubscription = InferSelectModel<
  typeof notificationSubscription
>;

export const userNotification = table("user_notification", {
  id: uuid("id").primaryKey().notNull().defaultRandom(),
  userId: uuid("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  title: text("title").notNull(),
  message: text("message").notNull(),
  url: text("url"),
  isRead: boolean("is_read").notNull().default(false),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export type UserNotification = InferSelectModel<typeof userNotification>;

export const userTask = table("user_task", {
  id: uuid("id").primaryKey().notNull().defaultRandom(),
  userId: uuid("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  name: varchar("name", { length: 80 }).notNull(),
  chatId: uuid("chat_id")
    .notNull()
    .references(() => chat.id, { onDelete: "cascade" }),
  instructions: varchar("instructions", { length: 100 }).notNull(),
  frequency: varchar("frequency", {
    enum: [
      "No se repite",
      "Diariamente",
      "Semanalmente",
      "Mensualmente",
      "Anualmente",
    ],
  }).notNull(),
  time: varchar("time", { length: 5 }).notNull(),
  exactDate: timestamp("exact_date").default(sql`NULL`),
  weekDay: varchar("week_day", { length: 20 }),
  monthDay: integer("month_day"),
  month: varchar("month", { length: 20 }),
  status: varchar("status", { enum: ["active", "paused", "completed"] })
    .notNull()
    .default("active"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export type UserTask = InferSelectModel<typeof userTask>;

export const userMedicalHistory = table("user_medical_history", {
  id: uuid("id").primaryKey().notNull().defaultRandom(),
  userId: uuid("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  condition: varchar("condition", { length: 100 }).notNull(),
  description: text("description"),
  type: varchar("type", {
    enum: [
      "Examen", // Exámenes de laboratorio, radiografías
      "Receta", // Recetas médicas
      "Informe", // Informes clínicos
      "Diagnóstico", // Diagnóstico médico formal
      "Imagenología", // Imágenes médicas (radiografías, ecografías)
      "Certificado", // Certificados médicos para licencia o trabajo
      "Epicrisis", // Resumen clínico al alta
      "Consentimiento", // Consentimientos informados
      "Otro", // Cualquier otro documento relevante
    ],
  }).notNull(),
  issuer: varchar("issuer", { length: 150 }),
  documentDate: timestamp("document_date"),
  notes: text("notes"),
  visibility: varchar("visibility", { enum: ["private", "shared"] }).default(
    "private",
  ),
  isDeleted: boolean("is_deleted").notNull().default(false),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export type UserMedicalHistory = InferSelectModel<typeof userMedicalHistory>;

export const userMedicalFile = table("user_medical_file", {
  id: uuid("id").primaryKey().notNull().defaultRandom(),
  medicalHistoryId: uuid("medical_history_id")
    .notNull()
    .references(() => userMedicalHistory.id, { onDelete: "cascade" }),
  url: text("url").notNull(),
  name: varchar("name", { length: 200 }).notNull(),
  size: integer("size").notNull(),
  contentType: varchar("content_type", { length: 100 }).notNull(),
  uploadedAt: timestamp("uploaded_at").notNull(),
});

export type UserMedicalFile = InferSelectModel<typeof userMedicalFile>;

export const medicalTag = table("medical_tag", {
  id: uuid("id").primaryKey().notNull().defaultRandom(),
  name: varchar("name", { length: 50 }).notNull().unique(),
  description: text("description"),
});

export type MedicalTag = InferSelectModel<typeof medicalTag>;

export const userMedicalHistoryTag = table("user_medical_history_tag", {
  id: uuid("id").primaryKey().notNull().defaultRandom(),
  userId: uuid("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  medicalHistoryId: uuid("medical_history_id")
    .notNull()
    .references(() => userMedicalHistory.id, { onDelete: "cascade" }),
  tagId: uuid("tag_id")
    .notNull()
    .references(() => medicalTag.id, { onDelete: "cascade" }),
});

export type UserMedicalHistoryTag = InferSelectModel<
  typeof userMedicalHistoryTag
>;

export const userMedicalHistoryActivity = table(
  "user_medical_history_activity",
  {
    id: uuid("id").primaryKey().notNull().defaultRandom(),
    userId: uuid("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    medicalHistoryId: uuid("medical_history_id")
      .notNull()
      .references(() => userMedicalHistory.id, { onDelete: "cascade" }),
    action: varchar("action", {
      enum: ["created", "updated", "deleted", "restored"],
    }).notNull(),
    createdAt: timestamp("created_at").notNull().defaultNow(),
  },
);

export type UserMedicalHistoryActivity = InferSelectModel<
  typeof userMedicalHistoryActivity
>;

export const aiMedicalRecommendation = table("ai_medical_recommendation", {
  id: uuid("id").primaryKey().notNull().defaultRandom(),
  userId: uuid("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  type: varchar("type", {
    enum: ["general", "preventive", "lifestyle", "followUp", "medication"],
  }).notNull(),
  title: varchar("title", { length: 150 }).notNull(),
  description: text("description").notNull(),
  notes: text("notes"),
  priority: varchar("priority", {
    enum: ["high", "medium", "low"],
  }).notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  isDeleted: boolean("is_deleted").notNull().default(false),
});

export type AiMedicalRecommendation = InferSelectModel<
  typeof aiMedicalRecommendation
>;

export const aiRecommendationDocument = table("ai_recommendation_document", {
  id: uuid("id").primaryKey().notNull().defaultRandom(),
  recommendationId: uuid("recommendation_id")
    .notNull()
    .references(() => aiMedicalRecommendation.id, { onDelete: "cascade" }),
  documentId: uuid("document_id")
    .notNull()
    .references(() => userMedicalHistory.id, { onDelete: "cascade" }),
});

export type AiRecommendationDocument = InferSelectModel<
  typeof aiRecommendationDocument
>;

export const aiRecommendationTag = table("ai_recommendation_tag", {
  id: uuid("id").primaryKey().notNull().defaultRandom(),
  recommendationId: uuid("recommendation_id")
    .notNull()
    .references(() => aiMedicalRecommendation.id, { onDelete: "cascade" }),
  tagId: uuid("tag_id")
    .notNull()
    .references(() => medicalTag.id, { onDelete: "cascade" }),
});

export type AiRecommendationTag = InferSelectModel<typeof aiRecommendationTag>;

export const userFeedback = table("user_feedback", {
  id: uuid("id").primaryKey().notNull().defaultRandom(),
  userId: uuid("user_id")
    .references(() => user.id, { onDelete: "set null" })
    .default(sql`NULL`),
  reaction: varchar("reaction", {
    enum: ["love", "happy", "neutral", "frustrated", "angry"],
  }).notNull(),
  comment: text("comment").notNull(),
  context: varchar("context", { length: 100 }),
  ip: varchar("ip", { length: 64 }),
  device: varchar("device", { length: 100 }),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export type UserFeedback = InferSelectModel<typeof userFeedback>;
