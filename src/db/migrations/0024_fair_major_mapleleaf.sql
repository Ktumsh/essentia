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
ALTER TABLE "ai_medical_recommendation" ADD CONSTRAINT "ai_medical_recommendation_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "ai_recommendation_document" ADD CONSTRAINT "ai_recommendation_document_recommendation_id_ai_medical_recommendation_id_fk" FOREIGN KEY ("recommendation_id") REFERENCES "public"."ai_medical_recommendation"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "ai_recommendation_document" ADD CONSTRAINT "ai_recommendation_document_document_id_user_medical_history_id_fk" FOREIGN KEY ("document_id") REFERENCES "public"."user_medical_history"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "ai_recommendation_tag" ADD CONSTRAINT "ai_recommendation_tag_recommendation_id_ai_medical_recommendation_id_fk" FOREIGN KEY ("recommendation_id") REFERENCES "public"."ai_medical_recommendation"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "ai_recommendation_tag" ADD CONSTRAINT "ai_recommendation_tag_tag_id_medical_tag_id_fk" FOREIGN KEY ("tag_id") REFERENCES "public"."medical_tag"("id") ON DELETE cascade ON UPDATE no action;