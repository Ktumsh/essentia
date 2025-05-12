CREATE TABLE "tool_invocation" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"chat_message_id" uuid NOT NULL,
	"tool_name" text NOT NULL,
	"tool_call_id" text NOT NULL,
	"args" json NOT NULL,
	"result" json NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "tool_invocation" ADD CONSTRAINT "tool_invocation_chat_message_id_chat_message_id_fk" FOREIGN KEY ("chat_message_id") REFERENCES "public"."chat_message"("id") ON DELETE cascade ON UPDATE no action;