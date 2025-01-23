"use client";

import { Attachment, ChatRequestOptions, CreateMessage, Message } from "ai";
import { motion } from "motion/react";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { INITIAL_CHAT_MESSAGES } from "@/consts/initial-chat-messages";
import { useChatContext } from "@/modules/core/hooks/use-chat-context";
import { cn, shuffleArray } from "@/utils/common";

interface SuggestedActionsProps {
  chatId: string;
  messages: Message[];
  attachments: Attachment[];
  uploadQueue: string[];
  isPremium: boolean | null;
  append: (
    message: Message | CreateMessage,
    chatRequestOptions?: ChatRequestOptions,
  ) => Promise<string | null | undefined>;
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

  return (
    <>
      {messages.length === 0 &&
        attachments.length === 0 &&
        uploadQueue.length === 0 && (
          <motion.div
            initial={{ opacity: 1 }}
            animate={!isPremium ? { opacity: 0 } : { opacity: 1 }}
            transition={{ ease: "easeInOut", duration: 1, delay: 0.3 }}
            className="mb-4 flex grid-cols-2 gap-2 overflow-x-auto px-4 scrollbar-hide md:grid md:overflow-visible md:px-0"
          >
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
                  radius="lg"
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
                  className="h-auto min-w-60 flex-col items-start gap-0 bg-white p-4 text-start text-main shadow-none will-change-transform hover:bg-white hover:shadow-little-pretty active:scale-[.97] dark:bg-full-dark dark:text-main-dark dark:shadow-white/10 dark:hover:bg-full-dark md:min-w-0 md:hover:-translate-y-1"
                >
                  <suggestedAction.icon
                    className={cn("size-4", suggestedAction.iconColor)}
                  />
                  <span className="text-nowrap text-sm font-semibold">
                    {suggestedAction.heading}
                  </span>
                  <span className="text-nowrap text-sm font-normal text-main-m dark:text-main-dark-m">
                    {suggestedAction.subheading}
                  </span>
                </Button>
              </motion.div>
            ))}
          </motion.div>
        )}
    </>
  );
};

export default SuggestedActions;
