ALTER TABLE "chat_stream" DROP CONSTRAINT "chat_stream_chatId_chat_id_fk";
--> statement-breakpoint
ALTER TABLE "chat_stream" ADD CONSTRAINT "chat_stream_chatId_chat_id_fk" FOREIGN KEY ("chatId") REFERENCES "public"."chat"("id") ON DELETE cascade ON UPDATE no action;