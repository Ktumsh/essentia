"use client";

import { motion, useAnimationControls } from "motion/react";
import { useCallback } from "react";

import { cn } from "@/utils";

import { Button, ButtonSize, ButtonVariant } from "../kit/button";

import type { HTMLAttributes } from "react";

interface FolderInputButtonProps extends HTMLAttributes<HTMLButtonElement> {
  size?: ButtonSize;
  variant?: ButtonVariant;
  iconSize?: number;
}

const FolderInputButton = ({
  onMouseEnter,
  onMouseLeave,
  className,
  size,
  variant,
  iconSize = 28,
  ...props
}: FolderInputButtonProps) => {
  const folderControls = useAnimationControls();
  const arrowControls = useAnimationControls();

  const handleMouseEnter = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      folderControls.start({
        x: [0, 2, 0],
        transition: { duration: 0.4, ease: "easeInOut" },
      });
      arrowControls.start({
        scale: [1, 1.15, 1],
        transition: { duration: 0.4, ease: "easeOut" },
      });
      onMouseEnter?.(e);
    },
    [folderControls, arrowControls, onMouseEnter],
  );

  const handleMouseLeave = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      folderControls.stop();
      arrowControls.stop();
      onMouseLeave?.(e);
    },
    [folderControls, arrowControls, onMouseLeave],
  );

  return (
    <Button
      size={size}
      variant={variant}
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
        animate={folderControls}
      >
        <path d="M2 9V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H20a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-1" />
        <path d="M2 13h10" />
        <motion.path
          d="m9 16 3-3-3-3"
          animate={arrowControls}
          initial={{ scale: 1 }}
        />
      </motion.svg>
      {props.children}
    </Button>
  );
};

export { FolderInputButton };
