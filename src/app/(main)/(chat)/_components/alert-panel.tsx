"use client";

import { motion } from "motion/react";
import { useRouter } from "next/navigation";
import { Session } from "next-auth";
import { useState } from "react";

import { LoginButton } from "@/components/button-kit/login-button";
import { SparklesButton } from "@/components/button-kit/sparkles-button";
import { BadgeAlert } from "@/components/kit/badge-alert";
import PaymentModal from "@/components/ui/payment/payment-modal";
import WarningModal from "@/components/ui/payment/warning-premium-modal";
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

  const [isVisible, setIsVisible] = useState(true);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);

  const { isWarningModalOpen, handleOpenPaymentModal } =
    useWarningModal(isPremium);

  return (
    <>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 150, scale: 0.9 }}
          animate={
            !isPremium
              ? { opacity: 1, y: -30, scale: 1 }
              : { opacity: 0, y: 150, scale: 0.9 }
          }
          onAnimationComplete={() => {
            if (isPremium) {
              setIsVisible(false);
            }
          }}
          transition={
            !isPremium
              ? { ease: "easeInOut", duration: 1, delay: 0.3 }
              : { ease: "easeInOut", duration: 0.5, delay: 0.3 }
          }
          className="text-foreground shadow-pretty border-border bg-background absolute inset-x-3 top-6 flex justify-center gap-2 rounded-xl border px-3 py-2 text-xs md:inset-3 md:items-center md:gap-4 md:p-4 md:text-base"
        >
          <span className="inline-flex items-center gap-2">
            <BadgeAlert variant="info" className="mb-0" />
            {session ? (
              <>Actualiza tu plan para poder usar Essentia AI</>
            ) : (
              <>Inicia sesión para acceder a Essentia AI</>
            )}
          </span>
          {session ? (
            <SparklesButton
              variant="gradient"
              size={isMobile ? "sm" : "default"}
              onClick={() => handleOpenPaymentModal(setIsPaymentModalOpen)}
              className="rounded-full"
            >
              Hazte premium
            </SparklesButton>
          ) : (
            <LoginButton
              size={isMobile ? "sm" : "default"}
              onClick={() => router.push("/login?next=/essentia-ai")}
              className="rounded-full"
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
