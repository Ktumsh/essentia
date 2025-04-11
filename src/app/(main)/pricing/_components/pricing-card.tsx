"use client";

import { Check } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Session } from "next-auth";
import { useMemo, useState, useTransition } from "react";
import { toast } from "sonner";

import { Button } from "@/components/kit/button";
import { Card, CardHeader } from "@/components/kit/card";
import { CheckCircledIcon } from "@/components/ui/icons/common";
import StripeIcon from "@/components/ui/icons/stripe";
import { setUserPlan } from "@/components/ui/payment/actions";
import { siteConfig } from "@/config/site.config";
import { SubscriptionPlanType } from "@/consts/subscriptions-plans";
import { cn, getPlanPrice } from "@/lib/utils";

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

  const [isOpenConfirmPlanModal, setIsOpenConfirmPlanModal] = useState(false);
  const [isOpenCancelModal, setIsOpenCancelModal] = useState(false);

  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const handleSetFreePlan = async () => {
    try {
      startTransition(async () => {
        const result = await setUserPlan(session, getPlanPrice(priceId));

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
        router.push("/login?next=/pricing");
      }
    } else {
      if (session) {
        setSelectedPlan(priceId);
        setIsOpenConfirmPlanModal(true);
      } else {
        router.push("/login?next=/pricing");
      }
    }
  };

  const cardClassName = useMemo(
    () =>
      cn(
        "relative rounded-2xl md:rounded-3xl shrink-0 md:max-w-[362px] snap-start flex flex-col",
        planName === "Premium Plus" && "border-2 border-indigo-500",
        isPremiumPlan &&
          "z-10 border-none bg-gradient-to-r from-indigo-500 to-indigo-600 after:absolute after:inset-px after:rounded-2xl md:after:rounded-3xl after:content-[''] text-white",
      ),
    [isPremiumPlan, planName],
  );

  const cardHeaderClassName = useMemo(
    () =>
      cn(
        "relative z-10 flex-col items-stretch gap-3 space-y-0 p-3 text-foreground after:-z-10 after:border-b-0  md:p-6",
        !isPremiumPlan && "after:inset-0!",
        isPremiumPlan
          ? "after:absolute after:inset-0.5 after:bottom-0 after:rounded-2xl md:after:rounded-3xl after:rounded-b-none after:bg-background after:content-[''] dark:after:border-background"
          : "after:absolute after:inset-px after:bottom-0 after:rounded-2xl md:after:rounded-3xl after:rounded-b-none after:bg-accent after:content-['']",
      ),
    [isPremiumPlan],
  );

  const buttonName = useMemo(() => {
    if (!session) {
      return "Inicia sesión";
    } else if (isCurrentPlan) {
      return "Tu Plan Actual";
    } else if (isPremium && isCurrentPlan) {
      return "Ya estás usando este plan";
    } else {
      return "Escoger " + planName;
    }
  }, [isCurrentPlan, isPremium, session, planName]);

  return (
    <>
      <Card className={cardClassName}>
        <CardHeader className={cardHeaderClassName}>
          <div className="inline-flex items-center gap-2">
            <h3 className="font-merriweather text-2xl font-semibold">
              {planName}
            </h3>
            <div
              className={cn(
                "text-foreground relative inline-flex h-5 shrink-0 items-center justify-center gap-1 rounded-full px-2.5 text-xs",
                isPremiumPlan || planName === "Premium Plus"
                  ? "after:bg-background bg-gradient-to-r from-indigo-500 to-indigo-600 after:absolute after:inset-px after:z-0 after:rounded-full after:content-['']"
                  : "dark:border-alternative bg-background border border-slate-300",
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
            variant={
              isPremiumPlan || planName === "Premium Plus"
                ? "gradient"
                : "outline"
            }
            onClick={() => {
              if (isCurrentPlan) {
                return;
              }
              handlePlanSelect(priceId);
            }}
            className={cn("z-10 h-10 shadow-none", {
              "bg-background": !isPremiumPlan && planName !== "Premium Plus",
              "pointer-events-none": isCurrentPlan,
            })}
          >
            {isCurrentPlan && <Check />}
            {buttonName}
          </Button>
        </CardHeader>
        <div className="relative z-10 flex w-full flex-auto flex-col p-3 md:p-6">
          <ul role="list" className="grid gap-3">
            {features.map((feature, index) => (
              <li key={index} className="text-sm">
                <div className="flex flex-1 items-center justify-start gap-3 tabular-nums">
                  <div
                    className={cn(
                      "after:bg-background relative flex items-center justify-center rounded-full after:absolute after:inset-1 after:-z-10 after:rounded-full after:content-['']",
                      {
                        "after:bg-indigo-950": isPremiumPlan,
                      },
                    )}
                  >
                    <CheckCircledIcon className="inline-flex size-5 shrink-0 text-emerald-400" />
                  </div>
                  <span
                    className={cn("text-foreground text-left", {
                      "text-white": isPremiumPlan,
                    })}
                  >
                    {feature}
                  </span>
                </div>
              </li>
            ))}
          </ul>
          {plan.name !== "Básico" && (
            <div className="jutify-center mt-4 flex flex-1 items-end">
              <div className="bg-background inline-flex w-full items-center justify-center gap-1 rounded-sm">
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
      />
    </>
  );
};

export default PricingCard;
