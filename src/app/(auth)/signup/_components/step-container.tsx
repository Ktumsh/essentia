"use client";

import { AnimatePresence, motion } from "motion/react";
import * as React from "react";

type StepContainerProps = {
  step: number;
  current: number;
  children: React.ReactNode;
};

const StepContainer = ({ step, current, children }: StepContainerProps) => {
  const isActive = step === current;

  const contentVariants = {
    initial: { opacity: 0, x: 20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 },
  };

  return (
    <AnimatePresence initial={false} mode="popLayout">
      {isActive && (
        <motion.div
          key={current}
          variants={contentVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{ type: "spring", duration: 0.7 }}
          className="w-full"
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default StepContainer;
