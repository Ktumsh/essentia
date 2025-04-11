CREATE TABLE "medical_tag" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(50) NOT NULL,
	"description" text,
	CONSTRAINT "medical_tag_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE "user_medical_history" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"condition" varchar(100) NOT NULL,
	"description" text,
	"file_url" text,
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
ALTER TABLE "user_medical_history" ADD CONSTRAINT "user_medical_history_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_medical_history_activity" ADD CONSTRAINT "user_medical_history_activity_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_medical_history_activity" ADD CONSTRAINT "user_medical_history_activity_medical_history_id_user_medical_history_id_fk" FOREIGN KEY ("medical_history_id") REFERENCES "public"."user_medical_history"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_medical_history_tag" ADD CONSTRAINT "user_medical_history_tag_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_medical_history_tag" ADD CONSTRAINT "user_medical_history_tag_medical_history_id_user_medical_history_id_fk" FOREIGN KEY ("medical_history_id") REFERENCES "public"."user_medical_history"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_medical_history_tag" ADD CONSTRAINT "user_medical_history_tag_tag_id_medical_tag_id_fk" FOREIGN KEY ("tag_id") REFERENCES "public"."medical_tag"("id") ON DELETE cascade ON UPDATE no action;