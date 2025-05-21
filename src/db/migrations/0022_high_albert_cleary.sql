ALTER TABLE "payment" ALTER COLUMN "plan" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "subscription" ADD COLUMN "future_type" varchar(50);