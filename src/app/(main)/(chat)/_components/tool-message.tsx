"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useMemo, useRef, useState } from "react";

import { TOOL_CREATING_MESSAGE_ALTERNATIVES } from "@/consts/tools";

interface ToolMessageProps {
  toolName: string;
}

const ToolMessage = ({ toolName }: ToolMessageProps) => {
  const messages = useMemo(() => {
    return TOOL_CREATING_MESSAGE_ALTERNATIVES[toolName] ?? ["Procesando..."];
  }, [toolName]);

  const shuffled = useRef<string[]>([]);
  const index = useRef(0);
  const [currentMessage, setCurrentMessage] = useState(messages[0]);

  useEffect(() => {
    shuffled.current = [...messages].sort(() => Math.random() - 0.5);
    index.current = 0;
    setCurrentMessage(shuffled.current[0]);

    const interval = setInterval(() => {
      index.current = (index.current + 1) % shuffled.current.length;
      setCurrentMessage(shuffled.current[index.current]);

      if (index.current === shuffled.current.length - 1) {
        setTimeout(() => {
          shuffled.current = [...messages].sort(() => Math.random() - 0.5);
        }, 0);
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [messages]);

  return (
    <div className="inline-flex items-center overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.span
          key={currentMessage}
          className="loading-shimmer text-sm md:text-base"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {currentMessage}
        </motion.span>
      </AnimatePresence>
    </div>
  );
};

export default ToolMessage;
