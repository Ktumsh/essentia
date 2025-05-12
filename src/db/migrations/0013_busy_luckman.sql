ALTER TABLE "tool_invocation" RENAME TO "chat_tool";--> statement-breakpoint
ALTER TABLE "chat_tool" DROP CONSTRAINT "tool_invocation_chat_message_id_chat_message_id_fk";
--> statement-breakpoint
ALTER TABLE "chat_tool" ADD CONSTRAINT "chat_tool_chat_message_id_chat_message_id_fk" FOREIGN KEY ("chat_message_id") REFERENCES "public"."chat_message"("id") ON DELETE cascade ON UPDATE no action;