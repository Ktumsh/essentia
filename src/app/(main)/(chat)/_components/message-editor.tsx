"use client";

import { UseChatHelpers } from "@ai-sdk/react";
import { Loader } from "lucide-react";
import { Dispatch, SetStateAction, useState } from "react";

import { deleteTrailingMessages } from "@/app/(main)/(chat)/actions";
import { Button } from "@/components/kit/button";
import { Textarea } from "@/components/kit/textarea";

import { useAdjustHeight } from "../_hooks/use-adjust-height";

import type { UIMessage } from "ai";

export type MessageEditorProps = {
  message: UIMessage;
  setMode: Dispatch<SetStateAction<"view" | "edit">>;
  setMessages: UseChatHelpers["setMessages"];
  reload: UseChatHelpers["reload"];
};

export function MessageEditor({
  message,
  setMode,
  setMessages,
  reload,
}: MessageEditorProps) {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const [draftContent, setDraftContent] = useState<string>(message.content);

  const { textareaRef, adjustHeight } = useAdjustHeight();

  const handleInput = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDraftContent(event.target.value);
    adjustHeight();
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);

    await deleteTrailingMessages({
      id: message.id,
    });

    // @ts-expect-error todo: support UIMessage in setMessages
    setMessages((messages) => {
      const index = messages.findIndex((m) => m.id === message.id);

      if (index !== -1) {
        const updatedMessage = {
          ...message,
          content: draftContent,
          parts: [{ type: "text", text: draftContent }],
        };

        return [...messages.slice(0, index), updatedMessage];
      }

      return messages;
    });

    setMode("view");
    reload();
  };

  return (
    <div className="bg-background border-alternative flex w-full flex-col gap-2 rounded-xl border px-2.5 py-1.5 md:px-4 md:py-2.5">
      <Textarea
        ref={textareaRef}
        className="text-foreground [field-sizing:content] h-auto! max-h-[20dvh] min-h-0 w-full resize-none overflow-hidden overflow-y-auto rounded-none border-none p-0 shadow-none focus-visible:ring-0"
        value={draftContent}
        onChange={handleInput}
      />

      <div className="flex flex-row justify-end gap-2">
        <Button
          size="sm"
          variant="outline"
          radius="full"
          onClick={() => {
            setMode("view");
          }}
        >
          Cancelar
        </Button>
        <Button
          size="sm"
          radius="full"
          disabled={isSubmitting}
          onClick={handleSubmit}
        >
          {isSubmitting ? (
            <>
              <Loader className="size-4 animate-spin" />
              Enviando...
            </>
          ) : (
            "Enviar"
          )}
        </Button>
      </div>
    </div>
  );
}
