"use client";

import { motion, useAnimation } from "motion/react";
import { useCallback } from "react";

import { Button, ButtonVariant } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/utils";

import type { Variants } from "motion/react";
import type { HTMLAttributes } from "react";

interface SparklesButtonProps extends HTMLAttributes<HTMLButtonElement> {
  size?: "default" | "icon" | "sm" | "lg" | null;
  variant?: ButtonVariant;

  iconSize?: number;
  disabled?: boolean;
}

const sparkleVariants: Variants = {
  initial: {
    y: 0,
    fill: "none",
    scale: 1,
  },
  animate: {
    scale: [1, 0.7, 1],
    fill: "currentColor",
    transition: {
      duration: 0.7,
      bounce: 0.3,
    },
  },
};

const starVariants: Variants = {
  initial: {
    opacity: 1,
    x: 0,
    y: 0,
  },
  blink: (custom: number) => ({
    opacity: [1, 0, 1],
    transition: {
      duration: 0.8,
      delay: custom,
      type: "tween",
      ease: "easeInOut",
    },
  }),
};

const SparklesButton = ({
  onMouseEnter,
  onMouseLeave,
  className,
  size,
  variant = "premium",
  iconSize = 28,
  disabled,
  children,
  ...props
}: SparklesButtonProps) => {
  const isMobile = useIsMobile();
  const sparkleControls = useAnimation();
  const starControls = useAnimation();

  const handleEnter = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      sparkleControls.start("animate");
      starControls.start("blink");
      onMouseEnter?.(e);
    },
    [sparkleControls, starControls, onMouseEnter],
  );

  const handleLeave = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      sparkleControls.start("initial");
      starControls.start("initial");
      onMouseLeave?.(e);
    },
    [sparkleControls, starControls, onMouseLeave],
  );

  return (
    <Button
      size={size}
      variant={variant}
      disabled={disabled}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      className={cn(isMobile && "[&_svg]:[&_path]:first:fill-white", className)}
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
        style={{ overflow: "visible" }}
      >
        <motion.path
          d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z"
          variants={sparkleVariants}
          animate={sparkleControls}
        />
        <motion.path
          d="M20 3v4"
          variants={starVariants}
          animate={starControls}
          custom={0.5}
        />
        <motion.path
          d="M22 5h-4"
          variants={starVariants}
          animate={starControls}
          custom={0.5}
        />
        <motion.path
          d="M4 17v2"
          variants={starVariants}
          animate={starControls}
          custom={0.8}
        />
        <motion.path
          d="M5 18H3"
          variants={starVariants}
          animate={starControls}
          custom={0.8}
        />
      </svg>
      {children && <span>{children}</span>}
    </Button>
  );
};

export { SparklesButton };
