"use client";

import { motion, useAnimationControls } from "motion/react";
import { useCallback } from "react";

import { cn } from "@/utils";

import { Button, ButtonSize, ButtonVariant } from "../ui/button";

import type { HTMLAttributes } from "react";

interface AddUserButtonProps extends HTMLAttributes<HTMLButtonElement> {
  size?: ButtonSize;
  variant?: ButtonVariant;
  iconSize?: number;
  disabled?: boolean;
}

const AddUserButton = ({
  onMouseEnter,
  onMouseLeave,
  className,
  size,
  variant,
  iconSize = 24,
  disabled,
  ...props
}: AddUserButtonProps) => {
  const verticalBar = useAnimationControls();
  const horizontalBar = useAnimationControls();

  const handleMouseEnter = useCallback(() => {
    verticalBar.start({
      opacity: [0, 1],
      pathLength: [0, 1],
      transition: {
        delay: 0.3,
        duration: 0.2,
        opacity: { duration: 0.1, delay: 0.3 },
      },
    });

    horizontalBar.start({
      opacity: [0, 1],
      pathLength: [0, 1],
      transition: {
        delay: 0.6,
        duration: 0.2,
        opacity: { duration: 0.1, delay: 0.6 },
      },
    });
  }, [verticalBar, horizontalBar]);

  const handleMouseLeave = useCallback(() => {
    verticalBar.stop();
    horizontalBar.stop();
    verticalBar.set({ opacity: 1, pathLength: 1 });
    horizontalBar.set({ opacity: 1, pathLength: 1 });
  }, [verticalBar, horizontalBar]);

  return (
    <Button
      size={size}
      variant={variant}
      disabled={disabled}
      className={cn(className)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
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
      >
        {/* Círculo del usuario */}
        <path d="M2 21a8 8 0 0 1 13.292-6" />
        <circle cx="10" cy="8" r="5" />

        {/* Barra vertical del "+" */}
        <motion.path
          d="M19 16v6"
          animate={verticalBar}
          initial={{ opacity: 1, pathLength: 1 }}
        />

        {/* Barra horizontal del "+" */}
        <motion.path
          d="M22 19h-6"
          animate={horizontalBar}
          initial={{ opacity: 1, pathLength: 1 }}
        />
      </motion.svg>
      {props.children}
    </Button>
  );
};

export { AddUserButton };
