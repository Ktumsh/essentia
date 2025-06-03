"use client";

import { motion, useAnimation } from "motion/react";
import { useCallback } from "react";

import { cn } from "@/utils";

import { Button, ButtonSize, ButtonVariant } from "../kit/button";

import type { Variants } from "motion/react";
import type { HTMLAttributes } from "react";

interface ShareButtonProps extends HTMLAttributes<HTMLButtonElement> {
  size?: ButtonSize;
  variant?: ButtonVariant;
  iconSize?: number;
  disabled?: boolean;
}

const variants: Variants = {
  normal: {
    pathLength: 1,
    opacity: 1,
    scale: 1,
  },
  animate: (custom: number) => ({
    pathLength: [0, 1],
    opacity: [0, 1],
    scale: [0.5, 1],
    transition: {
      delay: 0.1 * custom,
      pathLength: { delay: 0.05 * custom },
    },
  }),
};

const ShareButton = ({
  onMouseEnter,
  onMouseLeave,
  className,
  size,
  variant,
  iconSize = 28,
  disabled,
  ...props
}: ShareButtonProps) => {
  const controls = useAnimation();

  const handleMouseEnter = useCallback(() => {
    controls.start("animate");
  }, [controls]);

  const handleMouseLeave = useCallback(() => {
    controls.start("normal");
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
        {/* Círculo superior derecho */}
        <motion.circle
          cx="18"
          cy="5"
          r="3"
          variants={variants}
          animate={controls}
          custom={2}
        />

        {/* Círculo izquierdo */}
        <motion.circle
          cx="6"
          cy="12"
          r="3"
          variants={variants}
          animate={controls}
          custom={0}
        />

        {/* Círculo inferior derecho */}
        <motion.circle
          cx="18"
          cy="19"
          r="3"
          variants={variants}
          animate={controls}
          custom={4}
        />

        {/* Línea de arriba */}
        <motion.line
          x1="15.41"
          y1="6.51"
          x2="8.59"
          y2="10.49"
          variants={variants}
          animate={controls}
          custom={1}
        />

        {/* Línea de abajo */}
        <motion.line
          x1="8.59"
          y1="13.51"
          x2="15.42"
          y2="17.49"
          variants={variants}
          animate={controls}
          custom={3}
        />
      </svg>
      {props.children}
    </Button>
  );
};

export { ShareButton };
