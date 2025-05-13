"use client";

import { motion, type Variants } from "motion/react";

const letterVariants: Variants = {
  initial: { opacity: 0, y: 10 },
  animate: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.05, ease: "easeOut" },
  }),
};

const dotVariants: Variants = {
  animate: {
    y: ["0%", "-50%", "0%"],
    transition: {
      y: { repeat: Infinity, duration: 0.8, ease: "easeInOut" },
    },
  },
};

export default function MapLoading() {
  const text = "Cargando tu entorno";
  return (
    <div className="bg-background absolute inset-0 z-50 flex size-full items-center justify-center backdrop-blur-sm">
      <div className="relative flex flex-col items-center gap-6">
        <h3 className="text-foreground flex overflow-hidden text-2xl font-semibold sm:text-3xl">
          {text.split("").map((char, idx) => (
            <motion.span
              key={idx}
              custom={idx}
              initial="initial"
              animate="animate"
              variants={letterVariants}
              className="inline-block"
            >
              {char === " " ? "\u00A0" : char}
            </motion.span>
          ))}
        </h3>

        <div className="flex items-end gap-2">
          {[0, 1, 2].map((i) => (
            <motion.span
              key={i}
              className="bg-foreground/50 block h-2 w-2 rounded-full"
              animate="animate"
              variants={dotVariants}
              transition={{ delay: i * 0.2 }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
