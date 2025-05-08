"use client";

import { ChevronDown } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

import { Markdown } from "@/components/markdown";
import { cn } from "@/lib/utils";

interface ReasoningMessageProps {
  isLoading: boolean;
  reasoning: string;
}

const ReasoningMessage = ({ isLoading, reasoning }: ReasoningMessageProps) => {
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

  return (
    <div className="flex flex-col">
      {isLoading ? (
        <button
          className="text-muted-foreground flex flex-row items-center gap-2"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <p className="loading-shimmer text-sm md:text-base">Razonando</p>
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
          className="text-muted-foreground flex flex-row items-center gap-2"
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
            className="border-muted-foreground/50 border-l-2 pl-4"
          >
            <Markdown className="prose-sm md:prose md:text-base!">
              {reasoning}
            </Markdown>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ReasoningMessage;
