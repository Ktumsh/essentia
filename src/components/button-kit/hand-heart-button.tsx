"use client";

import { motion, useAnimationControls } from "motion/react";
import { useCallback } from "react";

import { cn } from "@/utils";

import { Button, ButtonSize, ButtonVariant } from "../ui/button";

import type { HTMLAttributes } from "react";

interface HandHeartButtonProps extends HTMLAttributes<HTMLButtonElement> {
  size?: ButtonSize;
  variant?: ButtonVariant;
  iconSize?: number;
  disabled?: boolean;
}

const HandHeartButton = ({
  onMouseEnter,
  onMouseLeave,
  className,
  size,
  variant,
  iconSize = 24,
  disabled,
  ...props
}: HandHeartButtonProps) => {
  const heartControls = useAnimationControls();

  const handleMouseEnter = useCallback(() => {
    heartControls.start("animate");
  }, [heartControls]);

  const handleMouseLeave = useCallback(() => {
    heartControls.start("normal");
  }, [heartControls]);

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
        style={{ overflow: "visible" }}
      >
        <path d="M11 14h2a2 2 0 1 0 0-4h-3c-.6 0-1.1.2-1.4.6L3 16" />
        <path d="m7 20 1.6-1.4c.3-.4.8-.6 1.4-.6h4c1.1 0 2.1-.4 2.8-1.2l4.6-4.4a2 2 0 0 0-2.75-2.91l-4.2 3.9" />
        <path d="m2 15 6 6" />
        <motion.path
          d="M19.5 8.5c.7-.7 1.5-1.6 1.5-2.7A2.73 2.73 0 0 0 16 4a2.78 2.78 0 0 0-5 1.8c0 1.2.8 2 1.5 2.8L16 12Z"
          initial="normal"
          animate={heartControls}
          variants={{
            normal: {
              translateY: 0,
              scale: 1,
              transition: {
                delay: 0.1,
                scale: { duration: 0.2 },
                type: "spring",
                stiffness: 200,
                damping: 25,
              },
            },
            animate: {
              translateY: [0, -2],
              scale: [1, 1.1],
              transition: {
                delay: 0.1,
                scale: { duration: 0.2 },
                type: "spring",
                stiffness: 200,
                damping: 25,
              },
            },
          }}
        />
      </svg>
      {props.children}
    </Button>
  );
};

export { HandHeartButton };
