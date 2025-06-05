"use client";

import { motion, useAnimationControls } from "motion/react";
import { useCallback } from "react";

import { cn } from "@/utils";

import { Button, ButtonSize, ButtonVariant } from "../ui/button";

import type { HTMLAttributes } from "react";

interface CheckCheckButtonProps extends HTMLAttributes<HTMLButtonElement> {
  size?: ButtonSize;
  variant?: ButtonVariant;
  iconSize?: number;
  disabled?: boolean;
}

const CheckCheckButton = ({
  onMouseEnter,
  onMouseLeave,
  className,
  size,
  variant,
  iconSize = 24,
  disabled,
  ...props
}: CheckCheckButtonProps) => {
  const controls = useAnimationControls();

  const handleMouseEnter = useCallback(() => {
    controls.set("normal");
    controls.start("animate");
  }, [controls]);

  const handleMouseLeave = useCallback(() => {
    controls.stop();
    controls.set("normal");
  }, [controls]);

  const pathVariants = {
    normal: {
      opacity: 1,
      pathLength: 1,
      scale: 1,
      transition: {
        duration: 0.3,
        opacity: { duration: 0.1 },
      },
    },
    animate: (custom: number) => ({
      opacity: [0, 1],
      pathLength: [0, 1],
      scale: [0.5, 1],
      transition: {
        duration: 0.4,
        opacity: { duration: 0.1 },
        delay: 0.1 * custom,
      },
    }),
  };

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
          d="M2 12 7 17L18 6"
          initial="normal"
          animate={controls}
          variants={pathVariants}
          custom={0}
        />
        <motion.path
          d="M13 16L14.5 17.5L22 10"
          initial="normal"
          animate={controls}
          variants={pathVariants}
          custom={1}
        />
      </svg>
      {props.children}
    </Button>
  );
};

export { CheckCheckButton };
