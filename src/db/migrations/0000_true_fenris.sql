CREATE TABLE "ai_medical_recommendation" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"type" varchar NOT NULL,
	"title" varchar(150) NOT NULL,
	"description" text NOT NULL,
	"notes" text,
	"priority" varchar NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"is_deleted" boolean DEFAULT false NOT NULL
);
--> statement-breakpoint
CREATE TABLE "ai_recommendation_document" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"recommendation_id" uuid NOT NULL,
	"document_id" uuid NOT NULL
);
--> statement-breakpoint
CREATE TABLE "ai_recommendation_tag" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"recommendation_id" uuid NOT NULL,
	"tag_id" uuid NOT NULL
);
--> statement-breakpoint
CREATE TABLE "chat" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"title" text NOT NULL,
	"visibility" varchar DEFAULT 'private' NOT NULL,
	"created_at" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE "chat_message" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"chat_id" uuid NOT NULL,
	"role" varchar NOT NULL,
	"parts" json NOT NULL,
	"attachments" json NOT NULL,
	"created_at" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE "chat_vote" (
	"chat_id" uuid NOT NULL,
	"message_id" uuid NOT NULL,
	"is_upvoted" boolean NOT NULL,
	CONSTRAINT "chat_vote_chat_id_message_id_pk" PRIMARY KEY("chat_id","message_id")
);
--> statement-breakpoint
CREATE TABLE "email_sends" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"code" varchar(6),
	"action_type" varchar,
	"expires_at" timestamp NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"verified_at" timestamp DEFAULT NULL
);
--> statement-breakpoint
CREATE TABLE "lesson" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"stage_id" uuid NOT NULL,
	"title" varchar(150) NOT NULL,
	"slug" varchar(100) NOT NULL,
	"objective" text,
	"content" text,
	"order" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "medical_tag" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(50) NOT NULL,
	"description" text,
	CONSTRAINT "medical_tag_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE "notification_subscription" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"endpoint" text NOT NULL,
	"p256dh" text NOT NULL,
	"auth" text NOT NULL,
	"timezone" text DEFAULT 'UTC' NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "payment" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"status" varchar(12) DEFAULT 'pending',
	"amount" integer,
	"currency" varchar(10),
	"processed_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "plan" (
	"id" varchar(50) PRIMARY KEY NOT NULL,
	"name" varchar(100) NOT NULL,
	"description" text,
	"max_files" integer DEFAULT 6 NOT NULL,
	"price" integer DEFAULT 0,
	"support_level" varchar DEFAULT 'basic' NOT NULL,
	"is_available" boolean DEFAULT true NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "review" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"stage_id" uuid NOT NULL,
	"title" varchar(150) NOT NULL,
	"slug" varchar(100) NOT NULL,
	"instructions" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "review_question" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"review_id" uuid NOT NULL,
	"question" text NOT NULL,
	"options" text NOT NULL,
	"answer" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "route" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"slug" varchar(100) NOT NULL,
	"name" varchar(100) NOT NULL,
	"description" text NOT NULL,
	"about" text NOT NULL,
	CONSTRAINT "route_slug_unique" UNIQUE("slug"),
	CONSTRAINT "route_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE "stage" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"route_id" uuid NOT NULL,
	"title" varchar(150) NOT NULL,
	"slug" varchar(100) NOT NULL,
	"description" text,
	"objectives" text,
	"order" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "subscription" (
	"user_id" uuid NOT NULL,
	"subscription_id" varchar(255),
	"client_id" varchar(255),
	"is_premium" boolean DEFAULT false NOT NULL,
	"status" varchar(255) DEFAULT 'paused',
	"type" varchar(50) DEFAULT 'free',
	"expires_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "user" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"role" varchar DEFAULT 'user' NOT NULL,
	"email" varchar(64) NOT NULL,
	"username" varchar(20) NOT NULL,
	"password" varchar(64) NOT NULL,
	"email_verified" boolean DEFAULT false,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"status" varchar DEFAULT 'enabled' NOT NULL,
	CONSTRAINT "user_email_unique" UNIQUE("email"),
	CONSTRAINT "user_username_unique" UNIQUE("username")
);
--> statement-breakpoint
CREATE TABLE "user_feedback" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid DEFAULT NULL,
	"reaction" varchar NOT NULL,
	"comment" text NOT NULL,
	"context" varchar(100),
	"ip" varchar(64),
	"device" varchar(100),
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "user_lesson_progress" (
	"user_id" uuid NOT NULL,
	"lesson_id" uuid NOT NULL,
	"stage_id" uuid NOT NULL,
	"completed" boolean DEFAULT false NOT NULL,
	"started_at" timestamp DEFAULT now(),
	"completed_at" timestamp,
	CONSTRAINT "user_lesson_progress_user_id_lesson_id_pk" PRIMARY KEY("user_id","lesson_id")
);
--> statement-breakpoint
CREATE TABLE "user_medical_file" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"medical_history_id" uuid NOT NULL,
	"url" text NOT NULL,
	"name" varchar(200) NOT NULL,
	"size" integer NOT NULL,
	"content_type" varchar(100) NOT NULL,
	"uploaded_at" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE "user_medical_history" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"condition" varchar(100) NOT NULL,
	"description" text,
	"type" varchar NOT NULL,
	"issuer" varchar(150),
	"document_date" timestamp,
	"notes" text,
	"visibility" varchar DEFAULT 'private',
	"is_deleted" boolean DEFAULT false NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "user_medical_history_activity" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"medical_history_id" uuid NOT NULL,
	"action" varchar NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "user_medical_history_tag" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"medical_history_id" uuid NOT NULL,
	"tag_id" uuid NOT NULL
);
--> statement-breakpoint
CREATE TABLE "user_notification" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"title" text NOT NULL,
	"message" text NOT NULL,
	"url" text,
	"is_read" boolean DEFAULT false NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "user_profile" (
	"user_id" uuid NOT NULL,
	"first_name" varchar(48) NOT NULL,
	"last_name" varchar(48) NOT NULL,
	"birthdate" timestamp,
	"genre" varchar(10),
	"weight" integer,
	"height" integer,
	"profile_image" text,
	"bio" varchar(2000),
	"location" varchar(255),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "user_review_progress" (
	"user_id" uuid NOT NULL,
	"review_id" uuid NOT NULL,
	"stage_id" uuid NOT NULL,
	"completed" boolean DEFAULT false,
	"score" integer DEFAULT 0,
	"started_at" timestamp DEFAULT now(),
	"completed_at" timestamp,
	CONSTRAINT "user_review_progress_user_id_review_id_pk" PRIMARY KEY("user_id","review_id")
);
--> statement-breakpoint
CREATE TABLE "user_route_progress" (
	"user_id" uuid NOT NULL,
	"route_id" uuid NOT NULL,
	"completed" boolean DEFAULT false NOT NULL,
	"progress" integer DEFAULT 0 NOT NULL,
	"completed_at" timestamp DEFAULT NULL,
	"started_at" timestamp DEFAULT now(),
	CONSTRAINT "user_route_progress_user_id_route_id_pk" PRIMARY KEY("user_id","route_id")
);
--> statement-breakpoint
CREATE TABLE "user_stage_progress" (
	"user_id" uuid NOT NULL,
	"stage_id" uuid NOT NULL,
	"route_id" uuid NOT NULL,
	"completed" boolean DEFAULT false NOT NULL,
	"progress" integer DEFAULT 0,
	"started_at" timestamp DEFAULT now(),
	"completed_at" timestamp,
	CONSTRAINT "user_stage_progress_user_id_stage_id_pk" PRIMARY KEY("user_id","stage_id")
);
--> statement-breakpoint
CREATE TABLE "user_task" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"name" varchar(80) NOT NULL,
	"chat_id" uuid NOT NULL,
	"instructions" varchar(100) NOT NULL,
	"frequency" varchar NOT NULL,
	"time" varchar(5) NOT NULL,
	"exact_date" timestamp DEFAULT NULL,
	"week_day" varchar(20),
	"month_day" integer,
	"month" varchar(20),
	"status" varchar DEFAULT 'active' NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "user_trial" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"started_at" timestamp DEFAULT now() NOT NULL,
	"expires_at" timestamp NOT NULL,
	"is_active" boolean DEFAULT true NOT NULL,
	"has_used" boolean DEFAULT false NOT NULL,
	"ip" varchar(64),
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "ai_medical_recommendation" ADD CONSTRAINT "ai_medical_recommendation_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "ai_recommendation_document" ADD CONSTRAINT "ai_recommendation_document_recommendation_id_ai_medical_recommendation_id_fk" FOREIGN KEY ("recommendation_id") REFERENCES "public"."ai_medical_recommendation"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "ai_recommendation_document" ADD CONSTRAINT "ai_recommendation_document_document_id_user_medical_history_id_fk" FOREIGN KEY ("document_id") REFERENCES "public"."user_medical_history"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "ai_recommendation_tag" ADD CONSTRAINT "ai_recommendation_tag_recommendation_id_ai_medical_recommendation_id_fk" FOREIGN KEY ("recommendation_id") REFERENCES "public"."ai_medical_recommendation"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "ai_recommendation_tag" ADD CONSTRAINT "ai_recommendation_tag_tag_id_medical_tag_id_fk" FOREIGN KEY ("tag_id") REFERENCES "public"."medical_tag"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "chat" ADD CONSTRAINT "chat_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "chat_message" ADD CONSTRAINT "chat_message_chat_id_chat_id_fk" FOREIGN KEY ("chat_id") REFERENCES "public"."chat"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "chat_vote" ADD CONSTRAINT "chat_vote_chat_id_chat_id_fk" FOREIGN KEY ("chat_id") REFERENCES "public"."chat"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "chat_vote" ADD CONSTRAINT "chat_vote_message_id_chat_message_id_fk" FOREIGN KEY ("message_id") REFERENCES "public"."chat_message"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "email_sends" ADD CONSTRAINT "email_sends_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "lesson" ADD CONSTRAINT "lesson_stage_id_stage_id_fk" FOREIGN KEY ("stage_id") REFERENCES "public"."stage"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "notification_subscription" ADD CONSTRAINT "notification_subscription_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "payment" ADD CONSTRAINT "payment_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "review" ADD CONSTRAINT "review_stage_id_stage_id_fk" FOREIGN KEY ("stage_id") REFERENCES "public"."stage"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "review_question" ADD CONSTRAINT "review_question_review_id_review_id_fk" FOREIGN KEY ("review_id") REFERENCES "public"."review"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "stage" ADD CONSTRAINT "stage_route_id_route_id_fk" FOREIGN KEY ("route_id") REFERENCES "public"."route"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "subscription" ADD CONSTRAINT "subscription_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "subscription" ADD CONSTRAINT "subscription_type_plan_id_fk" FOREIGN KEY ("type") REFERENCES "public"."plan"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_feedback" ADD CONSTRAINT "user_feedback_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_lesson_progress" ADD CONSTRAINT "user_lesson_progress_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_lesson_progress" ADD CONSTRAINT "user_lesson_progress_lesson_id_lesson_id_fk" FOREIGN KEY ("lesson_id") REFERENCES "public"."lesson"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_lesson_progress" ADD CONSTRAINT "user_lesson_progress_user_id_stage_id_user_stage_progress_user_id_stage_id_fk" FOREIGN KEY ("user_id","stage_id") REFERENCES "public"."user_stage_progress"("user_id","stage_id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_medical_file" ADD CONSTRAINT "user_medical_file_medical_history_id_user_medical_history_id_fk" FOREIGN KEY ("medical_history_id") REFERENCES "public"."user_medical_history"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_medical_history" ADD CONSTRAINT "user_medical_history_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_medical_history_activity" ADD CONSTRAINT "user_medical_history_activity_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_medical_history_activity" ADD CONSTRAINT "user_medical_history_activity_medical_history_id_user_medical_history_id_fk" FOREIGN KEY ("medical_history_id") REFERENCES "public"."user_medical_history"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_medical_history_tag" ADD CONSTRAINT "user_medical_history_tag_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_medical_history_tag" ADD CONSTRAINT "user_medical_history_tag_medical_history_id_user_medical_history_id_fk" FOREIGN KEY ("medical_history_id") REFERENCES "public"."user_medical_history"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_medical_history_tag" ADD CONSTRAINT "user_medical_history_tag_tag_id_medical_tag_id_fk" FOREIGN KEY ("tag_id") REFERENCES "public"."medical_tag"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_notification" ADD CONSTRAINT "user_notification_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_profile" ADD CONSTRAINT "user_profile_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_review_progress" ADD CONSTRAINT "user_review_progress_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_review_progress" ADD CONSTRAINT "user_review_progress_review_id_review_id_fk" FOREIGN KEY ("review_id") REFERENCES "public"."review"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_review_progress" ADD CONSTRAINT "user_review_progress_user_id_stage_id_user_stage_progress_user_id_stage_id_fk" FOREIGN KEY ("user_id","stage_id") REFERENCES "public"."user_stage_progress"("user_id","stage_id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_route_progress" ADD CONSTRAINT "user_route_progress_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_route_progress" ADD CONSTRAINT "user_route_progress_route_id_route_id_fk" FOREIGN KEY ("route_id") REFERENCES "public"."route"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_stage_progress" ADD CONSTRAINT "user_stage_progress_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_stage_progress" ADD CONSTRAINT "user_stage_progress_stage_id_stage_id_fk" FOREIGN KEY ("stage_id") REFERENCES "public"."stage"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_stage_progress" ADD CONSTRAINT "user_stage_progress_user_id_route_id_user_route_progress_user_id_route_id_fk" FOREIGN KEY ("user_id","route_id") REFERENCES "public"."user_route_progress"("user_id","route_id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_task" ADD CONSTRAINT "user_task_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_task" ADD CONSTRAINT "user_task_chat_id_chat_id_fk" FOREIGN KEY ("chat_id") REFERENCES "public"."chat"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_trial" ADD CONSTRAINT "user_trial_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;