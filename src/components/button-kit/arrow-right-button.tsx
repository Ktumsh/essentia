"use client";

import { motion, useAnimationControls } from "motion/react";
import { useCallback } from "react";

import { cn } from "@/utils";

import { Button, ButtonSize, ButtonVariant } from "../kit/button";

import type { HTMLAttributes } from "react";

interface ArrowRightButtonProps extends HTMLAttributes<HTMLButtonElement> {
  type?: "button" | "submit" | "reset";
  size?: ButtonSize;
  variant?: ButtonVariant;
  iconSize?: number;
  disabled?: boolean;
}

const ArrowRightButton = ({
  onMouseEnter,
  onMouseLeave,
  className,
  size,
  variant,
  iconSize = 24,
  disabled,
  type,
  ...props
}: ArrowRightButtonProps) => {
  const controls = useAnimationControls();

  const handleMouseEnter = useCallback(() => {
    controls.start("animate");
  }, [controls]);

  const handleMouseLeave = useCallback(() => {
    controls.start("normal");
  }, [controls]);

  const pathVariants = {
    normal: { d: "M5 12h14" },
    animate: {
      d: ["M5 12h14", "M5 12h9", "M5 12h14"],
      transition: {
        duration: 0.4,
      },
    },
  };

  const secondaryPathVariants = {
    normal: { d: "m12 5 7 7-7 7", translateX: 0 },
    animate: {
      d: "m12 5 7 7-7 7",
      translateX: [0, -3, 0],
      transition: {
        duration: 0.4,
      },
    },
  };

  return (
    <Button
      type={type}
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
          d="M5 12h14"
          variants={pathVariants}
          animate={controls}
          initial="normal"
        />
        <motion.path
          d="m12 5 7 7-7 7"
          variants={secondaryPathVariants}
          animate={controls}
          initial="normal"
        />
      </svg>
      {props.children}
    </Button>
  );
};

export { ArrowRightButton };
