"use client";

import { ArrowDown } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";

import { Button } from "@/components/ui/button";

interface ButtonToBottomProps {
  isAtBottom: boolean;
  scrollToBottom: () => void;
}

const ButtonToBottom = ({
  isAtBottom,
  scrollToBottom,
  ...props
}: ButtonToBottomProps) => {
  return (
    <AnimatePresence>
      {!isAtBottom && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="absolute -top-12 right-4 z-10 md:right-1/2 md:translate-x-1/2"
        >
          <Button
            data-testid="scroll-to-bottom-button"
            aria-label="Ir al final del chat"
            size="icon"
            variant="outline"
            onClick={(e) => {
              e.preventDefault();
              scrollToBottom();
            }}
            {...props}
            className="text-foreground/80 hover:border-primary hover:text-primary dark:border-alternative dark:hover:bg-background bg-background hover:bg-background dark:bg-accent border-slate-300 hover:opacity-100! hover:shadow-md dark:hover:text-white"
          >
            <ArrowDown />
            <span className="sr-only">Ir al final del chat</span>
          </Button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ButtonToBottom;
