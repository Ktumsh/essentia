ALTER TABLE "user" ADD COLUMN "status" varchar DEFAULT 'enabled' NOT NULL;--> statement-breakpoint
ALTER TABLE "user" DROP COLUMN IF EXISTS "state";