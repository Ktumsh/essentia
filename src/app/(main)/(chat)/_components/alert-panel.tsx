"use client";

import { LogIn } from "lucide-react";
import { motion } from "motion/react";
import { useRouter } from "next/navigation";
import { Session } from "next-auth";
import { useState } from "react";

import { BadgeAlert } from "@/components/kit/badge-alert";
import { Button } from "@/components/kit/button";
import { StarsIcon } from "@/components/ui/icons/common";
import PaymentModal from "@/components/ui/payment/payment-modal";
import WarningModal from "@/components/ui/payment/warning-premium-modal";
import { useWarningModal } from "@/hooks/use-warning-modal";

interface AlertPanelProps {
  session: Session | null;
  isPremium: boolean | null;
  isChat: boolean;
}

const AlertPanel = ({ session, isPremium, isChat }: AlertPanelProps) => {
  const router = useRouter();

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
          className="text-main shadow-pretty dark:text-main-dark border-border bg-background absolute inset-x-3 top-6 flex justify-center gap-2 rounded-xl border px-3 py-2 text-xs md:inset-3 md:items-center md:gap-4 md:p-4 md:text-base"
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
            <Button
              radius="full"
              onClick={() => handleOpenPaymentModal(setIsPaymentModalOpen)}
              className="from-gradient-from via-gradient-via to-gradient-to before:bg-background relative z-0 bg-gradient-to-r before:absolute before:inset-[2px] before:z-[-1] before:rounded-full before:content-[''] hover:scale-105 hover:shadow-lg hover:saturate-200 dark:from-[-100%]"
            >
              <StarsIcon
                aria-hidden="true"
                className="stars-icon **:transition focus:outline-hidden"
              />
              <span className="from-gradient-from via-gradient-via to-gradient-to bg-gradient-to-r bg-clip-text font-sans text-sm font-extrabold text-transparent dark:from-[-100%]">
                Hazte premium
              </span>
            </Button>
          ) : (
            <Button
              variant="gradient"
              size="sm"
              className="text-sm"
              onClick={() => router.push("/login?redirect=/essentia-ai")}
            >
              <LogIn
                aria-hidden="true"
                className="size-4 **:fill-white focus:outline-hidden"
              />
              Inicia sesión
            </Button>
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
          isOpen={isPaymentModalOpen}
          setIsOpen={setIsPaymentModalOpen}
        />
      )}
    </>
  );
};

export default AlertPanel;
