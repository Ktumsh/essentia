"use client";

import { motion, useAnimationControls } from "motion/react";
import { useCallback } from "react";

import { cn } from "@/utils";

import { Button, ButtonSize, ButtonVariant } from "../ui/button";

import type { HTMLAttributes } from "react";

interface RepeatButtonProps extends HTMLAttributes<HTMLButtonElement> {
  size?: ButtonSize;
  variant?: ButtonVariant;
  iconSize?: number;
}

const RepeatButton = ({
  onMouseEnter,
  onMouseLeave,
  className,
  size,
  variant,
  iconSize = 28,
  ...props
}: RepeatButtonProps) => {
  const topGroup = useAnimationControls();
  const bottomGroup = useAnimationControls();

  const handleMouseEnter = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      topGroup.start({
        x: -2,
        transition: { duration: 0.3, ease: "easeOut" },
      });
      bottomGroup.start({
        x: 2,
        transition: { duration: 0.3, ease: "easeOut", delay: 0.05 },
      });
      onMouseEnter?.(e);
    },
    [topGroup, bottomGroup, onMouseEnter],
  );

  const handleMouseLeave = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      topGroup.start({ x: 0, transition: { duration: 0.2 } });
      bottomGroup.start({ x: 0, transition: { duration: 0.2 } });
      onMouseLeave?.(e);
    },
    [topGroup, bottomGroup, onMouseLeave],
  );

  return (
    <Button
      size={size}
      variant={variant}
      className={cn(className)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={iconSize}
        height={iconSize}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {/* Grupo superior */}
        <motion.g animate={topGroup} initial={false}>
          <path d="m17 2 4 4-4 4" />
          <path d="M3 11v-1a4 4 0 0 1 4-4h14" />
        </motion.g>

        {/* Grupo inferior */}
        <motion.g animate={bottomGroup} initial={false}>
          <path d="m7 22-4-4 4-4" />
          <path d="M21 13v1a4 4 0 0 1-4 4H3" />
        </motion.g>
      </svg>
      {props.children}
    </Button>
  );
};

export { RepeatButton };
