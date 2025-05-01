"use client";

import { motion } from "motion/react";
import { useRouter } from "next/navigation";
import { Session } from "next-auth";
import { useState } from "react";

import WarningModal from "@/app/(main)/(chat)/_components/warning-premium-modal";
import { LoginButton } from "@/components/button-kit/login-button";
import { SparklesButton } from "@/components/button-kit/sparkles-button";
import { BadgeAlert } from "@/components/kit/badge-alert";
import PaymentModal from "@/components/ui/payment/payment-modal";
import { useIsMobile } from "@/hooks/use-mobile";
import { useWarningModal } from "@/hooks/use-warning-modal";

interface AlertPanelProps {
  session: Session | null;
  isPremium: boolean | null;
  isChat: boolean;
}

const AlertPanel = ({ session, isPremium, isChat }: AlertPanelProps) => {
  const router = useRouter();
  const isMobile = useIsMobile();

  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);

  const { isWarningModalOpen, handleOpenPaymentModal } =
    useWarningModal(isPremium);

  return (
    <>
      {!isPremium && (
        <motion.div
          initial={{ opacity: 0, y: 0, scale: 0.9 }}
          animate={{ opacity: 1, y: -100, scale: 1 }}
          transition={{ ease: "easeInOut", duration: 1, delay: 0.3 }}
          className="text-foreground shadow-pretty border-border bg-background flex h-20 items-center justify-center gap-2 rounded-xl border px-3 py-2 text-xs md:gap-4 md:p-4 md:text-base"
        >
          <div className="inline-flex items-center gap-2">
            <BadgeAlert
              size={isMobile ? "sm" : "default"}
              variant="info"
              className="mb-0"
            />
            {session ? (
              <p>Actualiza tu plan para poder usar Essentia AI</p>
            ) : (
              <p>Inicia sesión para acceder a Essentia AI</p>
            )}
          </div>
          {session ? (
            <SparklesButton
              variant="gradient"
              size={isMobile ? "sm" : "default"}
              onClick={() => handleOpenPaymentModal(setIsPaymentModalOpen)}
              className="rounded-md"
            >
              Hazte premium
            </SparklesButton>
          ) : (
            <LoginButton
              size={isMobile ? "sm" : "default"}
              onClick={() => router.push("/login?next=/essentia-ai")}
            >
              Inicia sesión
            </LoginButton>
          )}
        </motion.div>
      )}
      {/* Modal de advertencia para Premium */}
      {!isPremium && session && isWarningModalOpen && !isChat && (
        <WarningModal
          isPremium={isPremium}
          isPaymentModalOpen={isPaymentModalOpen}
        />
      )}
      {/* Modal de Pago */}
      {!isPremium && session && (
        <PaymentModal
          featureType="chat"
          isOpen={isPaymentModalOpen}
          setIsOpen={setIsPaymentModalOpen}
        />
      )}
    </>
  );
};

export default AlertPanel;
