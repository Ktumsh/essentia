CREATE TABLE "user_ai_recommendation_usage" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"active_count" integer DEFAULT 0 NOT NULL,
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "user_chat_usage" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"date" timestamp NOT NULL,
	"messages_used" integer DEFAULT 0 NOT NULL,
	CONSTRAINT "user_day_unique" UNIQUE("user_id","date")
);
--> statement-breakpoint
ALTER TABLE "plan" RENAME COLUMN "support_level" TO "max_chat_messages_per_day";--> statement-breakpoint
ALTER TABLE "plan" ADD COLUMN "max_ai_recommendations" integer;--> statement-breakpoint
ALTER TABLE "user_ai_recommendation_usage" ADD CONSTRAINT "user_ai_recommendation_usage_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_chat_usage" ADD CONSTRAINT "user_chat_usage_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;