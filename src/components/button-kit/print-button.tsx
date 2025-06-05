"use client";

import { motion, useAnimationControls } from "motion/react";
import { useCallback } from "react";

import { cn } from "@/utils";

import { Button, ButtonSize, ButtonVariant } from "../ui/button";

import type { HTMLAttributes } from "react";

interface PrinterButtonProps extends HTMLAttributes<HTMLButtonElement> {
  size?: ButtonSize;
  variant?: ButtonVariant;
  iconSize?: number;
}

const PrinterButton = ({
  onMouseEnter,
  onMouseLeave,
  className,
  size,
  variant,
  iconSize = 28,
  ...props
}: PrinterButtonProps) => {
  const paper = useAnimationControls();

  const handleMouseEnter = useCallback(() => {
    paper.start({
      y: [0, 4, 0],
      transition: {
        duration: 0.5,
        ease: "easeInOut",
      },
    });
  }, [paper]);

  const handleMouseLeave = useCallback(() => {
    paper.stop();
    paper.set({ y: 0 });
  }, [paper]);

  return (
    <Button
      size={size}
      variant={variant}
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
        <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
        <path d="M6 9V3a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v6" />
        <motion.rect
          x="6"
          y="14"
          width="12"
          height="8"
          rx="1"
          animate={paper}
          initial={{ y: 0 }}
        />
      </svg>
      {props.children}
    </Button>
  );
};

export { PrinterButton };
