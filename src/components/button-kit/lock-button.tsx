"use client";

import { motion, useAnimationControls } from "motion/react";
import { useCallback, useState } from "react";

import { cn } from "@/lib/utils";

import { Button, ButtonSize, ButtonVariant } from "../kit/button";

import type { HTMLAttributes } from "react";

interface LockButtonProps extends HTMLAttributes<HTMLButtonElement> {
  size?: ButtonSize;
  variant?: ButtonVariant;
  iconSize?: number;
  disabled?: boolean;
}

const closedPath = "M7 11V7a5 5 0 0 1 10 0v4";
const openPath = "M7 11V7a5 5 0 0 1 9.9-1";

const LockButton = ({
  onMouseEnter,
  onMouseLeave,
  className,
  size,
  variant,
  iconSize = 24,
  disabled,
  ...props
}: LockButtonProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const bounceControls = useAnimationControls();

  const handleMouseEnter = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      setIsOpen(true);
      bounceControls.start({
        y: [0, -2, 0],
        transition: { duration: 0.25, ease: "easeOut" },
      });
      onMouseEnter?.(e);
    },
    [onMouseEnter, bounceControls],
  );

  const handleMouseLeave = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      setIsOpen(false);
      onMouseLeave?.(e);
    },
    [onMouseLeave],
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
        animate={bounceControls}
      >
        <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
        <motion.path
          initial={false}
          animate={{ d: isOpen ? openPath : closedPath }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        />
      </motion.svg>
      {props.children}
    </Button>
  );
};

export { LockButton };
