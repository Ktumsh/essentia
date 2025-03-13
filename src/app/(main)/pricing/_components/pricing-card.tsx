"use client";

import { useRouter } from "next/navigation";
import { Session } from "next-auth";
import { useMemo, useState, useTransition } from "react";
import { toast } from "sonner";

import { Button } from "@/components/kit/button";
import { Card, CardHeader } from "@/components/kit/card";
import { CheckCircledIcon } from "@/components/ui/icons/common";
import { setUserPlan } from "@/components/ui/payment/actions";
import { siteConfig } from "@/config/site.config";
import { cn } from "@/lib/utils";

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
        router.push("/login?redirect=/pricing");
      }
    } else {
      if (session) {
        setSelectedPlan(priceId);
        setIsOpenConfirmPlanModal(true);
      } else {
        router.push("/login?redirect=/pricing");
      }
    }
  };

  const cardClassName = useMemo(
    () =>
      cn(
        "relative rounded-2xl md:rounded-3xl shrink-0 md:max-w-[352px] snap-start",
        !isPremiumPlan &&
          !isPremiumPlusPlan &&
          "border border-slate-300 dark:border-alternative",
        isPremiumPlan &&
          "z-10 border-none bg-gradient-to-r from-gradient-from via-gradient-via to-gradient-to dark:from-[-100%] after:absolute after:inset-px after:rounded-2xl md:after:rounded-3xl after:content-[''] text-foreground after:bg-background/50",
        isPremiumPlusPlan &&
          "z-0 border-none bg-gradient-to-r from-gradient-from via-gradient-via to-gradient-to dark:from-[-100%] after:absolute after:inset-px after:rounded-2xl md:after:rounded-3xl after:bg-background after:content-['']",
      ),
    [isPremiumPlan, isPremiumPlusPlan],
  );

  const cardHeaderClassName = useMemo(
    () =>
      cn(
        "relative z-10 flex-col items-stretch gap-3 space-y-0 p-3 text-foreground after:-z-10 after:border-b-0 after:border-slate-300 dark:after:border-alternative md:p-6",
        !isPremiumPlan && !isPremiumPlusPlan && "after:inset-0!",
        isPremiumPlan
          ? "after:absolute after:inset-px after:bottom-0 after:rounded-2xl md:after:rounded-3xl after:rounded-b-none  after:bg-background after:content-[''] dark:after:borde-background"
          : "after:absolute after:inset-px after:bottom-0 after:rounded-2xl md:after:rounded-3xl after:rounded-b-none after:bg-accent after:content-[''] dark:after:bg-accent/50",
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
            <h3 className="font-merriweather text-2xl font-semibold">
              {title}
            </h3>
            <div
              className={cn(
                "text-foreground relative inline-flex h-5 shrink-0 items-center justify-center gap-1 rounded-full px-2.5 text-xs",
                isPremiumPlan
                  ? "from-gradient-from via-gradient-via to-gradient-to after:bg-background bg-gradient-to-r after:absolute after:inset-px after:z-0 after:rounded-full after:content-[''] dark:from-[-100%]"
                  : "dark:border-alternative bg-background border border-slate-300",
              )}
            >
              <span className="z-10">{subtitle}</span>
            </div>
          </div>
          <p className="text-foreground/80 min-h-[40px] text-sm lg:min-h-[60px]">
            {description}
          </p>
          <p className="inline-block leading-none whitespace-nowrap">
            <span className="font-sans text-2xl font-semibold tracking-tight">
              ${price.toLocaleString("es-CL")}
            </span>
            <span className="text-muted-foreground ml-0.5 text-sm">
              {isPremiumPlusPlan ? "/año" : "/mes"}
            </span>
          </p>
          <Button
            radius="full"
            disabled={isCurrentPlan}
            variant={isPremiumPlan ? "gradient" : "outline"}
            onClick={() => handlePlanSelect(priceId)}
            className={cn("z-10 h-10 shadow-none", {
              "bg-background": !isPremiumPlan,
            })}
          >
            {buttonName}
          </Button>
        </CardHeader>
        <div className="relative z-10 flex w-full flex-auto flex-col p-3 md:p-6">
          <ul role="list" className="grid gap-3">
            {features.map((feature, index) => (
              <li key={index} className="text-sm">
                <div className="flex flex-1 items-center justify-start gap-3 tabular-nums">
                  <div className="after:bg-background relative flex items-center justify-center rounded-full after:absolute after:inset-1 after:-z-10 after:rounded-full after:content-['']">
                    <CheckCircledIcon className="inline-flex size-5 shrink-0 text-emerald-400" />
                  </div>
                  <span className="text-foreground text-left">{feature}</span>
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
