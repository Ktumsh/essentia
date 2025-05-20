"use client";

import { motion, useAnimationControls } from "motion/react";
import { useCallback } from "react";

import { cn } from "@/lib/utils";

import { Button, ButtonSize, ButtonVariant } from "../kit/button";

import type { HTMLAttributes } from "react";

interface FolderButtonProps extends HTMLAttributes<HTMLButtonElement> {
  size?: ButtonSize;
  variant?: ButtonVariant;
  iconSize?: number;
}

const FolderButton = ({
  size,
  variant,
  iconSize = 28,
  className,
  onMouseEnter,
  onMouseLeave,
  ...props
}: FolderButtonProps) => {
  const scaleControls = useAnimationControls();
  const flapControls = useAnimationControls();

  const handleEnter = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      scaleControls.start("animate");
      flapControls.start("open");
      onMouseEnter?.(e);
    },
    [scaleControls, flapControls, onMouseEnter],
  );

  const handleLeave = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      scaleControls.start("normal");
      flapControls.start("closed");
      onMouseLeave?.(e);
    },
    [scaleControls, flapControls, onMouseLeave],
  );

  return (
    <Button
      size={size}
      variant={variant}
      className={cn(className)}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
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
        animate={scaleControls}
        variants={{
          normal: { scale: 1 },
          animate: {
            scale: 1.05,
            transition: { type: "spring", stiffness: 220, damping: 20 },
          },
        }}
      >
        {/* Tapa simulada */}
        <motion.path
          d="M9.6 3.9A2 2 0 0 1 11.1 5H20a2 2 0 0 1 2 2"
          initial="closed"
          animate={flapControls}
          variants={{
            closed: { rotateX: 0, transformOrigin: "left center" },
            open: {
              rotateX: -30,
              transformOrigin: "left center",
              transition: { duration: 0.3, ease: "easeOut" },
            },
          }}
        />
        {/* Cuerpo completo de la carpeta */}
        <path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z" />
      </motion.svg>
      {props.children}
    </Button>
  );
};

export { FolderButton };
