"use client";

import { ChevronUp } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

import { Button } from "@/components/kit/button";
import useScrollToUp from "@/hooks/use-scroll-to-up";

const ScrollToTopButton = ({
  scrollRef,
}: {
  scrollRef?: React.RefObject<HTMLElement | null>;
}) => {
  const { isVisible, scrollToTop } = useScrollToUp(scrollRef);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{
            duration: 0.3,
            type: "spring",
            stiffness: 300,
            damping: 25,
          }}
          className="fixed right-6 bottom-6 z-50"
        >
          <Button
            onClick={scrollToTop}
            size="icon"
            className="h-12 w-12 rounded-full bg-gradient-to-r from-indigo-600 to-pink-600 text-white shadow-lg transition-transform hover:scale-110 hover:from-indigo-700 hover:to-pink-700"
            aria-label="Volver arriba"
          >
            <ChevronUp className="h-6 w-6" />
          </Button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ScrollToTopButton;
