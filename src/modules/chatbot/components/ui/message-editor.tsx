"use client";

import { ChatRequestOptions, Message } from "ai";
import { Dispatch, SetStateAction, useState } from "react";
import { toast } from "sonner";

import { deleteTrailingMessages } from "@/app/(main)/essentia-ai/chat/actions";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

import { useAdjustHeight } from "../../hooks/use-adjust-height";
import { useUserMessageId } from "../../hooks/use-user-message-id";

export type MessageEditorProps = {
  message: Message;
  setMode: Dispatch<SetStateAction<"view" | "edit">>;
  setMessages: (
    messages: Message[] | ((messages: Message[]) => Message[]),
  ) => void;
  reload: (
    chatRequestOptions?: ChatRequestOptions,
  ) => Promise<string | null | undefined>;
};

export function MessageEditor({
  message,
  setMode,
  setMessages,
  reload,
}: MessageEditorProps) {
  const { userMessageIdFromServer } = useUserMessageId();
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const [draftContent, setDraftContent] = useState<string>(message.content);

  const { textareaRef, adjustHeight } = useAdjustHeight();

  const handleInput = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDraftContent(event.target.value);
    adjustHeight();
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    const messageId = userMessageIdFromServer ?? message.id;

    if (!messageId) {
      toast.error("Something went wrong, please try again!");
      setIsSubmitting(false);
      return;
    }

    await deleteTrailingMessages({
      id: messageId,
    });

    setMessages((messages) => {
      const index = messages.findIndex((m) => m.id === message.id);

      if (index !== -1) {
        const updatedMessage = {
          ...message,
          content: draftContent,
        };

        return [...messages.slice(0, index), updatedMessage];
      }

      return messages;
    });

    setMode("view");
    reload();
  };

  return (
    <div className="flex w-full flex-col gap-2">
      <Textarea
        ref={textareaRef}
        className="w-full resize-none overflow-hidden rounded-xl bg-background !text-base shadow-none outline outline-1 outline-danger"
        value={draftContent}
        onChange={handleInput}
      />

      <div className="flex flex-row justify-end gap-2">
        <Button
          variant="outline"
          className="h-fit border-none px-3 py-2 shadow-none"
          onClick={() => {
            setMode("view");
          }}
        >
          Cancelar
        </Button>
        <Button
          variant="destructive"
          className="h-fit px-3 py-2 shadow-none"
          disabled={isSubmitting}
          onClick={handleSubmit}
        >
          {isSubmitting ? "Enviando..." : "Enviar"}
        </Button>
      </div>
    </div>
  );
}
