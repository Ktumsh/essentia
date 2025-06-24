"use client";

import { CheckCircle2, XCircle, Loader } from "lucide-react";
import { motion, type Variants } from "motion/react";
import { memo } from "react";

import { cn } from "@/utils";

import type { CallbackStatus } from "@/lib/types";

interface StatusIconProps {
  status: CallbackStatus;
}

const StatusIcon = ({ status }: StatusIconProps) => {
  const iconVariants: Variants = {
    initial: { scale: 0, rotate: -180, opacity: 0 },
    animate: {
      scale: 1,
      rotate: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 15,
      },
    },
    exit: {
      scale: 0,
      rotate: 180,
      opacity: 0,
      transition: {
        duration: 0.2,
      },
    },
  };

  if (status === "loading") {
    return <Loader className="text-primary mx-auto size-6 animate-spin" />;
  }

  const iconConfig = {
    success: {
      Icon: CheckCircle2,
      color: "text-green-500",
      bgColor: "bg-green-500/20",
    },
    canceled: {
      Icon: XCircle,
      color: "text-yellow-500",
      bgColor: "bg-yellow-500/20",
    },
    failure: {
      Icon: XCircle,
      color: "text-red-500",
      bgColor: "bg-red-500/20",
    },
  };

  const config = iconConfig[status as keyof typeof iconConfig];
  if (!config) return null;

  const { Icon, color, bgColor } = config;

  return (
    <motion.div
      variants={iconVariants}
      initial="initial"
      animate="animate"
      className="relative flex items-center justify-center"
      role="img"
      aria-label={`Estado: ${status}`}
    >
      <div
        className={cn(
          "grid size-16 place-content-center rounded-full",
          bgColor,
        )}
      >
        <Icon className={cn("relative z-10 size-12", color)} />
      </div>
    </motion.div>
  );
};

export default memo(StatusIcon);
