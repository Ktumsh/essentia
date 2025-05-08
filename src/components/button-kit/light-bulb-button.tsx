"use client";

import { motion, useAnimation } from "motion/react";
import { useCallback } from "react";

import { cn } from "@/lib/utils";

import { Button, ButtonSize, ButtonVariant } from "../kit/button";

import type { HTMLAttributes } from "react";

interface LightbulbButtonProps extends HTMLAttributes<HTMLButtonElement> {
  size?: ButtonSize;
  variant?: ButtonVariant;
  iconSize?: number;
  disabled?: boolean;
}

const rayPositions = [
  { x1: 11, y1: 0, x2: 12, y2: 0 }, // top
  { x1: 17, y1: 2, x2: 18.5, y2: 0.5 }, // top-right
  { x1: 21, y1: 8, x2: 23, y2: 8 }, // right
  { x1: 17, y1: 14, x2: 18.5, y2: 15.5 }, // bottom-right
  { x1: 7, y1: 14, x2: 5.5, y2: 15.5 }, // bottom-left
  { x1: 3, y1: 8, x2: 1, y2: 8 }, // left
  { x1: 7, y1: 2, x2: 5.5, y2: 0.5 }, // top-left
];

const LightbulbButton = ({
  onMouseEnter,
  onMouseLeave,
  className,
  size,
  variant,
  iconSize = 28,
  disabled,
  ...props
}: LightbulbButtonProps) => {
  const bulbControls = useAnimation();
  const raysControls = useAnimation();

  const handleMouseEnter = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      bulbControls.start("animate");
      raysControls.start("show");
      onMouseEnter?.(e);
    },
    [bulbControls, raysControls, onMouseEnter],
  );

  const handleMouseLeave = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      bulbControls.start("normal");
      raysControls.start("hide");
      onMouseLeave?.(e);
    },
    [bulbControls, raysControls, onMouseLeave],
  );

  return (
    <Button
      size={size}
      variant={variant}
      disabled={disabled}
      className={cn("relative", className)}
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
        {/* Grupo animado del foco y base */}
        <motion.g
          initial="normal"
          animate={bulbControls}
          variants={{
            normal: { scale: 1 },
            animate: {
              scale: 0.9,
              transition: { type: "spring", stiffness: 220, damping: 20 },
            },
          }}
        >
          <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5" />
          <path d="M9 18h6" />
          <path d="M10 22h4" />
        </motion.g>

        {/* Rayos separados animados */}
        {rayPositions.map((ray, i) => (
          <motion.line
            key={i}
            x1={ray.x1}
            y1={ray.y1}
            x2={ray.x2}
            y2={ray.y2}
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            initial="hide"
            animate={raysControls}
            variants={{
              show: {
                opacity: [0, 1],
                scale: [0.6, 1],
                transition: {
                  delay: 0.04 * i,
                  duration: 0.3,
                  ease: "easeOut",
                },
              },
              hide: {
                opacity: 0,
                scale: 0.6,
                transition: { duration: 0.2 },
              },
            }}
          />
        ))}
      </svg>
      {props.children}
    </Button>
  );
};

export { LightbulbButton };
