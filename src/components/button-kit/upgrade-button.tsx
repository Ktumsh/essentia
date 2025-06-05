"use client";

import { motion, useAnimationControls } from "motion/react";
import { useCallback } from "react";

import { cn } from "@/utils";

import { Button, ButtonSize, ButtonVariant } from "../ui/button";

import type { HTMLAttributes } from "react";

interface UpgradeButtonProps extends HTMLAttributes<HTMLButtonElement> {
  size?: ButtonSize;
  variant?: ButtonVariant;
  iconSize?: number;
  disabled?: boolean;
}

const UpgradeButton = ({
  onMouseEnter,
  onMouseLeave,
  className,
  size,
  variant,
  iconSize = 24,
  disabled,
  ...props
}: UpgradeButtonProps) => {
  const topArrow = useAnimationControls();
  const bottomArrow = useAnimationControls();

  const handleMouseEnter = useCallback(() => {
    bottomArrow
      .start({
        y: [0, -4],
        opacity: [1, 0],
        transition: { duration: 0.25, ease: "easeInOut" },
      })
      .then(() => {
        bottomArrow.set({ y: 4, opacity: 0 });
        bottomArrow.start({
          y: 0,
          opacity: 1,
          transition: { duration: 0.25, ease: "easeInOut" },
        });
      });

    topArrow
      .start({
        y: [0, -4],
        opacity: [1, 0],
        transition: { duration: 0.25, ease: "easeInOut", delay: 0.1 },
      })
      .then(() => {
        topArrow.set({ y: 4, opacity: 0 });
        topArrow.start({
          y: 0,
          opacity: 1,
          transition: { duration: 0.25, ease: "easeInOut" },
        });
      });
  }, [topArrow, bottomArrow]);

  const handleMouseLeave = useCallback(() => {
    topArrow.stop();
    bottomArrow.stop();
    topArrow.set({ y: 0, opacity: 1 });
    bottomArrow.set({ y: 0, opacity: 1 });
  }, [topArrow, bottomArrow]);

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
        <motion.path d="m17 11-5-5-5 5" animate={topArrow} initial={false} />
        <motion.path d="m17 18-5-5-5 5" animate={bottomArrow} initial={false} />
      </svg>
      {props.children}
    </Button>
  );
};

export { UpgradeButton };
