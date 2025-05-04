ALTER TABLE "plan" RENAME COLUMN "max_files" TO "max_documents";--> statement-breakpoint
ALTER TABLE "plan" ADD COLUMN "is_unlimited" boolean DEFAULT false NOT NULL;