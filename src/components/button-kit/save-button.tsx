"use client";

import { motion, useAnimation } from "motion/react";
import { useCallback } from "react";

import { cn } from "@/utils";

import { Button, ButtonSize, ButtonVariant } from "../ui/button";

import type { Variants } from "motion/react";
import type { HTMLAttributes } from "react";

interface SaveButtonProps extends HTMLAttributes<HTMLButtonElement> {
  size?: ButtonSize;
  variant?: ButtonVariant;
  iconSize?: number;
  disabled?: boolean;
}

const disquetteVariants: Variants = {
  normal: { y: 0 },
  animate: {
    y: [0, -2, 2, 0],
    transition: {
      duration: 0.5,
      ease: "easeInOut",
    },
  },
};

const SaveButton = ({
  onMouseEnter,
  onMouseLeave,
  className,
  size,
  variant,
  disabled,
  iconSize = 24,
  ...props
}: SaveButtonProps) => {
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
        <motion.path
          variants={disquetteVariants}
          animate={controls}
          d="M15.2 3a2 2 0 0 1 1.4.6l3.8 3.8a2 2 0 0 1 .6 1.4V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z"
        />
        <motion.path
          variants={disquetteVariants}
          animate={controls}
          d="M17 21v-7a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v7"
        />
        <motion.path
          variants={disquetteVariants}
          animate={controls}
          d="M7 3v4a1 1 0 0 0 1 1h7"
        />
      </svg>
      {props.children}
    </Button>
  );
};

export { SaveButton };
