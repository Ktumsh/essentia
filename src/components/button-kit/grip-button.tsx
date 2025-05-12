"use client";

import { motion, useAnimation } from "motion/react";
import { useCallback, useEffect, useState } from "react";

import { cn } from "@/lib/utils";

import { Button, ButtonSize, ButtonVariant } from "../kit/button";

import type { HTMLAttributes } from "react";

interface GripButtonProps extends HTMLAttributes<HTMLButtonElement> {
  size?: ButtonSize;
  variant?: ButtonVariant;
  iconSize?: number;
}

const CIRCLES = [
  { cx: 19, cy: 5 }, // Top right
  { cx: 12, cy: 5 }, // Top middle
  { cx: 19, cy: 12 }, // Middle right
  { cx: 5, cy: 5 }, // Top left
  { cx: 12, cy: 12 }, // Center
  { cx: 19, cy: 19 }, // Bottom right
  { cx: 5, cy: 12 }, // Middle left
  { cx: 12, cy: 19 }, // Bottom middle
  { cx: 5, cy: 19 }, // Bottom left
];

const GripButton = ({
  size,
  variant,
  iconSize = 28,
  className,
  onMouseEnter,
  onMouseLeave,
  ...props
}: GripButtonProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const controls = useAnimation();

  const handleEnter = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      setIsHovered(true);
      onMouseEnter?.(e);
    },
    [onMouseEnter],
  );

  const handleLeave = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      setIsHovered(false);
      onMouseLeave?.(e);
    },
    [onMouseLeave],
  );

  useEffect(() => {
    const sequence = async () => {
      if (isHovered) {
        await controls.start((i) => ({
          opacity: 0.3,
          transition: { delay: i * 0.05, duration: 0.15 },
        }));
        await controls.start((i) => ({
          opacity: 1,
          transition: { delay: i * 0.05, duration: 0.15 },
        }));
      }
    };

    sequence();
  }, [isHovered, controls]);

  return (
    <Button
      size={size}
      variant={variant}
      className={cn(className)}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
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
        {CIRCLES.map((circle, i) => (
          <motion.circle
            key={`${circle.cx}-${circle.cy}`}
            cx={circle.cx}
            cy={circle.cy}
            r="1"
            initial={{ opacity: 1 }}
            animate={controls}
            custom={i}
          />
        ))}
      </svg>
      {props.children}
    </Button>
  );
};

export { GripButton };
