"use client";

import { motion } from "motion/react";
import { useEffect, useState } from "react";

import { Button } from "@/components/kit/button";
import { SUGGESTED_ACTION_DATA } from "@/db/data/suggested-action-data";
import { cn, shuffleArray } from "@/utils";

import type { UseChatHelpers } from "@ai-sdk/react";

interface SuggestedActionsProps {
  isPremium: boolean | null;
  setInput: UseChatHelpers["setInput"];
}

const SuggestedActions = (props: SuggestedActionsProps) => {
  const { isPremium } = props;

  const [suggestedActions, setSuggestedActions] = useState(
    SUGGESTED_ACTION_DATA,
  );

  useEffect(() => {
    setSuggestedActions((prevMessages) => shuffleArray([...prevMessages]));
  }, []);

  if (!isPremium) return null;

  return (
    <div className="no-scrollbar flex max-w-full flex-wrap justify-center gap-2 px-4 pb-4 md:mt-6 md:flex-nowrap md:overflow-visible md:px-0 md:pb-0">
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
  );
};

export default SuggestedActions;
