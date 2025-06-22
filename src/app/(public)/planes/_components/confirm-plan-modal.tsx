"use client";

import { Loader, Sparkles, BadgeCheck } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { toast } from "sonner";

import { createSubscription } from "@/app/payment/actions";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  SubscriptionPlanType,
  SUBSCRIPTION_PLAN_DATA,
} from "@/db/data/subscription-plan-data";
import { startUserTrial } from "@/db/querys/user-querys";
import { useUserSubscription } from "@/hooks/use-user-subscription";
import { getClientIp, getPlanPrice, formatDate } from "@/utils";

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
  const { data: session } = useSession();
  const { subscription, trial } = useUserSubscription();

  const userId = session?.user?.id;
  const isTrialUsed = trial?.hasUsed;
  const isPremium = subscription?.subscription.isPremium;
  const isCurrentPremiumPlus = subscription?.plan?.id === "premium-plus";
  const isChangingPlan =
    isPremium && selectedPlan && subscription?.plan?.id !== selectedPlan;

  const isPremiumOrPlus = plan.id === "premium" || plan.name === "premium-plus";

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

      if (!userId) {
        return toast.error("¡Ups 😔", {
          description: "No se pudo activar la prueba gratuita.",
        });
      }

      await startUserTrial(userId, ip);
      toast.success("Prueba gratuita activada");
      setIsOpen(false);
      setTimeout(() => {
        window.location.reload();
      }, 500);
    } catch (err: any) {
      toast.error(err.message || "No se pudo activar la prueba.");
    } finally {
      setIsLoading(false);
    }
  }, [userId, setIsOpen]);

  const handleProceedToPayment = useCallback(async () => {
    if (!selectedPlan) {
      toast.error("Selecciona un plan");
      return;
    }

    setIsLoading(true);
    try {
      const { checkoutUrl, downgraded } = await createSubscription({
        priceId: getPlanPrice(selectedPlan),
      });

      if (downgraded) {
        toast.success(
          "El cambio de plan se aplicará al finalizar el período actual",
        );
        setIsOpen(false);
        return;
      }

      if (checkoutUrl) {
        router.push(checkoutUrl);
      } else {
        toast.error("No se pudo generar el enlace de pago");
      }
    } catch {
      toast.error("Hubo un error creando tu suscripción");
    } finally {
      setIsLoading(false);
    }
  }, [selectedPlan, router, setIsOpen]);

  const premiumPlan = useMemo(
    () => SUBSCRIPTION_PLAN_DATA.find((p) => p.name === "Premium"),
    [],
  );

  const featuresToShow = useMemo(() => {
    if (step === "trial") {
      const base =
        plan.id === "premium-plus" && premiumPlan
          ? premiumPlan.features
          : plan.features;

      return base.filter(
        (f) =>
          !f.toLowerCase().includes("soporte") &&
          !f.toLowerCase().includes("archivo"),
      );
    }
    return plan.features;
  }, [step, plan.id, plan.features, premiumPlan]);

  const modalContent = {
    trial: {
      title: "¡Activa tu prueba gratuita!",
      price: null,
      description:
        "Disfruta 7 días de acceso Premium sin pagar ni ingresar tarjeta.",
      icon: <Sparkles className="size-5 text-yellow-400 md:size-6" />,
      buttonText: "Comenzar prueba gratuita",
      buttonAction: handleStartTrial,
    },
    main: {
      title: isCurrentPremiumPlus
        ? "Ya tienes el plan más completo 🎉"
        : `Mejorar a ${planName}`,
      price: plan.amount,
      description: isChangingPlan
        ? "Este plan se activará automáticamente cuando finalice tu suscripción actual."
        : plan.description,

      icon: <BadgeCheck className="size-5 text-yellow-400 md:size-6" />,
      buttonText: "Continuar con el pago",
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
              {current.price && (
                <p className="text-foreground">
                  <span className="font-sans text-2xl font-semibold tracking-tight">
                    {`$${current.price.toLocaleString("es-CL")}`}
                  </span>
                  <span className="text-muted-foreground ml-0.5 text-sm">
                    {current.price < 100000 ? "/mes" : "/año"}
                  </span>
                </p>
              )}
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
              {isChangingPlan && step === "main" && (
                <p className="text-muted-foreground px-5 text-xs">
                  <strong className="text-secondary font-medium">
                    Importante:
                  </strong>{" "}
                  El nuevo plan seleccionado se activará automáticamente una vez
                  que termine tu plan actual (
                  <span className="font-medium">
                    {formatDate(
                      subscription?.subscription.expiresAt as Date,
                      "dd MMM yyyy",
                    )}
                  </span>
                  ).
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
