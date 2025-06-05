"use client";

import { motion, useAnimationControls } from "motion/react";
import { useCallback } from "react";

import { cn } from "@/utils";

import { Button, ButtonSize, ButtonVariant } from "../ui/button";

import type { HTMLAttributes } from "react";

interface AttachButtonProps extends HTMLAttributes<HTMLButtonElement> {
  size?: ButtonSize;
  variant?: ButtonVariant;
  iconSize?: number;
  disabled?: boolean;
}

const AttachButton = ({
  onMouseEnter,
  onMouseLeave,
  className,
  size,
  variant,
  iconSize = 24,
  disabled,
  ...props
}: AttachButtonProps) => {
  const controls = useAnimationControls();

  const handleMouseEnter = useCallback(() => {
    controls.start({
      rotate: [0, -12, 8, 0],
      scale: [1, 1.05, 1],
      transition: {
        duration: 0.6,
        ease: "easeInOut",
      },
    });
  }, [controls]);

  const handleMouseLeave = useCallback(() => {
    controls.stop();
    controls.set({ rotate: 0, scale: 1 });
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
        animate={controls}
      >
        <path d="M13.234 20.252 21 12.3" />
        <path d="m16 6-8.414 8.586a2 2 0 0 0 0 2.828 2 2 0 0 0 2.828 0l8.414-8.586a4 4 0 0 0 0-5.656 4 4 0 0 0-5.656 0l-8.415 8.585a6 6 0 1 0 8.486 8.486" />
      </motion.svg>
      {props.children}
    </Button>
  );
};

export { AttachButton };
