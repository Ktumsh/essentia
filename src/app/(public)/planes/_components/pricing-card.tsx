"use client";

import { Check } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Session } from "next-auth";
import { useState, useTransition } from "react";
import { toast } from "sonner";

import { setUserPlan } from "@/app/payment/actions";
import { CheckCircledIcon } from "@/components/icons/common";
import StripeIcon from "@/components/icons/stripe";
import { Button } from "@/components/ui/button";
import { Card, CardHeader } from "@/components/ui/card";
import { siteConfig } from "@/config/site.config";
import { SubscriptionPlanType } from "@/db/data/subscription-plan-data";
import { useUserSubscription } from "@/hooks/use-user-subscription";
import { getPlanPrice, cn } from "@/utils";

import CancelPlanModal from "./cancel-plan-modal";
import ConfirmPlanModal from "./confirm-plan-modal";

interface PricingCardProps {
  plan: SubscriptionPlanType;
  isCurrentPlan?: boolean;
  isPremiumPlan?: boolean;
  session: Session | null;
  isPremium: boolean | null;
}

const PricingCard = ({
  plan,
  isCurrentPlan = false,
  isPremiumPlan = false,
  session,
  isPremium,
}: PricingCardProps) => {
  const router = useRouter();
  const { trial } = useUserSubscription();
  const { free } = siteConfig.plan;
  const {
    name: planName,
    label,
    description,
    other,
    id: priceId,
    monthlyAmount,
    features,
  } = plan;

  const isPremiumPlus = planName === "Premium Plus";
  const isPremiumStyle = isPremiumPlan || isPremiumPlus;

  const [isOpenConfirmPlanModal, setIsOpenConfirmPlanModal] = useState(false);
  const [isOpenCancelModal, setIsOpenCancelModal] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const requireSession = (callback: () => void) => {
    if (session) {
      callback();
    } else {
      router.push("/login?next=/pricing");
    }
  };

  const handleSetFreePlan = async () => {
    startTransition(async () => {
      try {
        const result = await setUserPlan(session, getPlanPrice(priceId));
        if (result.success) {
          toast.success(result.message);
          router.refresh();
          setIsOpenCancelModal(false);
        } else {
          toast.error("Hubo un error al actualizar tu plan.");
        }
      } catch (error) {
        console.error(error);
        toast.error("Hubo un error al actualizar tu plan.");
      }
    });
  };

  const handlePlanSelect = (priceId: string) => {
    requireSession(() => {
      if (priceId === free) {
        setIsOpenCancelModal(true);
      } else {
        setSelectedPlan(priceId);
        setIsOpenConfirmPlanModal(true);
      }
    });
  };

  const buttonLabel = !session
    ? "Inicia sesión"
    : isCurrentPlan
      ? "Tu Plan Actual"
      : isPremium && isCurrentPlan
        ? "Ya estás usando este plan"
        : "Escoger " + planName;

  return (
    <>
      <Card
        className={cn(
          "border-alternative relative flex shrink-0 snap-start flex-col rounded-2xl border-2 shadow-sm md:max-w-[362px] md:rounded-3xl",
          isPremiumStyle &&
            "bg-premium z-10 border-none text-white after:absolute after:inset-px after:rounded-2xl after:content-[''] md:after:rounded-3xl",
          isPremiumPlus && "bg-premium-plus",
        )}
      >
        <CardHeader
          className={cn(
            "text-foreground relative z-10 flex-col gap-3 space-y-0 p-3 after:-z-10 after:border-b-0 md:p-6",
            !isPremiumStyle && "after:inset-0!",
            isPremiumStyle
              ? "after:bg-background dark:after:border-background after:absolute after:inset-0.5 after:bottom-0 after:rounded-[22px] after:content-[''] md:after:rounded-[22px]"
              : "after:bg-accent after:absolute after:inset-px after:bottom-0 after:rounded-2xl after:rounded-b-none after:content-[''] md:after:rounded-3xl",
          )}
        >
          <div className="inline-flex items-center gap-2">
            <h3 className="font-merriweather text-2xl font-semibold">
              {planName}
            </h3>
            <div
              className={cn(
                "text-foreground relative inline-flex h-5 shrink-0 items-center justify-center gap-1 rounded-full px-2.5 text-xs",
                isPremiumStyle
                  ? "after:bg-background bg-premium after:absolute after:inset-px after:z-0 after:rounded-full after:content-['']"
                  : "dark:border-alternative bg-background border border-slate-300",
                isPremiumPlus && "bg-premium-plus",
              )}
            >
              <span className="z-10">{label}</span>
            </div>
          </div>
          <p className="text-foreground/80 min-h-[40px] text-sm lg:min-h-[60px]">
            {description}
          </p>
          <div className="space-y-1">
            <p className="inline-block leading-none whitespace-nowrap">
              <span className="font-sans text-2xl font-semibold tracking-tight">
                {monthlyAmount === 0
                  ? "Gratis"
                  : `$${monthlyAmount.toLocaleString("es-CL")}`}
              </span>
              {monthlyAmount > 0 && (
                <span className="text-muted-foreground ml-0.5 text-sm">
                  /mes
                </span>
              )}
            </p>
            <p className="text-muted-foreground text-xs">{other}</p>
          </div>
          <Button
            radius="full"
            variant={isPremiumStyle ? "gradient" : "outline"}
            onClick={() => !isCurrentPlan && handlePlanSelect(priceId)}
            className={cn("z-10 h-10 shadow-none", {
              "bg-background": !isPremiumStyle,
              "pointer-events-none": isCurrentPlan,
              "bg-premium-plus!": isPremiumPlus,
            })}
          >
            {isCurrentPlan && <Check />}
            {buttonLabel}
          </Button>
        </CardHeader>
        <div className="relative z-10 flex w-full flex-auto flex-col p-3 md:p-6">
          <ul role="list" className="grid gap-3">
            {features.map((feature, index) => (
              <li key={index} className="text-sm">
                <div className="flex flex-1 items-start justify-start gap-3 tabular-nums">
                  <div className="relative flex items-center justify-center rounded-full after:absolute after:inset-1 after:-z-10 after:rounded-full after:content-['']">
                    <CheckCircledIcon className="inline-flex size-5 shrink-0 text-emerald-400" />
                  </div>
                  <span
                    className={cn("text-foreground mt-0.5 text-left", {
                      "text-white": isPremiumStyle,
                      "font-bold": index === 0 && isPremiumStyle,
                    })}
                  >
                    {feature}
                  </span>
                </div>
              </li>
            ))}
          </ul>
          {plan.name !== "Básico" && (
            <div className="mt-6 flex flex-1 items-end justify-center">
              <div className="bg-background inline-flex w-full items-center justify-center gap-1 rounded-full">
                <p className="text-foreground text-center text-xs">
                  Pagos seguros con
                </p>
                <Link
                  href="https://stripe.com/es"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <StripeIcon className="size-8" />
                </Link>
              </div>
            </div>
          )}
        </div>
      </Card>
      <ConfirmPlanModal
        plan={plan}
        isOpen={isOpenConfirmPlanModal}
        setIsOpen={setIsOpenConfirmPlanModal}
        selectedPlan={selectedPlan}
        planName={planName}
      />
      <CancelPlanModal
        isOpen={isOpenCancelModal}
        setIsOpen={setIsOpenCancelModal}
        isPending={isPending}
        handleCancelPlan={handleSetFreePlan}
        isTrialingPremium={trial?.isActive}
      />
    </>
  );
};

export default PricingCard;
