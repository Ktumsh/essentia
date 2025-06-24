"use client";

import { Sparkles } from "lucide-react";
import { motion } from "motion/react";
import { useRouter } from "next/navigation";
import { memo } from "react";

import { siteConfig } from "@/config/site.config";
import { cn } from "@/utils";

import ActionButton from "./action-button";
import PaymentCard from "./payment-card";
import PaymentHeader from "./payment-header";

import type { Payment } from "@/db/schema";
import type { PlanType } from "@/lib/types";

interface SuccessStateProps {
  title: string;
  message?: string;
  paymentDetails: Payment;
  planType?: PlanType;
  renewalDate?: Date | null;
}

const SuccessState = ({
  title,
  message,
  paymentDetails,
  planType,
  renewalDate,
}: SuccessStateProps) => {
  const router = useRouter();

  const containerVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  };

  const isPremiumPlus = planType === siteConfig.plan.premiumPlus;

  return (
    <div className="flex min-h-screen items-center justify-center">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ ease: "easeInOut", duration: 0.5 }}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      >
        <div
          className={cn(
            "before:absolute before:top-1/6 before:left-2/3 before:block before:size-96 before:-translate-x-1/2 before:scale-150 before:rounded-full before:bg-linear-to-tr/shorter before:from-transparent before:blur-2xl after:absolute after:top-1/3 after:left-1/4 after:z-10 after:block after:size-96 after:rounded-full after:bg-linear-to-tr/shorter after:to-transparent after:blur-2xl dark:after:to-transparent",
            isPremiumPlus
              ? "before:to-blue-300 after:from-emerald-300 dark:before:to-blue-900 dark:after:from-emerald-950"
              : "before:to-indigo-300 after:from-fuchsia-300 dark:before:to-indigo-900 dark:after:from-fuchsia-950",
          )}
        />
      </motion.div>
      <motion.div
        variants={containerVariants}
        initial="initial"
        animate="animate"
        className="relative w-full max-w-2xl space-y-8"
      >
        <PaymentHeader title={title} message={message} planType={planType} />

        <PaymentCard
          paymentDetails={paymentDetails}
          planType={planType}
          renewalDate={renewalDate}
        />

        <ActionButton
          onClick={() => router.push("/")}
          icon={Sparkles}
          variant={isPremiumPlus ? "gradient-plus" : "gradient"}
        >
          Comenzar mi experiencia
        </ActionButton>
      </motion.div>
    </div>
  );
};

export default memo(SuccessState);
