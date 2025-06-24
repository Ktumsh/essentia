"use client";

import { motion } from "motion/react";
import { memo } from "react";

import type { LucideIcon } from "lucide-react";

interface PaymentDetailProps {
  icon: LucideIcon;
  label: string;
  value: string;
  delay?: number;
}

const PaymentDetail = ({
  icon: Icon,
  label,
  value,
  delay = 0,
}: PaymentDetailProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay, duration: 0.3 }}
      className="bg-muted ring-alternative flex items-center justify-between rounded-lg bg-linear-to-r/shorter p-4 transition-all duration-200 hover:ring-2"
    >
      <div className="flex items-center gap-3">
        <div className="bg-background rounded-full p-2">
          <Icon className="text-muted-foreground size-4" />
        </div>
        <span className="text-foreground/80 text-sm font-medium">{label}</span>
      </div>
      <span className="text-sm font-semibold">{value}</span>
    </motion.div>
  );
};

export default memo(PaymentDetail);
