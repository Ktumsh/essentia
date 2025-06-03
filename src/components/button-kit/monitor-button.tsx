"use client";

import { motion, useAnimation, Variants } from "motion/react";
import { useCallback } from "react";

import { cn } from "@/utils";

import { Button, ButtonSize, ButtonVariant } from "../kit/button";

import type { HTMLAttributes } from "react";

interface MonitorButtonProps extends HTMLAttributes<HTMLButtonElement> {
  size?: ButtonSize;
  variant?: ButtonVariant;
  iconSize?: number;
  disabled?: boolean;
  svgClassName?: string;
}

const iconVariants: Variants = {
  normal: { rotate: 0, y: 0 },
  animate: {
    y: [0, -1, 0],
    rotate: [0, -8, 0, 0],
    transition: {
      duration: 0.8,
      ease: "easeInOut",
    },
  },
};

const MonitorButton = ({
  onMouseEnter,
  onMouseLeave,
  className,
  size,
  variant,
  iconSize = 28,
  disabled,
  svgClassName,
  ...props
}: MonitorButtonProps) => {
  const controls = useAnimation();

  const handleMouseEnter = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      controls.start("animate");
      onMouseEnter?.(e);
    },
    [controls, onMouseEnter],
  );

  const handleMouseLeave = useCallback(
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
        className={cn(svgClassName)}
        variants={iconVariants}
        animate={controls}
        initial="normal"
        style={{ transformOrigin: "center" }}
      >
        <rect width="20" height="14" x="2" y="3" rx="2" />
        <line x1="8" x2="16" y1="21" y2="21" />
        <line x1="12" x2="12" y1="17" y2="21" />
      </motion.svg>
      {props.children}
    </Button>
  );
};

export { MonitorButton };
