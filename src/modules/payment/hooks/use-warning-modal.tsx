"use client";

import { useEffect, useState } from "react";

export const useWarningModal = (isPremium: boolean | null) => {
  const [isWarningModalOpen, setIsWarningModalOpen] = useState(false);
  const [hasUserInteracted, setHasUserInteracted] = useState(false);

  useEffect(() => {
    if (!hasUserInteracted && !isPremium) {
      const timer = setTimeout(() => {
        setIsWarningModalOpen(true);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [hasUserInteracted, isPremium]);

  const handleOpenPaymentModal = (openPaymentModal: () => void) => {
    setIsWarningModalOpen(false);
    openPaymentModal();
    setHasUserInteracted(true);
  };

  return {
    isWarningModalOpen,
    handleOpenPaymentModal,
  };
};