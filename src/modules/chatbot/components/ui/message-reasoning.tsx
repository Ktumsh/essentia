"use client";

import { ChevronDown } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

import { Markdown } from "@/modules/core/components/ui/renderers/markdown";
import { cn } from "@/utils/common";

interface MessageReasoningProps {
  isLoading: boolean;
  reasoning: string;
}

export function MessageReasoning({
  isLoading,
  reasoning,
}: MessageReasoningProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const variants = {
    collapsed: {
      height: 0,
      opacity: 0,
      marginTop: 0,
      marginBottom: 0,
    },
    expanded: {
      height: "auto",
      opacity: 1,
      marginTop: "1rem",
      marginBottom: "0.5rem",
    },
  };

  const shimmerVariants = {
    initial: {
      opacity: 0.5,
    },
    animate: {
      opacity: 1,
    },
  };

  return (
    <div className="flex flex-col">
      {isLoading ? (
        <button
          className="text-main-m dark:text-main-dark-m flex flex-row items-center gap-2"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <p className="text-sm md:text-base">
            {"Razonando".split("").map((character, index) => (
              <motion.span
                key={index}
                variants={shimmerVariants}
                initial="initial"
                animate="animate"
                transition={{
                  duration: 1,
                  ease: "easeInOut",
                  delay: index * 0.15,
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
              >
                {character === " " ? "\u00A0" : character}
              </motion.span>
            ))}
          </p>
          <div>
            <ChevronDown
              className={cn(
                "size-4 transition md:size-5",
                isExpanded && "rotate-180",
              )}
            />
          </div>
        </button>
      ) : (
        <button
          className="text-main-m dark:text-main-dark-m flex flex-row items-center gap-2"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <p className="text-sm md:text-base">Razonado por unos segundos</p>
          <div>
            <ChevronDown
              className={cn(
                "size-4 transition md:size-5",
                isExpanded && "rotate-180",
              )}
            />
          </div>
        </button>
      )}

      <AnimatePresence initial={false}>
        {isExpanded && (
          <motion.div
            key="content"
            initial="collapsed"
            animate="expanded"
            exit="collapsed"
            variants={variants}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            style={{ overflow: "hidden" }}
            className="border-main-l dark:border-main-dark-m border-l-2 pl-4"
          >
            <Markdown prose="text-main! dark:text-main-dark!">
              {reasoning}
            </Markdown>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
