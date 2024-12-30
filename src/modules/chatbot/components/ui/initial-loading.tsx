"use client";

import { motion } from "motion/react";

const InitialLoading = () => {
  const shimmerVariants = {
    initial: {
      opacity: 0.5,
    },
    animate: {
      opacity: 1,
    },
  };

  return (
    <div className="inline-flex items-center overflow-hidden">
      <span className="text-main-m dark:text-main-dark-m">
        {"Poniendo un poco de esencia".split("").map((character, index) => (
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
      </span>
    </div>
  );
};

export { InitialLoading };
