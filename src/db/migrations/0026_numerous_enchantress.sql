CREATE TABLE "plan" (
	"id" varchar(50) PRIMARY KEY NOT NULL,
	"name" varchar(100) NOT NULL,
	"description" text,
	"max_files" integer DEFAULT 6 NOT NULL,
	"price" integer DEFAULT 0,
	"support_level" varchar DEFAULT 'basic' NOT NULL,
	"is_available" boolean DEFAULT true NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now()
);
