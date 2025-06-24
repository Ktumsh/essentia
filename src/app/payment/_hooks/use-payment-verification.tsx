"use client";

import { useEffect, useState } from "react";

import type { CallbackStatus } from "@/lib/types";

export function usePaymentVerification(
  sessionId: string | null,
  titleStatus: CallbackStatus,
) {
  const [isVerified, setIsVerified] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (titleStatus === "canceled") {
      setIsVerified(true);
      return;
    }

    if (!sessionId) {
      setIsVerified(false);
      return;
    }

    const verifySession = async () => {
      setIsLoading(true);
      try {
        const response = await fetch("/api/verify-payment", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ session_id: sessionId }),
        });

        const { success } = await response.json();
        setIsVerified(success);
      } catch (error) {
        console.error("Payment verification error:", error);
        setIsVerified(false);
      } finally {
        setIsLoading(false);
      }
    };

    verifySession();
  }, [sessionId, titleStatus]);

  return { isVerified, isLoading };
}
