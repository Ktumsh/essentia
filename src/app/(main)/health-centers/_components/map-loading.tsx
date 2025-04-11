import { motion } from "motion/react";

import { SpinnerIcon } from "@/components/ui/icons/status";

const MapLoading = () => {
  return (
    <div className="bg-background absolute inset-0 z-50 size-full before:duration-1000!">
      <div className="absolute inset-0 -mt-16 flex flex-col items-center justify-center gap-2 md:-mt-14">
        <SpinnerIcon
          className="text-muted-foreground size-8"
          aria-hidden="true"
        />
        <h3 className="text-foreground text-center text-2xl font-semibold">
          {"Cargando mapa".split("").map((character, index) => (
            <motion.span
              key={index}
              variants={{
                initial: {
                  opacity: 0,
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
        </h3>
      </div>
    </div>
  );
};

export default MapLoading;
