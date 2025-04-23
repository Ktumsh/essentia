"use client";

import { useEffect, useState } from "react";
import JSConfetti from "js-confetti";

interface ConfettiProps {
  duration?: number;
  onComplete?: () => void;
}

export function Confetti({ duration = 3000, onComplete }: ConfettiProps) {
  const [hasConfettiFired, setHasConfettiFired] = useState(false);

  useEffect(() => {
    if (hasConfettiFired) return;

    const jsConfetti = new JSConfetti();
    jsConfetti.addConfetti();

    setHasConfettiFired(true);

    const timer = setTimeout(() => {
      onComplete?.();
    }, duration);

    return () => {
      clearTimeout(timer);
    };
  }, [duration, onComplete, hasConfettiFired]);

  return null;
}
