"use client";

import { motion, useAnimationControls } from "motion/react";
import { useEffect, useRef } from "react";

import type { SVGAttributes } from "react";

interface ClockLoopIconProps extends SVGAttributes<SVGSVGElement> {
  size?: number;
}

const ClockLoopIcon = ({
  className,
  size = 28,
  ...props
}: ClockLoopIconProps) => {
  const hourHand = useAnimationControls();
  const minuteHand = useAnimationControls();

  const hourRotation = useRef(90); // Comienza en 3
  const minuteRotation = useRef(0); // Comienza en 12

  useEffect(() => {
    let isCancelled = false;

    const loop = async () => {
      while (!isCancelled) {
        minuteRotation.current += 360;
        hourRotation.current += 30;

        await Promise.all([
          minuteHand.start({
            rotate: minuteRotation.current,
            originX: "50%",
            originY: "50%",
            transition: {
              duration: 0.6,
              ease: [0.4, 0, 0.2, 1],
            },
          }),
          hourHand.start({
            rotate: hourRotation.current,
            originX: "50%",
            originY: "50%",
            transition: {
              duration: 0.6,
              ease: [0.4, 0, 0.2, 1],
            },
          }),
        ]);

        await new Promise((resolve) => setTimeout(resolve, 400));
      }
    };

    loop();

    return () => {
      isCancelled = true;
    };
  }, [hourHand, minuteHand]);

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      <circle cx="12" cy="12" r="10" />
      <motion.line
        x1="12"
        y1="12"
        x2="16"
        y2="12"
        animate={hourHand}
        initial={{ rotate: 90, originX: "50%", originY: "50%" }}
      />
      <motion.line
        x1="12"
        y1="12"
        x2="12"
        y2="6"
        animate={minuteHand}
        initial={{ rotate: 0, originX: "50%", originY: "50%" }}
      />
    </svg>
  );
};

export { ClockLoopIcon };
