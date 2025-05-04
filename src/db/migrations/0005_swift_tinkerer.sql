ALTER TABLE "Stream" RENAME TO "chat_stream";--> statement-breakpoint
ALTER TABLE "chat_stream" DROP CONSTRAINT "Stream_chatId_chat_id_fk";
--> statement-breakpoint
ALTER TABLE "chat_stream" DROP CONSTRAINT "Stream_id_pk";--> statement-breakpoint
ALTER TABLE "chat_stream" ADD CONSTRAINT "chat_stream_id_pk" PRIMARY KEY("id");--> statement-breakpoint
ALTER TABLE "chat_stream" ADD CONSTRAINT "chat_stream_chatId_chat_id_fk" FOREIGN KEY ("chatId") REFERENCES "public"."chat"("id") ON DELETE no action ON UPDATE no action;