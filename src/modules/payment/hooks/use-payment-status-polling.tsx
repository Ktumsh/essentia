"use client";

import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

import { checkPaymentStatus } from "../pay/actions";

export const usePaymentStatusPolling = () => {
  const [isPolling, setIsPolling] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const startPollingOnChat = pathname.startsWith("/essentia-ai");

  const startPolling = async (
    onSuccess?: (isOpen: boolean) => void,
    maxAttempts = 10,
    interval = 1000,
  ) => {
    setIsPolling(true);
    let attempts = 0;

    while (attempts < maxAttempts) {
      attempts += 1;
      try {
        const result = await checkPaymentStatus();
        if (result.isPremium) {
          toast.success("¡Tu suscripción Premium ha comenzado!");
          router.refresh();
          if (startPollingOnChat) {
            router.push("/essentia-ai");
          }
          setIsPolling(false);
          if (onSuccess) {
            onSuccess(false);
          }
          return;
        }
      } catch (error) {
        console.error("Error checking payment status:", error);
      }
      await new Promise((resolve) => setTimeout(resolve, interval));
    }

    toast.error("No se pudo confirmar el pago. Inténtalo más tarde.");
    setIsPolling(false);
  };

  return { isPolling, startPolling };
};
