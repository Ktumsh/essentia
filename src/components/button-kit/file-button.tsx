"use client";

import { motion, useAnimation } from "motion/react";
import { useCallback } from "react";

import { cn } from "@/lib/utils";

import { Button, ButtonSize, ButtonVariant } from "../kit/button";

import type { HTMLAttributes } from "react";

interface FileTextButtonProps extends HTMLAttributes<HTMLButtonElement> {
  size?: ButtonSize;
  variant?: ButtonVariant;
  iconSize?: number;
}

const FileTextButton = ({
  onMouseEnter,
  onMouseLeave,
  className,
  size,
  variant,
  iconSize = 28,
  ...props
}: FileTextButtonProps) => {
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
        initial="normal"
        animate={controls}
        variants={{
          normal: { scale: 1 },
          animate: {
            scale: 1.05,
            transition: { duration: 0.3, ease: "easeOut" },
          },
        }}
      >
        <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
        <path d="M14 2v4a2 2 0 0 0 2 2h4" />
        <motion.path
          d="M10 9H8"
          stroke="currentColor"
          strokeWidth="2"
          variants={{
            normal: { pathLength: 1, x1: 8, x2: 10 },
            animate: {
              pathLength: [1, 0, 1],
              x1: [8, 10, 8],
              x2: [10, 10, 10],
              transition: { duration: 0.7, delay: 0.3 },
            },
          }}
        />
        <motion.path
          d="M16 13H8"
          stroke="currentColor"
          strokeWidth="2"
          variants={{
            normal: { pathLength: 1, x1: 8, x2: 16 },
            animate: {
              pathLength: [1, 0, 1],
              x1: [8, 16, 8],
              x2: [16, 16, 16],
              transition: { duration: 0.7, delay: 0.5 },
            },
          }}
        />
        <motion.path
          d="M16 17H8"
          stroke="currentColor"
          strokeWidth="2"
          variants={{
            normal: { pathLength: 1, x1: 8, x2: 16 },
            animate: {
              pathLength: [1, 0, 1],
              x1: [8, 16, 8],
              x2: [16, 16, 16],
              transition: { duration: 0.7, delay: 0.7 },
            },
          }}
        />
      </motion.svg>
      {props.children}
    </Button>
  );
};

export { FileTextButton };
