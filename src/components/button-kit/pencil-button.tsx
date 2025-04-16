"use client";

import { motion, useAnimationControls } from "motion/react";
import { useCallback } from "react";

import { cn } from "@/lib/utils";

import { Button, ButtonSize, ButtonVariant } from "../kit/button";

import type { HTMLAttributes } from "react";

interface PencilButtonProps extends HTMLAttributes<HTMLButtonElement> {
  size?: ButtonSize;
  variant?: ButtonVariant;
  iconSize?: number;
  disabled?: boolean;
}

const PencilButton = ({
  onMouseEnter,
  onMouseLeave,
  className,
  size,
  variant,
  iconSize = 24,
  disabled,
  ...props
}: PencilButtonProps) => {
  const lineControls = useAnimationControls();
  const pencilControls = useAnimationControls();

  const handleMouseEnter = useCallback(() => {
    lineControls.set({ pathLength: 0 });
    lineControls.start({
      pathLength: 1,
      transition: {
        duration: 0.5,
        ease: "easeInOut",
      },
    });

    pencilControls.start({
      x: [0, 1, -1, 0],
      rotate: [0, -2, 1, 0],
      transition: {
        duration: 0.5,
        ease: "easeInOut",
      },
    });
  }, [lineControls, pencilControls]);

  const handleMouseLeave = useCallback(() => {
    lineControls.stop();
    lineControls.set({ pathLength: 1 });
    pencilControls.stop();
    pencilControls.set({ x: 0, rotate: 0 });
  }, [lineControls, pencilControls]);

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
        aria-hidden="true"
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
        <g fill="none" stroke="currentColor" strokeWidth="2">
          <motion.path
            strokeLinecap="round"
            d="M4 22h16"
            initial={{ pathLength: 1 }}
            animate={lineControls}
          />
          <motion.path
            d="m13.888 3.663l.742-.742a3.146 3.146 0 1 1 4.449 4.45l-.742.74m-4.449-4.448s.093 1.576 1.483 2.966s2.966 1.483 2.966 1.483m-4.449-4.45L7.071 10.48c-.462.462-.693.692-.891.947a5.2 5.2 0 0 0-.599.969c-.139.291-.242.601-.449 1.22l-.875 2.626m14.08-8.13l-6.817 6.817c-.462.462-.692.692-.947.891q-.451.352-.969.599c-.291.139-.601.242-1.22.448l-2.626.876m0 0l-.641.213a.848.848 0 0 1-1.073-1.073l.213-.641m1.501 1.5l-1.5-1.5"
            animate={pencilControls}
            initial={{ x: 0, rotate: 0 }}
          />
        </g>
      </svg>
      {props.children}
    </Button>
  );
};

export { PencilButton };
