"use client";

import { X } from "lucide-react";
import { motion } from "motion/react";
import { useRouter } from "next/navigation";
import { Session } from "next-auth";
import { useState } from "react";

import PaymentModal from "@/app/payment/_components/payment-modal";
import { LoginButton } from "@/components/button-kit/login-button";
import { SparklesButton } from "@/components/button-kit/sparkles-button";
import { BadgeAlert } from "@/components/ui/badge-alert";
import { Button } from "@/components/ui/button";

interface AlertPanelProps {
  session: Session | null;
  isPremium: boolean | null;
  openPayment: boolean;
  setOpenPayment: (isOpen: boolean) => void;
  isUpgradeToMoreMessages: boolean;
}

const AlertPanel = ({
  session,
  isPremium,
  openPayment,
  setOpenPayment,
  isUpgradeToMoreMessages,
}: AlertPanelProps) => {
  const router = useRouter();

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
          className="group text-foreground shadow-pretty bg-background/80 mx-auto flex h-20 max-w-lg items-center justify-center gap-4 rounded-xl border px-3 py-2 text-xs backdrop-blur-md md:p-4 md:text-base"
        >
          <div className="inline-flex items-center gap-2">
            <BadgeAlert
              size="sm"
              variant="info"
              className="mb-0 hidden md:inline-flex"
            />
            {session?.user ? (
              <p>Actualiza tu plan para acceder al chat con Aeris</p>
            ) : (
              <p>Inicia sesión para hablar con Aeris</p>
            )}
          </div>
          {session?.user ? (
            <SparklesButton
              variant="gradient"
              size="sm"
              onClick={() => setOpenPayment(true)}
              className="rounded-md"
            >
              Hazte premium
            </SparklesButton>
          ) : (
            <LoginButton
              size="sm"
              onClick={() => router.push("/login?next=/aeris")}
            >
              Inicia sesión
            </LoginButton>
          )}
          <Button
            size="icon"
            variant="ghost"
            className="absolute top-2 right-2 size-6 rounded-sm opacity-0 transition-opacity group-hover:opacity-100"
            onClick={handleClose}
          >
            <X className="size-3!" />
            <span className="sr-only">Cerrar banner de uso de mensajes</span>
          </Button>
        </motion.div>
      )}
      {/* Modal de Pago */}
      {session?.user && (
        <PaymentModal
          featureType={isUpgradeToMoreMessages ? "upgrade-plan" : "chat"}
          isOpen={openPayment}
          setIsOpen={setOpenPayment}
        />
      )}
    </>
  );
};

export default AlertPanel;
