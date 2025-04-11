"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Loader, Sparkles, BadgeCheck } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/kit/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/kit/dialog";
import { createSubscription } from "@/components/ui/payment/actions";
import {
  SubscriptionPlanType,
  SUBSCRIPTION_PLANS,
} from "@/consts/subscriptions-plans";
import { startUserTrial } from "@/db/querys/user-querys";
import { useUserProfile } from "@/hooks/use-user-profile";
import { getClientIp, getPlanPrice } from "@/lib/utils";

interface ConfirmPlanModalProps {
  plan: SubscriptionPlanType;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  selectedPlan: string | null;
  planName: string;
}

const ConfirmPlanModal = ({
  plan,
  isOpen,
  setIsOpen,
  selectedPlan,
  planName,
}: ConfirmPlanModalProps) => {
  const router = useRouter();
  const [step, setStep] = useState<"trial" | "main">("main");
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useUserProfile();

  const isTrialUsed = user?.trial?.hasUsed;
  const isPremium = user?.isPremium;

  const isPremiumOrPlus =
    plan.name === "Premium" || plan.name === "Premium Plus";

  const canOfferTrial = isPremiumOrPlus && !isTrialUsed && !isPremium;

  useEffect(() => {
    if (isOpen && canOfferTrial) {
      setStep("trial");
    } else {
      setStep("main");
    }
  }, [isOpen, canOfferTrial]);

  const handleStartTrial = useCallback(async () => {
    try {
      setIsLoading(true);
      const ip = await getClientIp();

      if (user?.id) {
        await startUserTrial(user.id, ip);
        toast.success("Prueba gratuita activada");
        setIsOpen(false);
        router.refresh();
      }
    } catch (err: any) {
      toast.error(err.message || "No se pudo activar la prueba.");
    } finally {
      setIsLoading(false);
    }
  }, [user?.id, router, setIsOpen]);

  const handleProceedToPayment = useCallback(async () => {
    if (!selectedPlan) {
      toast.error("Selecciona un plan");
      return;
    }

    setIsLoading(true);
    try {
      const subscriptionResponse = await createSubscription({
        priceId: getPlanPrice(selectedPlan),
      });
      router.push(subscriptionResponse.checkoutUrl);
    } catch {
      toast.error("Hubo un error creando tu suscripción");
      setIsLoading(false);
    }
  }, [selectedPlan, router]);

  const premiumPlan = useMemo(
    () => SUBSCRIPTION_PLANS.find((p) => p.name === "Premium"),
    [],
  );

  const featuresToShow = useMemo(() => {
    if (step === "trial") {
      const base =
        plan.name === "Premium Plus" && premiumPlan
          ? premiumPlan.features
          : plan.features;

      return base.filter(
        (f) =>
          !f.toLowerCase().includes("soporte") &&
          !f.toLowerCase().includes("archivo"),
      );
    }
    return plan.features;
  }, [step, plan.name, plan.features, premiumPlan]);

  const modalContent = {
    trial: {
      title: "¡Activa tu prueba gratuita!",
      description:
        "Disfruta 7 días de acceso Premium sin pagar ni ingresar tarjeta.",
      icon: <Sparkles className="size-5 text-yellow-400 md:size-6" />,
      buttonText: "Comenzar prueba gratuita",
      buttonAction: handleStartTrial,
    },
    main: {
      title: `Mejorar a ${planName}`,
      description: plan.description,
      icon: <BadgeCheck className="size-5 text-yellow-400 md:size-6" />,
      buttonText: "Continuar",
      buttonAction: handleProceedToPayment,
    },
  };

  const current = modalContent[step];

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent
        isSecondary
        closeButtonClass="hover:bg-white/5! active:bg-white/10! text-white!"
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={
              step === "trial" ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }
            }
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.25 }}
          >
            <DialogHeader isSecondary className="p-1! text-start text-white">
              <div className="rounded-[20px] bg-gradient-to-r from-indigo-500 to-pink-500 p-5">
                <div className="mb-2 flex items-center gap-2">
                  {current.icon}
                  <DialogTitle className="text-base font-bold md:text-lg">
                    {current.title}
                  </DialogTitle>
                </div>
                <DialogDescription className="text-white/90">
                  {current.description}
                </DialogDescription>
              </div>
            </DialogHeader>

            <div className="text-foreground space-y-6 p-5 text-sm">
              <ul className="list-disc space-y-2 pl-5">
                {featuresToShow.map((f, i) => (
                  <li key={i}>{f}</li>
                ))}
              </ul>
              {step === "trial" && (
                <p className="text-muted-foreground text-start text-xs">
                  Durante la prueba gratuita tendrás acceso a todas las
                  funcionalidades del plan Premium, excepto el soporte estándar
                  con respuesta rápida y el aumento en el límite de archivos
                  médicos, que se mantiene en 6 archivos activos como en el plan
                  básico.
                </p>
              )}
            </div>

            <DialogFooter isSecondary>
              <div className="w-full space-y-3">
                <Button
                  variant="gradient"
                  size="lg"
                  disabled={isLoading}
                  onClick={current.buttonAction}
                  className="relative w-full rounded-full duration-500 after:absolute after:inset-0 after:-z-1 after:size-full after:bg-gradient-to-r after:from-indigo-500 after:to-pink-500 after:opacity-0 after:blur-lg after:saturate-150 after:transition-all after:duration-500 after:content-[''] hover:after:opacity-80"
                >
                  {isLoading ? (
                    <Loader className="size-4 animate-spin" />
                  ) : (
                    current.buttonText
                  )}
                </Button>

                {step === "trial" && (
                  <button
                    className="text-muted-foreground hover:text-foreground w-full text-center text-xs underline"
                    onClick={() => setStep("main")}
                  >
                    Quizás más tarde
                  </button>
                )}
              </div>
            </DialogFooter>
          </motion.div>
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
};

export default ConfirmPlanModal;
