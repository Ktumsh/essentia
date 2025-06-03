"use client";

import { motion, useAnimationControls } from "motion/react";
import { useCallback } from "react";

import { cn } from "@/utils";

import { Button, ButtonSize, ButtonVariant } from "../kit/button";

import type { HTMLAttributes } from "react";

interface StopButtonProps extends HTMLAttributes<HTMLButtonElement> {
  size?: ButtonSize;
  variant?: ButtonVariant;
  iconSize?: number;
  disabled?: boolean;
}

const StopButton = ({
  onMouseEnter,
  onMouseLeave,
  className,
  size,
  variant,
  iconSize = 24,
  disabled,
  ...props
}: StopButtonProps) => {
  const controls = useAnimationControls();

  const handleMouseEnter = useCallback(() => {
    controls.start({
      scale: [1, 1.2, 1],
      x: [0, -2, 2, 0],
      transition: {
        duration: 0.4,
        ease: "easeInOut",
      },
    });
  }, [controls]);

  const handleMouseLeave = useCallback(() => {
    controls.stop();
    controls.set({ scale: 1, x: 0 });
  }, [controls]);

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
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        width={iconSize}
        height={iconSize}
        viewBox="0 0 24 24"
        fill="none"
        animate={controls}
      >
        <path
          fill="currentColor"
          d="M20.2 3H3.8a.8.8 0 0 0-.8.8v16.4a.8.8 0 0 0 .8.8h16.4a.8.8 0 0 0 .8-.8V3.8a.8.8 0 0 0-.8-.8"
        />
      </motion.svg>
      {props.children}
    </Button>
  );
};

export { StopButton };
