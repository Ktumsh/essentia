"use client";

import { motion } from "framer-motion";
import { spinner } from "./spinner";

const InitialLoading = () => {
  return (
    <div className="inline-flex items-center gap-1">
      <div className="h-[24px] flex flex-row items-center flex-1 space-y-2 overflow-hidden">
        {spinner}
      </div>
      <span className="text-base-color-m dark:text-base-color-dark-m">
        {"Poniendo un poco de esencia".split("").map((character, index) => (
          <motion.span
            key={index}
            variants={{
              initial: {
                opacity: 0.5,
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
