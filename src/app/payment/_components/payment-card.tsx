"use client";

import {
  CalendarCheck2,
  CalendarIcon as CalendarSync,
  Tag,
} from "lucide-react";
import { motion } from "motion/react";
import { memo } from "react";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { siteConfig } from "@/config/site.config";
import { cn, formatDate } from "@/utils";

import PaymentDetail from "./payment-detail";
import {
  ANIMATION_DELAYS,
  formatCurrency,
  getPlanDisplayName,
  PLAN_COLORS,
} from "../_lib/utils";

import type { Payment } from "@/db/schema";
import type { PlanType } from "@/lib/types";

interface PaymentCardProps {
  paymentDetails: Payment;
  planType?: PlanType;
  renewalDate?: Date | null;
}

const PaymentCard = ({
  paymentDetails,
  planType,
  renewalDate,
}: PaymentCardProps) => {
  const cardVariants = {
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.95 },
  };

  const isPremiumPlus = planType === siteConfig.plan.premiumPlus;
  const planKey = planType as keyof typeof PLAN_COLORS;
  const planColor = PLAN_COLORS[planKey] || PLAN_COLORS.premium;

  return (
    <motion.div
      variants={cardVariants}
      initial="initial"
      animate="animate"
      transition={{ delay: ANIMATION_DELAYS.card }}
    >
      <Card className="bg-background shadow-pretty overflow-hidden border">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-foreground text-xl">
              Detalles del pago
            </CardTitle>
            <Badge
              variant={planColor}
              className={cn("px-3 py-1 font-medium capitalize", planColor)}
            >
              {getPlanDisplayName(paymentDetails.plan)}
            </Badge>
          </div>
        </CardHeader>

        <CardContent className="space-y-4 p-6">
          <PaymentDetail
            icon={Tag}
            label="Tipo de plan"
            value={
              (planType && getPlanDisplayName(planType)) ||
              getPlanDisplayName(paymentDetails.plan)
            }
            delay={ANIMATION_DELAYS.details[0]}
          />

          <PaymentDetail
            icon={CalendarCheck2}
            label="Fecha del pago"
            value={formatDate(paymentDetails.processedAt!, "dd/MM/yyyy")}
            delay={ANIMATION_DELAYS.details[1]}
          />

          <PaymentDetail
            icon={CalendarSync}
            label="Próxima renovación"
            value={formatDate(renewalDate!, "dd/MM/yyyy")}
            delay={ANIMATION_DELAYS.details[2]}
          />
        </CardContent>

        <Separator />

        <CardFooter className="bg-background p-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: ANIMATION_DELAYS.total }}
            className="flex w-full items-center justify-between"
          >
            <span className="text-foreground text-lg font-semibold">
              Total pagado
            </span>
            <span
              className={cn(
                "bg-clip-text text-2xl font-bold text-transparent",
                isPremiumPlus ? "bg-premium-plus" : "bg-premium",
              )}
            >
              {formatCurrency(paymentDetails.amount!, paymentDetails.currency!)}
            </span>
          </motion.div>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default memo(PaymentCard);
