"use client";

import { motion } from "motion/react";
import { usePathname } from "next/navigation";

import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/utils";

const ChatDisclaimer = ({ className }: { className?: string }) => {
  const pathname = usePathname();
  const isChatPage = pathname.startsWith("/aeris/chat");

  const isMobile = useIsMobile();

  if (!isChatPage || isMobile) return null;

  return (
    <motion.p
      initial={{ opacity: 0, y: 4 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4, duration: 0.3, ease: "easeOut" }}
      className={cn(
        "font-dmsans text-muted-foreground mb-2 px-2 text-center text-xs leading-normal",
        className,
      )}
    >
      Aeris puede equivocarse. Comprueba la información si es importante.
    </motion.p>
  );
};

export default ChatDisclaimer;
