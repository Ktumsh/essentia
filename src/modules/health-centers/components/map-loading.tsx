import { motion } from "framer-motion";
import { SpinnerIcon } from "@/modules/icons/status";

const MapLoading = () => {
  return (
    <div className="absolute inset-0 size-full before:!duration-1000 md:rounded-3xl bg-white dark:bg-base-full-dark border border-gray-200 dark:border-base-dark z-50">
      <div className="flex flex-col items-center justify-center absolute inset-0 gap-2">
        <SpinnerIcon
          className="size-8 text-base-color-m dark:text-base-color-dark-m"
          aria-hidden="true"
        />
        <h3 className="text-2xl font-semibold text-center text-base-color dark:text-base-color-dark">
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
