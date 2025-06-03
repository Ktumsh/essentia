"use client";

import { motion, useAnimationControls } from "motion/react";
import { useCallback } from "react";

import { cn } from "@/utils";

import { Button, ButtonSize, ButtonVariant } from "../kit/button";

import type { HTMLAttributes } from "react";

interface PlayButtonProps extends HTMLAttributes<HTMLButtonElement> {
  size?: ButtonSize;
  variant?: ButtonVariant;
  iconSize?: number;
  disabled?: boolean;
}

const PlayButton = ({
  onMouseEnter,
  onMouseLeave,
  className,
  size,
  variant,
  iconSize = 24,
  disabled,
  ...props
}: PlayButtonProps) => {
  const controls = useAnimationControls();

  const handleMouseEnter = useCallback(() => {
    controls.start({
      x: [0, -1, 2, 0],
      rotate: [0, -10, 0, 0],
      transition: {
        duration: 0.5,
        times: [0, 0.2, 0.5, 1],
        stiffness: 260,
        damping: 20,
      },
    });
  }, [controls]);

  const handleMouseLeave = useCallback(() => {
    controls.stop();
    controls.set({ x: 0, rotate: 0 });
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
        <motion.polygon
          points="6 3 20 12 6 21 6 3"
          animate={controls}
          initial={{ x: 0, rotate: 0 }}
        />
      </motion.svg>
      {props.children}
    </Button>
  );
};

export { PlayButton };
