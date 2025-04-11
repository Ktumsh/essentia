CREATE TABLE "user_medical_file" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"medical_history_id" uuid NOT NULL,
	"url" text NOT NULL,
	"original_name" varchar(200) NOT NULL,
	"size" integer NOT NULL,
	"content_type" varchar(100) NOT NULL,
	"uploaded_at" timestamp NOT NULL
);
--> statement-breakpoint
ALTER TABLE "user_medical_file" ADD CONSTRAINT "user_medical_file_medical_history_id_user_medical_history_id_fk" FOREIGN KEY ("medical_history_id") REFERENCES "public"."user_medical_history"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_medical_history" DROP COLUMN "file_url";--> statement-breakpoint
ALTER TABLE "user_medical_history" DROP COLUMN "file_uploaded_at";