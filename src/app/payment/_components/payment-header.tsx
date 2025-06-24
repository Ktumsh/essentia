"use client";

import { motion } from "motion/react";
import { memo } from "react";

import { siteConfig } from "@/config/site.config";
import { cn } from "@/utils";

import StatusIcon from "./status-icon";
import { ANIMATION_DELAYS } from "../_lib/utils";

import type { PlanType } from "@/lib/types";

interface PaymentHeaderProps {
  title: string;
  message?: string;
  planType?: PlanType;
}

const PaymentHeader = ({ title, message, planType }: PaymentHeaderProps) => {
  const isPremiumPlus = planType === siteConfig.plan.premiumPlus;

  return (
    <div className="space-y-4 text-center">
      <StatusIcon status="success" />

      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: ANIMATION_DELAYS.title }}
        className={cn(
          "font-grotesk bg-clip-text text-3xl font-bold text-transparent md:text-4xl",
          isPremiumPlus ? "bg-premium-plus" : "bg-premium",
        )}
      >
        {title}
      </motion.h1>

      {message && (
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: ANIMATION_DELAYS.message }}
          className="text-base md:text-lg"
        >
          {message}
        </motion.p>
      )}
    </div>
  );
};

export default memo(PaymentHeader);
