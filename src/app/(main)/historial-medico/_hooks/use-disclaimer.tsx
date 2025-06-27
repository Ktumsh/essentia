"use client";

import { useState, useEffect } from "react";

const DISCLAIMER_STORAGE_KEY = "ai-recommendations-disclaimer-dismissed";

export function useDisclaimer(isOpen: boolean) {
  const [showDisclaimer, setShowDisclaimer] = useState(true);

  useEffect(() => {
    if (isOpen) {
      const dismissed = localStorage.getItem(DISCLAIMER_STORAGE_KEY);
      if (dismissed === "true") {
        setShowDisclaimer(false);
      } else {
        setShowDisclaimer(true);
      }
    }
  }, [isOpen]);

  const dismissDisclaimer = (dontShowAgain = false) => {
    setShowDisclaimer(false);
    if (dontShowAgain) {
      localStorage.setItem(DISCLAIMER_STORAGE_KEY, "true");
    }
  };

  const resetDisclaimer = () => {
    localStorage.removeItem(DISCLAIMER_STORAGE_KEY);
    setShowDisclaimer(true);
  };

  return {
    showDisclaimer,
    dismissDisclaimer,
    resetDisclaimer,
  };
}
