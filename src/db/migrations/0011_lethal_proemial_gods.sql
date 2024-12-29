CREATE TABLE IF NOT EXISTS "user_course_progress" (
	"user_id" uuid NOT NULL,
	"course_id" uuid NOT NULL,
	"completed" boolean DEFAULT false NOT NULL,
	"progress" integer DEFAULT 0 NOT NULL,
	"completed_at" timestamp DEFAULT NULL,
	"started_at" timestamp DEFAULT now(),
	CONSTRAINT "user_course_progress_user_id_course_id_pk" PRIMARY KEY("user_id","course_id")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "user_course_progress" ADD CONSTRAINT "user_course_progress_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "user_course_progress" ADD CONSTRAINT "user_course_progress_course_id_resource_id_fk" FOREIGN KEY ("course_id") REFERENCES "public"."resource"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
