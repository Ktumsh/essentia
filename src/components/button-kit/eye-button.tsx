"use client";

import { motion, useAnimation } from "motion/react";
import { useCallback } from "react";

import { cn } from "@/utils";

import { Button, ButtonSize, ButtonVariant } from "../kit/button";

import type { HTMLAttributes } from "react";

interface EyeButtonProps extends HTMLAttributes<HTMLButtonElement> {
  size?: ButtonSize;
  variant?: ButtonVariant;
  iconSize?: number;
}

const EyeButton = ({
  className,
  size,
  variant,
  iconSize = 24,
  ...props
}: EyeButtonProps) => {
  const controls = useAnimation();

  const handleMouseEnter = useCallback(() => {
    controls.start("blink");
  }, [controls]);

  const handleMouseLeave = useCallback(() => {
    controls.start("initial");
  }, [controls]);

  return (
    <Button
      size={size}
      variant={variant}
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
        initial="initial"
        animate={controls}
        variants={{
          initial: { scaleY: 1 },
          blink: {
            scaleY: [1, 0.3, 1],
            transition: {
              duration: 0.5,
              ease: "easeInOut",
            },
          },
        }}
      >
        <motion.path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0" />
        <motion.circle cx="12" cy="12" r="3" />
      </motion.svg>
      {props.children}
    </Button>
  );
};

export { EyeButton };
