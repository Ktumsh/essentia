"use client";

import { CircleAlert } from "lucide-react";
import { motion } from "motion/react";
import Link from "next/link";
import { Session } from "next-auth";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { StarsIcon } from "@/modules/icons/common";
import PaymentModal from "@/modules/payment/components/payment-modal";
import WarningModal from "@/modules/payment/components/warning-premium-modal";
import { useWarningModal } from "@/modules/payment/hooks/use-warning-modal";

interface AlertPanelProps {
  session: Session | null;
  isPremium: boolean | null;
  isChat: boolean;
}

const AlertPanel = ({ session, isPremium, isChat }: AlertPanelProps) => {
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
          className="text-main shadow-pretty dark:border-dark dark:bg-full-dark dark:text-main-dark absolute inset-x-3 top-6 flex justify-center gap-2 rounded-xl border border-gray-200 bg-white px-3 py-2 text-xs md:inset-3 md:items-center md:gap-4 md:p-4 md:text-base"
        >
          <span className="inline-flex items-center gap-2">
            <CircleAlert className="text-main-m dark:text-main-dark-m size-5" />
            {session ? (
              <>Actualiza tu plan para poder usar Essentia AI</>
            ) : (
              <>Inicia sesión para acceder a Essentia AI</>
            )}
          </span>
          {session ? (
            <Button
              radius="sm"
              onClick={() => handleOpenPaymentModal(setIsPaymentModalOpen)}
              className="bg-light-gradient-v2 dark:bg-dark-gradient-v2 dark:before:bg-full-dark relative z-0 inline-flex h-10 min-w-20 shrink-0 items-center justify-center gap-2 rounded-lg px-4 shadow-none transition! before:absolute before:inset-[2px] before:z-[-1] before:rounded-md before:bg-white before:content-[''] hover:scale-105 hover:shadow-lg hover:saturate-200"
            >
              <StarsIcon
                aria-hidden="true"
                className="stars-icon size-5! **:transition focus:outline-hidden"
              />
              <span className="bg-light-gradient-v2 dark:bg-dark-gradient-v2 bg-clip-text font-sans font-extrabold text-transparent">
                Hazte premium
              </span>
            </Button>
          ) : (
            <Link
              href="/login?redirect=/essentia-ai"
              className="bg-light-gradient-v2 dark:bg-dark-gradient inline-flex h-8 min-w-10 shrink-0 items-center justify-center rounded-md px-5 text-sm text-white duration-150! data-[hover=true]:text-white"
            >
              Inicia sesión
            </Link>
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
