"use client";

import { motion, useAnimationControls } from "motion/react";
import { useCallback } from "react";

import { cn } from "@/lib/utils";

import { Button, ButtonSize, ButtonVariant } from "../kit/button";

import type { HTMLAttributes } from "react";

interface LoginButtonProps extends HTMLAttributes<HTMLButtonElement> {
  size?: ButtonSize;
  variant?: ButtonVariant;
  iconSize?: number;
  disabled?: boolean;
}

const LoginButton = ({
  onMouseEnter,
  onMouseLeave,
  className,
  size,
  variant,
  iconSize = 24,
  disabled,
  ...props
}: LoginButtonProps) => {
  const arrowControls = useAnimationControls();
  const lineControls = useAnimationControls();

  const handleMouseEnter = useCallback(() => {
    arrowControls.start({
      translateX: [0, -3, 0],
      transition: { duration: 0.4 },
    });
    lineControls.start({
      translateX: [0, -3, 0],
      transition: { duration: 0.4 },
    });
  }, [arrowControls, lineControls]);

  const handleMouseLeave = useCallback(() => {
    arrowControls.stop();
    lineControls.stop();
    arrowControls.set({ translateX: 0 });
    lineControls.set({ translateX: 0 });
  }, [arrowControls, lineControls]);

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
        <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />

        <motion.polyline
          points="10 17 15 12 10 7"
          animate={arrowControls}
          initial={false}
        />

        <motion.line
          x1="15"
          x2="3"
          y1="12"
          y2="12"
          animate={lineControls}
          initial={false}
        />
      </svg>
      {props.children}
    </Button>
  );
};

export { LoginButton };
