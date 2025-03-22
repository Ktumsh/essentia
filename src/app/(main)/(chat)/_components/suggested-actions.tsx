"use client";

import { UseChatHelpers } from "@ai-sdk/react";
import { Attachment, Message } from "ai";
import { motion } from "motion/react";
import { useEffect, useState } from "react";

import { Button } from "@/components/kit/button";
import { INITIAL_CHAT_MESSAGES } from "@/consts/initial-chat-messages";
import { useChatContext } from "@/hooks/use-chat-context";
import { cn, shuffleArray } from "@/lib/utils";

interface SuggestedActionsProps {
  chatId: string;
  messages: Message[];
  attachments: Attachment[];
  uploadQueue: string[];
  isPremium: boolean | null;
  append: UseChatHelpers["append"];
}

const SuggestedActions = (props: SuggestedActionsProps) => {
  const { chatId, messages, attachments, uploadQueue, isPremium, append } =
    props;

  const [suggestedActions, setSuggestedActions] = useState(
    INITIAL_CHAT_MESSAGES,
  );

  const { setActiveChatId } = useChatContext();

  useEffect(() => {
    setSuggestedActions((prevMessages) => shuffleArray([...prevMessages]));
  }, []);

  if (!isPremium) return null;

  return (
    <>
      {messages.length === 0 &&
        attachments.length === 0 &&
        uploadQueue.length === 0 && (
          <div className="no-scrollbar mb-4 flex grid-cols-2 gap-2 overflow-x-auto px-4 md:grid md:overflow-visible md:px-0">
            {suggestedActions.slice(0, 4).map((suggestedAction, index) => (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ delay: 0.1 * index }}
                key={index}
                className="w-full"
              >
                <Button
                  disabled={!isPremium}
                  fullWidth
                  radius="xl"
                  onClick={async () => {
                    window.history.replaceState(
                      {},
                      "",
                      `/essentia-ai/chat/${chatId}`,
                    );
                    setActiveChatId(chatId);

                    append({
                      role: "user",
                      content: suggestedAction.action,
                    });
                  }}
                  className="text-foreground hover:shadow-little-pretty bg-background hover:bg-background border-border h-auto min-w-60 flex-col items-start gap-0 border p-4 text-start will-change-transform active:scale-[.97] md:min-w-0 md:hover:-translate-y-1"
                >
                  <suggestedAction.icon
                    className={cn("size-4", suggestedAction.iconColor)}
                  />
                  <span className="text-sm font-semibold text-nowrap">
                    {suggestedAction.heading}
                  </span>
                  <span className="text-muted-foreground text-sm font-normal text-nowrap">
                    {suggestedAction.subheading}
                  </span>
                </Button>
              </motion.div>
            ))}
          </div>
        )}
    </>
  );
};

export default SuggestedActions;
