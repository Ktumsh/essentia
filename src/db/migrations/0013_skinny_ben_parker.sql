CREATE TABLE "user_task" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"name" varchar(80) NOT NULL,
	"chat_id" uuid NOT NULL,
	"instructions" varchar(100) NOT NULL,
	"frequency" varchar NOT NULL,
	"time" varchar(5) NOT NULL,
	"exact_date" timestamp DEFAULT NULL,
	"week_day" varchar(20),
	"month_day" integer,
	"month" varchar(20),
	"status" varchar DEFAULT 'active' NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "user_task" ADD CONSTRAINT "user_task_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_task" ADD CONSTRAINT "user_task_chat_id_chat_id_fk" FOREIGN KEY ("chat_id") REFERENCES "public"."chat"("id") ON DELETE cascade ON UPDATE no action;