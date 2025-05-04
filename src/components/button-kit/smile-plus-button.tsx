"use client";

import { motion, useAnimation } from "motion/react";
import { useCallback } from "react";

import { cn } from "@/lib/utils";

import { Button, ButtonSize, ButtonVariant } from "../kit/button";

import type { HTMLAttributes } from "react";

interface SmilePlusButtonProps extends HTMLAttributes<HTMLButtonElement> {
  size?: ButtonSize;
  variant?: ButtonVariant;
  iconSize?: number;
  disabled?: boolean;
}

const SmilePlusButton = ({
  onMouseEnter,
  onMouseLeave,
  className,
  size,
  variant,
  iconSize = 28,
  disabled,
  ...props
}: SmilePlusButtonProps) => {
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
        variants={{
          normal: { scale: 1 },
          animate: {
            scale: 1.1,
            transition: { type: "spring", stiffness: 200, damping: 20 },
          },
        }}
      >
        <path d="M22 11v1a10 10 0 1 1-9-10" />
        <path d="M8 14s1.5 2 4 2 4-2 4-2" />
        <line x1="9" x2="9.01" y1="9" y2="9" />
        <line x1="15" x2="15.01" y1="9" y2="9" />
        <motion.path
          d="M16 5h6"
          variants={{
            normal: { rotate: 0, scale: 1 },
            animate: {
              rotate: 90,
              scale: 1.2,
              transition: {
                type: "spring",
                stiffness: 200,
                damping: 20,
                delay: 0.1,
              },
            },
          }}
          animate={controls}
        />
        <motion.path
          d="M19 2v6"
          variants={{
            normal: { rotate: 0, scale: 1 },
            animate: {
              rotate: 90,
              scale: 1.2,
              transition: {
                type: "spring",
                stiffness: 200,
                damping: 20,
                delay: 0.1,
              },
            },
          }}
          animate={controls}
        />
      </motion.svg>
      {props.children}
    </Button>
  );
};

export { SmilePlusButton };
