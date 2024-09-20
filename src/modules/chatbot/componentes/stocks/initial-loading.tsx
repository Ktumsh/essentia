"use client";

import { SpinnerMessage } from "./message";
import { motion } from "framer-motion";

const InitialLoading = () => {
  return (
    <div className="inline-flex items-center gap-1">
      <SpinnerMessage />
      <span className="text-base-color-m dark:text-base-color-dark-m animate-pulse">
        {"Poniendo un poco de esencia".split("").map((character, index) => (
          <motion.span
            key={index}
            variants={{
              initial: {
                opacity: 0.75,
                x: -100,
              },
              animate: {
                opacity: 1,
                x: 0,
              },
            }}
            initial="initial"
            animate="animate"
            transition={{
              duration: 0.25,
              ease: "easeIn",
              delay: index * 0.05,
              staggerChildren: 0.05,
              repeat: Infinity,
              repeatType: "mirror",
              repeatDelay: 1,
            }}
          >
            {character === " " ? "\u00A0" : character}
          </motion.span>
        ))}
      </span>
    </div>
  );
};

export { InitialLoading };
