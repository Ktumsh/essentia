"use client";

import { motion, useAnimationControls } from "motion/react";
import { useCallback } from "react";

import { cn } from "@/utils";

import { Button, ButtonSize, ButtonVariant } from "../ui/button";

import type { HTMLAttributes } from "react";

interface PlusButtonProps extends HTMLAttributes<HTMLButtonElement> {
  size?: ButtonSize;
  variant?: ButtonVariant;
  iconSize?: number;
  disabled?: boolean;
}

const PlusButton = ({
  size,
  variant,
  iconSize = 28,
  disabled,
  className,
  onMouseEnter,
  onMouseLeave,
  ...props
}: PlusButtonProps) => {
  const controls = useAnimationControls();

  const handleEnter = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      controls.start("animate");
      onMouseEnter?.(e);
    },
    [controls, onMouseEnter],
  );

  const handleLeave = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      controls.start("normal");
      onMouseLeave?.(e);
    },
    [controls, onMouseLeave],
  );

  return (
    <Button
      size={size}
      variant={variant}
      disabled={disabled}
      className={cn(className)}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      {...props}
    >
      <motion.svg
        xmlns="http://www.w3.org/2000/svg"
        width={iconSize}
        height={iconSize}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial="normal"
        animate={controls}
        variants={{
          normal: { scale: 1 },
          animate: {
            scale: 1.1,
            transition: { type: "spring", stiffness: 220, damping: 15 },
          },
        }}
      >
        <motion.path
          d="M5 12h14"
          initial={{ pathLength: 1 }}
          variants={{
            normal: { pathLength: 1 },
            animate: {
              pathLength: [0, 1],
              transition: { duration: 0.3, ease: "easeOut", delay: 0.05 },
            },
          }}
        />
        <motion.path
          d="M12 5v14"
          initial={{ pathLength: 1 }}
          variants={{
            normal: { pathLength: 1 },
            animate: {
              pathLength: [0, 1],
              transition: { duration: 0.3, ease: "easeOut" },
            },
          }}
        />
      </motion.svg>
      {props.children}
    </Button>
  );
};

export { PlusButton };
