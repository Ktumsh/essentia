import { motion } from "motion/react";

import { SpinnerIcon } from "@/modules/icons/status";

const MapLoading = () => {
  return (
    <div className="absolute inset-0 z-50 size-full bg-white before:duration-1000! dark:bg-full-dark">
      <div className="absolute inset-0 -mt-16 flex flex-col items-center justify-center gap-2 md:-mt-14">
        <SpinnerIcon
          className="size-8 text-main-m dark:text-main-dark-m"
          aria-hidden="true"
        />
        <h3 className="text-center text-2xl font-semibold text-main dark:text-main-dark">
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
