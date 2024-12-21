ALTER TABLE "email_verification" RENAME TO "email_sends";--> statement-breakpoint
ALTER TABLE "email_sends" DROP CONSTRAINT "email_verification_user_id_user_id_fk";
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "email_sends" ADD CONSTRAINT "email_sends_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
