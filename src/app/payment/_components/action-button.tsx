"use client";

import { motion } from "motion/react";
import { memo } from "react";

import { Button, type ButtonVariant } from "@/components/ui/button";

import { ANIMATION_DELAYS } from "../_lib/utils";

import type { LucideIcon } from "lucide-react";
import type React from "react";

interface ActionButtonProps {
  onClick: () => void;
  icon: LucideIcon;
  children: React.ReactNode;
  variant?: ButtonVariant;
}

const ActionButton = ({
  onClick,
  icon: Icon,
  children,
  variant = "default",
}: ActionButtonProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: ANIMATION_DELAYS.button }}
      className="flex items-center justify-center"
    >
      <Button onClick={onClick} variant={variant} size="lg">
        <Icon />
        {children}
      </Button>
    </motion.div>
  );
};

export default memo(ActionButton);
