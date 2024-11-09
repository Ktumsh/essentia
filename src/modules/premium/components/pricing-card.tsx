"use client";

import {
  Button,
  Card,
  CardBody,
  CardHeader,
  useDisclosure,
} from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { FC, useState, useTransition } from "react";
import { toast } from "sonner";

import { siteConfig } from "@/config/site";
import { CheckCircledIcon } from "@/modules/icons/common";
import { setUserPlan } from "@/modules/payment/pay/actions";
import { Session } from "@/types/session";
import { cn } from "@/utils/common";

import CancelPlanModal from "./cancel-plan-modal";
import PaymentModal from "./payment-modal";

interface PricingCardProps {
  title: string;
  priceId: string;
  price: number;
  subtitle?: string;
  description: string;
  buttonTitle?: string;
  features: string[];
  isRecommended?: boolean;
  isAnual?: boolean;
  session: Session;
  isCurrentPlan?: boolean;
}

const PricingCard: FC<PricingCardProps> = ({
  title,
  priceId,
  price,
  subtitle,
  description,
  buttonTitle,
  features,
  isRecommended,
  isAnual,
  session,
  isCurrentPlan = false,
}) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const {
    isOpen: isOpenCancelModal,
    onOpen: onOpenCancelModal,
    onOpenChange: onOpenChangeCancelModal,
  } = useDisclosure();

  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleSetFreePlan = async () => {
    try {
      startTransition(async () => {
        const result = await setUserPlan(session, priceId);

        if (result.success) {
          toast.success(result.message);
          router.refresh();
          onOpenChangeCancelModal();
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
    if (priceId === siteConfig.planPrices.free) {
      if (session) {
        onOpenCancelModal();
      } else {
        router.push("/login?redirect=/premium");
      }
    } else {
      if (session) {
        setSelectedPlan(priceId);
        onOpen();
      } else {
        router.push("/login?redirect=/premium");
      }
    }
  };

  return (
    <>
      <Card
        className={cn(
          "relative rounded-xl bg-white shadow-lg dark:bg-full-dark",
          !isRecommended &&
            !isAnual &&
            "dark:border-accent-dark border border-gray-300",
          isRecommended &&
            "z-10 bg-light-gradient-v2 after:absolute after:inset-px after:rounded-[12px] after:bg-white/40 after:content-[''] dark:bg-dark-gradient-v2 dark:text-white after:dark:bg-full-dark/40",
          isAnual &&
            "z-0 bg-light-gradient-v2 after:absolute after:inset-px after:rounded-[12px] after:bg-white after:content-[''] dark:bg-dark-gradient-v2 dark:text-white after:dark:bg-full-dark",
        )}
      >
        <CardHeader
          className={cn(
            "after:dark:border-accent-dark relative z-10 flex-col items-stretch gap-3 p-3 text-main after:border-b after:border-gray-300 dark:text-white md:p-6",
            !isRecommended && !isAnual && "after:!inset-0",
            isRecommended
              ? "after:absolute after:inset-px after:bottom-0 after:z-[-1] after:rounded-[12px] after:rounded-b-none after:bg-white/80 after:content-[''] after:dark:border-full-dark after:dark:bg-full-dark/80"
              : "after:absolute after:inset-px after:bottom-0 after:z-[-1] after:rounded-[12px] after:rounded-b-none after:bg-gray-100 after:content-[''] after:dark:bg-dark/50",
          )}
        >
          <div className="inline-flex items-center gap-2">
            <h3 className="text-2xl font-semibold">{title}</h3>
            {subtitle && (
              <div
                className={cn(
                  "relative inline-flex h-5 shrink-0 items-center justify-center gap-1 rounded-full px-2.5 text-xs text-main-h dark:text-main-dark",
                  isRecommended
                    ? "bg-light-gradient-v2 after:absolute after:inset-px after:z-0 after:rounded-full after:bg-white after:content-[''] dark:bg-dark-gradient-v2 after:dark:bg-full-dark"
                    : "dark:border-accent-dark border border-gray-300 bg-white dark:bg-full-dark",
                )}
              >
                <span className="z-10">{subtitle}</span>
              </div>
            )}
          </div>
          <p className="min-h-[40px] text-sm text-main-h dark:text-main-dark-h lg:min-h-[60px]">
            {description}
          </p>
          <p className="inline-block whitespace-nowrap leading-none">
            <span className="font-sans text-2xl font-semibold tracking-tight">
              ${price.toLocaleString("es-CL")}
            </span>
            <span className="ml-0.5 text-sm text-main-m dark:text-main-dark-h">
              {isAnual ? "/año" : "/mes"}
            </span>
          </p>
          <Button
            radius="full"
            isDisabled={isCurrentPlan}
            onPress={() => handlePlanSelect(priceId)}
            className={cn(
              "dark:border-accent-dark z-10 border border-gray-300 text-sm dark:bg-full-dark/80",
              isRecommended &&
                "border-none bg-light-gradient-v2 dark:bg-dark-gradient-v2",
              isAnual && "bg-white dark:bg-full-dark",
            )}
          >
            {session ? (
              isRecommended ? (
                <span className="font-bold text-white">
                  {isCurrentPlan ? "Plan Actual" : buttonTitle}
                </span>
              ) : (
                <span>{isCurrentPlan ? "Plan Actual" : buttonTitle}</span>
              )
            ) : isRecommended ? (
              <span className="font-bold text-white">Inicia sesión</span>
            ) : (
              <span>Inicia sesión</span>
            )}
          </Button>
        </CardHeader>
        <CardBody className="z-10 p-3 md:p-6">
          <ul role="list" className="grid gap-3">
            {features.map((feature, index) => (
              <li key={index} className="text-sm">
                <div className="flex flex-1 items-center justify-start gap-3 tabular-nums">
                  <CheckCircledIcon className="inline-flex size-5 shrink-0 text-teal-400" />
                  <span className="text-left text-main-h dark:text-white/90">
                    {feature}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </CardBody>
      </Card>
      <PaymentModal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        selectedPlan={selectedPlan}
        title={title}
      />
      <CancelPlanModal
        isOpen={isOpenCancelModal}
        onOpenChange={onOpenChangeCancelModal}
        isPending={isPending}
        handleCancelPlan={handleSetFreePlan}
      />
    </>
  );
};

export default PricingCard;
