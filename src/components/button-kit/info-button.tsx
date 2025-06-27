"use client";

import { motion, useAnimationControls } from "motion/react";
import { useCallback } from "react";

import { cn } from "@/utils";

import { Button, ButtonSize, ButtonVariant } from "../ui/button";

import type { HTMLAttributes } from "react";

interface InfoButtonProps extends HTMLAttributes<HTMLButtonElement> {
  size?: ButtonSize;
  variant?: ButtonVariant;
  iconSize?: number;
  disabled?: boolean;
}

const InfoButton = ({
  onMouseEnter,
  onMouseLeave,
  className,
  size,
  variant,
  iconSize = 24,
  disabled,
  ...props
}: InfoButtonProps) => {
  const barControls = useAnimationControls();
  const dotControls = useAnimationControls();
  const circleControls = useAnimationControls();

  const handleMouseEnter = useCallback(() => {
    circleControls.start({
      scale: 1.05,
      transition: { duration: 0.2 },
    });

    barControls.start({
      y: [6, 0],
      opacity: [0, 1],
      transition: { duration: 0.25, delay: 0.1 },
    });

    dotControls.start({
      scale: [0, 1],
      opacity: [0, 1],
      transition: { duration: 0.2, delay: 0.3 },
    });
  }, [barControls, dotControls, circleControls]);

  const handleMouseLeave = useCallback(() => {
    circleControls.start({ scale: 1, transition: { duration: 0.2 } });
    barControls.set({ y: 0, opacity: 1 });
    dotControls.set({ scale: 1, opacity: 1 });
  }, [barControls, dotControls, circleControls]);

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
      >
        <motion.circle
          cx="12"
          cy="12"
          r="10"
          animate={circleControls}
          initial={{ scale: 1 }}
          style={{ transformOrigin: "center" }}
        />

        <motion.path
          d="M12 16v-4"
          animate={barControls}
          initial={{ y: 0, opacity: 1 }}
        />

        <motion.path
          d="M12 8h.01"
          animate={dotControls}
          initial={{ scale: 1, opacity: 1 }}
          style={{ transformBox: "fill-box", transformOrigin: "center" }}
        />
      </motion.svg>
      {props.children}
    </Button>
  );
};

export { InfoButton };
