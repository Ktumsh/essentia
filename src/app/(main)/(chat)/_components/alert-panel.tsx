"use client";

import { X } from "lucide-react";
import { motion } from "motion/react";
import { useRouter } from "next/navigation";
import { Session } from "next-auth";
import { useState } from "react";

import { LoginButton } from "@/components/button-kit/login-button";
import { SparklesButton } from "@/components/button-kit/sparkles-button";
import { BadgeAlert } from "@/components/kit/badge-alert";
import { Button } from "@/components/kit/button";
import PaymentModal from "@/components/ui/payment/payment-modal";
import { useIsMobile } from "@/hooks/use-mobile";

interface AlertPanelProps {
  session: Session | null;
  isPremium: boolean | null;
  isPaymentModalOpen: boolean;
  setIsPaymentModalOpen: (isOpen: boolean) => void;
  isUpgradeToMoreMessages: boolean;
}

const AlertPanel = ({
  session,
  isPremium,
  isPaymentModalOpen,
  setIsPaymentModalOpen,
  isUpgradeToMoreMessages,
}: AlertPanelProps) => {
  const router = useRouter();
  const isMobile = useIsMobile();

  const [close, setClose] = useState(false);

  const handleClose = () => {
    setClose(true);
  };

  return (
    <>
      {!isPremium && (
        <motion.div
          initial={{ opacity: 0, y: 0, scale: 0.9 }}
          animate={
            close
              ? { opacity: 0, y: 0, scale: 0.9 }
              : { opacity: 1, y: -100, scale: 1 }
          }
          transition={{ ease: "easeInOut", duration: 0.4 }}
          className="text-foreground shadow-pretty border-border bg-background/80 flex h-20 items-center justify-center gap-2 rounded-xl border px-3 py-2 text-xs backdrop-blur-md md:gap-4 md:p-4 md:text-base"
        >
          <div className="inline-flex items-center gap-2">
            <BadgeAlert size="sm" variant="info" className="mb-0" />
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
              onClick={() => setIsPaymentModalOpen(true)}
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
          <Button
            size="icon"
            variant="ghost"
            className="absolute top-2 right-2 size-6 rounded-sm"
            onClick={handleClose}
          >
            <X className="size-3!" />
            <span className="sr-only">Cerrar banner de uso de mensajes</span>
          </Button>
        </motion.div>
      )}
      {/* Modal de Pago */}
      {session && (
        <PaymentModal
          featureType={isUpgradeToMoreMessages ? "upgrade-plan" : "chat"}
          isOpen={isPaymentModalOpen}
          setIsOpen={setIsPaymentModalOpen}
        />
      )}
    </>
  );
};

export default AlertPanel;
