"use client";

import { motion } from "motion/react";

import { cn } from "@/utils";

import { BotAvatar } from "./role-avatar";

const ThinkingMessage = () => {
  const role = "assistant";

  return (
    <motion.div
      data-testid="message-assistant-loading"
      initial={{ y: 5, opacity: 0 }}
      animate={{ y: 0, opacity: 1, transition: { delay: 1 } }}
      data-role={role}
      className="group/message relative mx-auto flex w-full max-w-3xl items-start px-4"
    >
      <div
        className={cn(
          "flex w-full gap-4 rounded-xl group-data-[role=user]/message:ml-auto group-data-[role=user]/message:w-fit group-data-[role=user]/message:max-w-2xl group-data-[role=user]/message:px-3 group-data-[role=user]/message:py-2",
          {
            "group-data-[role=user]/message:bg-muted": true,
          },
        )}
      >
        <BotAvatar />
        <span className="loading-shimmer text-sm md:text-base">Mmm...</span>
      </div>
    </motion.div>
  );
};

export default ThinkingMessage;
