CREATE TABLE "user_medical_folder" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"name" varchar(100) NOT NULL,
	"description" text,
	"color" varchar DEFAULT 'gray',
	"is_shared" boolean DEFAULT false,
	"is_deleted" boolean DEFAULT false NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "user_medical_folder_activity" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"folder_id" uuid NOT NULL,
	"action" varchar NOT NULL,
	"target_document_id" uuid,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "user_medical_file" ADD COLUMN "user_id" uuid NOT NULL;--> statement-breakpoint
ALTER TABLE "user_medical_history" ADD COLUMN "folder_id" uuid;--> statement-breakpoint
ALTER TABLE "user_medical_history" ADD COLUMN "order_index" integer DEFAULT 0;--> statement-breakpoint
ALTER TABLE "user_medical_folder" ADD CONSTRAINT "user_medical_folder_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_medical_folder_activity" ADD CONSTRAINT "user_medical_folder_activity_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_medical_folder_activity" ADD CONSTRAINT "user_medical_folder_activity_folder_id_user_medical_folder_id_fk" FOREIGN KEY ("folder_id") REFERENCES "public"."user_medical_folder"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_medical_folder_activity" ADD CONSTRAINT "user_medical_folder_activity_target_document_id_user_medical_history_id_fk" FOREIGN KEY ("target_document_id") REFERENCES "public"."user_medical_history"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_medical_file" ADD CONSTRAINT "user_medical_file_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_medical_history" ADD CONSTRAINT "user_medical_history_folder_id_user_medical_folder_id_fk" FOREIGN KEY ("folder_id") REFERENCES "public"."user_medical_folder"("id") ON DELETE set null ON UPDATE no action;