"use client";

import { useRouter } from "next/navigation";
import { Session } from "next-auth";
import { useMemo, useState, useTransition } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Card, CardHeader } from "@/components/ui/card";
import { siteConfig } from "@/config/site";
import { CheckCircledIcon } from "@/modules/icons/common";
import { setUserPlan } from "@/modules/payment/pay/actions";
import { cn } from "@/utils/common";

import CancelPlanModal from "./cancel-plan-modal";
import ConfirmPlanModal from "./confirm-plan-modal";

interface PricingCardProps {
  title: string;
  priceId: string;
  isCurrentPlan: boolean;
  isPremiumPlan?: boolean;
  isPremiumPlusPlan?: boolean;
  price: number;
  subtitle: string;
  description: string;
  features: string[];
  session: Session | null;
  isPremium: boolean | null;
}

const PricingCard = ({
  title,
  priceId,
  isCurrentPlan,
  isPremiumPlan = false,
  isPremiumPlusPlan = false,
  price,
  subtitle,
  description,
  features,
  session,
  isPremium,
}: PricingCardProps) => {
  const router = useRouter();

  const { free } = siteConfig.planPrices;

  console.log("isPremiumPlan", isPremiumPlan);
  console.log("isPremiumPlusPlan", isPremiumPlusPlan);

  const [isOpenConfirmPlanModal, setIsOpenConfirmPlanModal] = useState(false);
  const [isOpenCancelModal, setIsOpenCancelModal] = useState(false);

  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const handleSetFreePlan = async () => {
    try {
      startTransition(async () => {
        const result = await setUserPlan(session, priceId);

        if (result.success) {
          toast.success(result.message);
          router.refresh();
          setIsOpenCancelModal(false);
        } else {
          toast.error("Hubo un error al actualizar tu plan.");
        }
      });
    } catch (error) {
      console.error(error);
      toast.error("Hubo un error al actualizar tu plan.");
    }
  };

  const handlePlanSelect = (priceId: string) => {
    if (priceId === free) {
      if (session) {
        setIsOpenCancelModal(true);
      } else {
        router.push("/login?redirect=/premium");
      }
    } else {
      if (session) {
        setSelectedPlan(priceId);
        setIsOpenConfirmPlanModal(true);
      } else {
        router.push("/login?redirect=/premium");
      }
    }
  };

  const cardClassName = useMemo(
    () =>
      cn(
        "relative rounded-xl bg-white shadow-md dark:bg-full-dark",
        !isPremiumPlan &&
          !isPremiumPlusPlan &&
          "border border-gray-300 dark:border-accent-dark",
        isPremiumPlan &&
          "z-10 border-none bg-light-gradient-v2 after:absolute after:inset-px after:rounded-[12px] after:bg-white/40 after:content-[''] dark:bg-dark-gradient-v2 dark:text-white after:dark:bg-full-dark/40",
        isPremiumPlusPlan &&
          "z-0 border-none bg-light-gradient-v2 after:absolute after:inset-px after:rounded-[12px] after:bg-white after:content-[''] dark:bg-dark-gradient-v2 dark:text-white after:dark:bg-full-dark",
      ),
    [isPremiumPlan, isPremiumPlusPlan],
  );

  const cardHeaderClassName = useMemo(
    () =>
      cn(
        "relative z-10 flex-col items-stretch gap-3 space-y-0 p-3 text-main after:-z-10 after:border-b after:border-gray-300 dark:text-white after:dark:border-accent-dark md:p-6",
        !isPremiumPlan && !isPremiumPlusPlan && "after:!inset-0",
        isPremiumPlan
          ? "after:absolute after:inset-px after:bottom-0 after:rounded-[12px] after:rounded-b-none after:bg-white/80 after:content-[''] after:dark:border-full-dark after:dark:bg-full-dark/80"
          : "after:absolute after:inset-px after:bottom-0 after:rounded-[12px] after:rounded-b-none after:bg-gray-100 after:content-[''] after:dark:bg-dark/50",
      ),
    [isPremiumPlan, isPremiumPlusPlan],
  );

  const buttonName = useMemo(() => {
    if (!session) {
      return "Inicia sesión";
    } else if (isCurrentPlan) {
      return "Plan Actual";
    } else {
      return "Escoger " + title;
    }
  }, [isCurrentPlan, session, title]);

  return (
    <>
      <Card className={cardClassName}>
        <CardHeader className={cardHeaderClassName}>
          <div className="inline-flex items-center gap-2">
            <h3 className="text-2xl font-semibold">{title}</h3>
            <div
              className={cn(
                "relative inline-flex h-5 shrink-0 items-center justify-center gap-1 rounded-full px-2.5 text-xs text-main-h dark:text-main-dark",
                isPremiumPlan
                  ? "bg-light-gradient-v2 after:absolute after:inset-px after:z-0 after:rounded-full after:bg-white after:content-[''] dark:bg-dark-gradient-v2 after:dark:bg-full-dark"
                  : "border border-gray-300 bg-white dark:border-accent-dark dark:bg-full-dark",
              )}
            >
              <span className="z-10">{subtitle}</span>
            </div>
          </div>
          <p className="min-h-[40px] text-sm text-main-h dark:text-main-dark-h lg:min-h-[60px]">
            {description}
          </p>
          <p className="inline-block whitespace-nowrap leading-none">
            <span className="font-sans text-2xl font-semibold tracking-tight">
              ${price.toLocaleString("es-CL")}
            </span>
            <span className="ml-0.5 text-sm text-main-m dark:text-main-dark-h">
              {isPremiumPlusPlan ? "/año" : "/mes"}
            </span>
          </p>
          <Button
            radius="full"
            disabled={isCurrentPlan}
            variant={isPremiumPlan ? "gradient" : "outline"}
            onClick={() => handlePlanSelect(priceId)}
            className="z-10 h-10 shadow-none"
          >
            {buttonName}
          </Button>
        </CardHeader>
        <div className="relative z-10 flex w-full flex-auto flex-col p-3 md:p-6">
          <ul role="list" className="grid gap-3">
            {features.map((feature, index) => (
              <li key={index} className="text-sm">
                <div className="flex flex-1 items-center justify-start gap-3 tabular-nums">
                  <div className="relative flex items-center justify-center rounded-full after:absolute after:inset-1 after:-z-10 after:rounded-full after:bg-background after:content-['']">
                    <CheckCircledIcon className="inline-flex size-5 shrink-0 text-teal-400" />
                  </div>
                  <span className="text-left text-main-h dark:text-white/90">
                    {feature}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </Card>
      <ConfirmPlanModal
        isOpen={isOpenConfirmPlanModal}
        setIsOpen={setIsOpenConfirmPlanModal}
        selectedPlan={selectedPlan}
        title={title}
        isUserPremium={isPremium}
      />
      <CancelPlanModal
        isOpen={isOpenCancelModal}
        setIsOpen={setIsOpenCancelModal}
        isPending={isPending}
        handleCancelPlan={handleSetFreePlan}
      />
    </>
  );
};

export default PricingCard;
