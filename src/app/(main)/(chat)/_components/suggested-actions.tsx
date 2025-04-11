"use client";

import { UseChatHelpers } from "@ai-sdk/react";
import { Attachment, Message } from "ai";
import { motion } from "motion/react";
import { useEffect, useState } from "react";

import { Button } from "@/components/kit/button";
import { INITIAL_CHAT_MESSAGES } from "@/consts/initial-chat-messages";
import { cn, shuffleArray } from "@/lib/utils";

interface SuggestedActionsProps {
  chatId: string;
  messages: Message[];
  attachments: Attachment[];
  uploadQueue: string[];
  isPremium: boolean | null;
  setInput: UseChatHelpers["setInput"];
}

const SuggestedActions = (props: SuggestedActionsProps) => {
  const { messages, attachments, uploadQueue, isPremium } = props;

  const [suggestedActions, setSuggestedActions] = useState(
    INITIAL_CHAT_MESSAGES,
  );

  useEffect(() => {
    setSuggestedActions((prevMessages) => shuffleArray([...prevMessages]));
  }, []);

  if (!isPremium) return null;

  return (
    <>
      {messages.length === 0 &&
        attachments.length === 0 &&
        uploadQueue.length === 0 && (
          <div className="no-scrollbar flex max-w-full flex-wrap justify-center gap-2 px-4 pb-4 md:flex-nowrap md:overflow-visible md:px-0 md:pb-0">
            {suggestedActions.slice(0, 4).map((suggestedAction, index) => (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ delay: 0.1 * index }}
                key={index}
                className="md:flex-auto"
              >
                <Button
                  disabled={!isPremium}
                  radius="full"
                  onClick={() => {
                    props.setInput(suggestedAction.action);
                  }}
                  className="hover:shadow-little-pretty bg-background hover:bg-background text-foreground h-auto border px-2! py-1.5 duration-300 will-change-transform active:scale-[.97] md:w-full md:hover:-translate-y-1"
                >
                  <suggestedAction.icon
                    className={cn("size-3.5", suggestedAction.iconColor)}
                  />
                  <span className="text-xs font-normal text-nowrap">
                    {suggestedAction.heading}
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
