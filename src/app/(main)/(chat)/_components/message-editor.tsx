"use client";

import { Dispatch, SetStateAction, useState } from "react";
import { toast } from "sonner";

import { deleteTrailingMessages } from "@/app/(main)/(chat)/actions";
import { Button } from "@/components/kit/button";
import { Textarea } from "@/components/kit/textarea";

import { useUserMessageId } from "../_hooks/use-user-message-id";

import type { ChatRequestOptions, Message } from "ai";

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

  const handleInput = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDraftContent(event.target.value);
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
    <div className="bg-background outline-danger/50 flex w-full flex-col gap-2 rounded-xl px-2.5 py-1.5 outline-2 md:px-4 md:py-2.5">
      <Textarea
        className="text-main-h dark:text-main-dark [field-sizing:content] h-auto! max-h-[20dvh] min-h-0 w-full resize-none overflow-hidden overflow-y-auto border-none p-0 text-base! shadow-none focus-visible:ring-0"
        value={draftContent}
        onChange={handleInput}
      />

      <div className="flex flex-row justify-end gap-2">
        <Button
          variant="outline"
          radius="full"
          onClick={() => {
            setMode("view");
          }}
        >
          Cancelar
        </Button>
        <Button radius="full" disabled={isSubmitting} onClick={handleSubmit}>
          {isSubmitting ? "Enviando..." : "Enviar"}
        </Button>
      </div>
    </div>
  );
}
