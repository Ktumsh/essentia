"use client";

import {
  BookmarkCheck,
  Brain,
  Crown,
  GraduationCapIcon,
  Loader,
  MessagesSquare,
  SmileIcon,
  Sparkles,
  UsersIcon,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";

import { UpgradeButton } from "@/components/button-kit/upgrade-button";
import { LinkIcon } from "@/components/icons/action";
import { AIFillIcon } from "@/components/icons/interface";
import {
  ExcerciseFillIcon,
  FruitIcon,
  SaveFillIcon,
  UploadFillIcon,
} from "@/components/icons/miscellaneus";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { siteConfig } from "@/config/site.config";
import { startUserTrial } from "@/db/querys/user-querys";
import { useCurrentPlan } from "@/hooks/use-current-plan";
import { useTrial } from "@/hooks/use-trial";
import { useUserProfile } from "@/hooks/use-user-profile";
import { useUserSubscription } from "@/hooks/use-user-subscription";
import {
  getClientIp,
  getPlanName,
  getPlanPrice,
  cn,
  formatDate,
  getPlanNumericValue,
} from "@/utils";

import { PlanSelector } from "./plan-selector";
import { createSubscription } from "../../../app/payment/actions";

import type { FeatureType } from "@/lib/types";

interface PaymentModalProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  featureType?: FeatureType;
  mode?: "trial" | "upgrade";
}

const PaymentModal = ({
  isOpen,
  setIsOpen,
  featureType,
  mode = "upgrade",
}: PaymentModalProps) => {
  const router = useRouter();
  const { currentPlan } = useCurrentPlan();

  const [step, setStep] = useState<"main" | "trial">(
    mode === "trial" ? "trial" : "main",
  );

  const [selectedPlan, setSelectedPlan] = useState<string>("");

  const { user } = useUserProfile();

  const { subscription } = useUserSubscription();

  const currentPlanId = subscription?.plan?.id;

  useEffect(() => {
    if (
      featureType === "upgrade-plan" ||
      featureType === "habits-and-progress"
    ) {
      setSelectedPlan(siteConfig.plan.premiumPlus);
    } else if (
      featureType === "upload-limit" &&
      currentPlan === siteConfig.plan.premium
    ) {
      setSelectedPlan(siteConfig.plan.premiumPlus);
    } else if (currentPlan === siteConfig.plan.free) {
      setSelectedPlan(siteConfig.plan.premium);
    } else {
      setSelectedPlan(currentPlan || siteConfig.plan.free);
    }
  }, [currentPlan, featureType]);

  const isUpgrade =
    currentPlanId &&
    selectedPlan &&
    selectedPlan !== currentPlanId &&
    getPlanNumericValue(selectedPlan) > getPlanNumericValue(currentPlanId);

  const isDowngrade =
    currentPlanId &&
    selectedPlan &&
    selectedPlan !== currentPlanId &&
    getPlanNumericValue(selectedPlan) < getPlanNumericValue(currentPlanId);

  const isOnFreePlan = currentPlan === siteConfig.plan.free;

  const actionLabel = isUpgrade || isOnFreePlan ? "Mejorar a" : "Cambiar a";

  const shouldRotateIcon = isDowngrade && !isOnFreePlan;

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const isFree = selectedPlan === siteConfig.plan.free;

  const { isTrialActive } = useTrial();

  const handleProceedToPayment = useCallback(async () => {
    if (selectedPlan === currentPlan) {
      toast.info("Ya tienes seleccionado tu plan actual.");
      return;
    }

    if (isFree) {
      toast.error(
        "Para seleccionar un plan gratuito debes cancelar tu suscripción actual.",
      );
      return;
    }

    if (!selectedPlan) {
      toast.error("Selecciona un plan");
      return;
    }

    setIsLoading(true);
    try {
      document.cookie = `stripe_cancel_url=${window.location.href}; path=/`;

      const { checkoutUrl, downgraded } = await createSubscription({
        priceId: getPlanPrice(selectedPlan),
      });

      if (downgraded) {
        toast.success(
          "El cambio de plan se aplicará automáticamente al finalizar tu período actual.",
        );
        setIsOpen(false);
        return;
      }

      if (checkoutUrl) {
        router.push(checkoutUrl);
      } else {
        toast.error("No se pudo generar el enlace de pago.");
      }
    } catch {
      toast.error("Hubo un error creando tu suscripción");
    } finally {
      setIsLoading(false);
    }
  }, [selectedPlan, currentPlan, router, isFree, setIsOpen]);

  const handleStartTrial = async () => {
    try {
      setIsLoading(true);
      const ip = await getClientIp();

      if (!user?.id) {
        return toast.error("¡Ups 😔", {
          description: "No se pudo activar la prueba gratuita.",
        });
      }

      await startUserTrial(user.id, ip);
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
  };

  const getFeatureContent = () => {
    switch (featureType) {
      case "ai-recommendations":
        return {
          title: "Desbloquea recomendaciones con IA",
          description:
            "Obtén recomendaciones personalizadas basadas en tu historial médico con nuestra avanzada inteligencia artificial.",
          icon: <Brain className="size-5" />,
          color: "bg-pink-500",
        };
      case "saved-recommendations":
        return {
          title: "Desbloquea recomendaciones guardadas",
          description:
            "Guarda y gestiona todas tus recomendaciones personalizadas para acceder a ellas cuando las necesites.",
          icon: <SaveFillIcon className="size-5" />,
          color: "bg-pink-500",
        };
      case "chat":
        return {
          title: "Desbloquea a Aeris",
          description:
            "Interactúa con nuestra inteligencia artificial para obtener respuestas rápidas, precisas y herramientas personalizadas para tu salud.",
          icon: <AIFillIcon className="size-5" />,
          color: "bg-yellow-500",
        };
      case "upload-limit":
        if (isTrialActive) {
          return {
            title: "Límite alcanzado en tu prueba gratuita",
            description:
              "Tu prueba gratuita te da acceso a funciones Premium, pero permite subir hasta 12 documentos médicos. Mejora tu plan para ampliar este límite.",
            icon: <UploadFillIcon className="size-5" />,
            color: "bg-teal-500",
          };
        } else {
          return {
            title: "Aumenta tu límite de documentos",
            description:
              "Mejora tu plan para subir más documentos médicos y mantener toda tu información de salud organizada en un solo lugar.",
            icon: <UploadFillIcon className="size-5" />,
            color: "bg-teal-500",
          };
        }
      case "routine":
        return {
          title: "Crea rutinas personalizadas",
          description:
            "Diseña rutinas de ejercicios adaptadas a tus necesidades y objetivos de salud.",
          icon: <ExcerciseFillIcon className="size-5" />,
          color: "bg-lime-500",
        };
      case "nutritional-plan":
        return {
          title: "Crea un plan nutricional personalizado",
          description:
            "Diseña un plan nutricional adaptado a tus necesidades y objetivos de salud.",
          icon: <FruitIcon className="size-5" />,
          color: "bg-red-500",
        };
      case "upgrade-plan":
        return {
          title: "Desbloquea el máximo acceso a Essentia",
          description:
            "Accede a Aeris sin límites, documentos médicos ilimitados y seguimiento de hábitos con IA para cuidar tu salud de forma integral.",
          icon: <Crown className="size-5" />,
          color: "bg-yellow-500",
        };
      case "habits-and-progress":
        return {
          title: "Monitorea tus hábitos y progreso",
          description:
            "Lleva un seguimiento de tus hábitos saludables, establece metas diarias y observa tu evolución a lo largo del tiempo.",
          icon: <BookmarkCheck className="size-5" />,
          color: "bg-orange-500",
        };
      case "wellbeing":
        return {
          title: "Recibe recomendaciones para tu bienestar emocional",
          description:
            "Obtén apoyo personalizado para mejorar tu salud mental, manejar el estrés y fomentar tu equilibrio emocional.",
          icon: <Brain className="size-5" />,
          color: "bg-fuchsia-500",
        };

      case "health":
        return {
          title: "Mejora tu salud física y emocional",
          description:
            "Recibe orientación integral para cuidar tu cuerpo y mente con recomendaciones personalizadas según tus objetivos.",
          icon: <SmileIcon className="size-5" />,
          color: "bg-teal-500",
        };

      case "sex-education":
        return {
          title: "Aprende sobre salud y educación sexual",
          description:
            "Accede a información confiable y orientación personalizada sobre autocuidado, sexualidad y relaciones saludables.",
          icon: <GraduationCapIcon className="size-5" />,
          color: "bg-sky-500",
        };

      case "health-all-ages":
        return {
          title: "Cuida tu salud según tu edad",
          description:
            "Recibe consejos específicos para tu etapa de vida y mantén tu bienestar en cada momento.",
          icon: <UsersIcon className="size-5" />,
          color: "bg-amber-500",
        };

      default:
        return {
          title: "Mejora tu experiencia con Essentia Premium",
          description:
            "Accede a todas las funciones avanzadas para gestionar tu salud de manera más eficiente.",
          icon: <Sparkles className="size-5 **:fill-white" />,
          color: "bg-yellow-500",
        };
    }
  };

  const featureContent = getFeatureContent();

  return (
    <Dialog
      open={isOpen}
      onOpenChange={() => {
        setIsOpen(false);
        setStep(mode === "trial" ? "trial" : "main");
      }}
    >
      <DialogContent
        isSecondary
        closeButtonClass="hover:bg-white/5! active:bg-white/10! text-white!"
      >
        <AnimatePresence mode="wait">
          {step === "trial" ? (
            <motion.div
              key="trial"
              initial={{ opacity: 1, x: 0 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.25 }}
            >
              <DialogHeader isSecondary className="p-1! text-start text-white">
                <div className="bg-premium rounded-xl p-5">
                  <div className="mb-2 flex items-center gap-2">
                    <Sparkles className="size-5 text-yellow-300 md:size-6" />
                    <DialogTitle className="text-base font-bold md:text-lg">
                      ¡Activa tu prueba gratuita!
                    </DialogTitle>
                  </div>
                  <DialogDescription className="text-white/90">
                    Disfruta 7 días de acceso Premium sin pagar ni ingresar
                    tarjeta.
                  </DialogDescription>
                </div>
              </DialogHeader>

              <div className="space-y-6 p-4 md:p-6">
                <ul className="text-foreground space-y-3 text-sm">
                  <li className="inline-flex gap-2">
                    <Brain className="size-4 shrink-0 text-indigo-500" />
                    Accede a recomendaciones personalizadas
                  </li>
                  <li className="flex items-center gap-2">
                    <BookmarkCheck className="size-4 shrink-0 text-indigo-500" />
                    Guarda y organiza tus planes de salud
                  </li>
                  <li className="flex items-center gap-2">
                    <MessagesSquare className="size-4 shrink-0 text-indigo-500" />
                    Interactúa con Aeris
                  </li>
                </ul>
                <p className="text-foreground/80 mt-3 text-center text-sm md:text-start">
                  Mira más detalles sobre los beneficios en nuestra{" "}
                  <Link
                    target="_blank"
                    rel="noopener"
                    href="/planes"
                    className="inline-flex items-center gap-x-1 font-semibold text-green-500"
                  >
                    página de planes y precios <LinkIcon />
                  </Link>
                </p>
              </div>

              <DialogFooter isSecondary>
                <div className="w-full space-y-3">
                  <Button
                    variant="gradient"
                    size="lg"
                    disabled={isLoading}
                    onClick={handleStartTrial}
                    className="relative w-full rounded-full duration-500 after:absolute after:inset-0 after:-z-1 after:size-full after:bg-gradient-to-r after:from-indigo-500 after:to-pink-500 after:opacity-0 after:blur-lg after:saturate-150 after:transition-all after:duration-500 after:content-[''] hover:after:opacity-80"
                  >
                    {isLoading ? (
                      <Loader className="size-4 animate-spin" />
                    ) : (
                      "Comenzar prueba gratuita"
                    )}
                  </Button>
                  <button
                    className="text-muted-foreground hover:text-foreground w-full text-center text-xs underline"
                    onClick={() => setStep("main")}
                  >
                    Quizás más tarde
                  </button>
                </div>
              </DialogFooter>
            </motion.div>
          ) : (
            <motion.div
              key="main"
              initial={
                mode === "trial" ? { opacity: 0, x: 20 } : { opacity: 1, x: 0 }
              }
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.25 }}
            >
              <DialogHeader isSecondary className="p-1! text-start text-white">
                <div
                  className={cn("bg-premium rounded-xl p-5", {
                    "bg-premium-plus":
                      featureType === "upgrade-plan" ||
                      selectedPlan === siteConfig.plan.premiumPlus,
                  })}
                >
                  <div className="mb-2 flex items-center gap-2">
                    <div
                      className={cn(
                        "flex size-8 shrink-0 items-center justify-center rounded-full text-white",
                        featureContent.color,
                      )}
                    >
                      {featureContent.icon}
                    </div>
                    <DialogTitle className="text-base font-bold md:text-lg">
                      {featureContent.title}
                    </DialogTitle>
                  </div>
                  <DialogDescription className="text-white/90">
                    {featureContent.description}
                  </DialogDescription>
                </div>
              </DialogHeader>
              <div className="p-4 md:p-6">
                <PlanSelector
                  onSelect={setSelectedPlan}
                  selectedPlanId={selectedPlan}
                  isUpgrade={featureType === "upgrade-plan"}
                />
              </div>
              <DialogFooter isSecondary>
                <div className="w-full space-y-3">
                  {isDowngrade && step === "main" && (
                    <p className="text-muted-foreground text-xs">
                      <strong className="text-secondary font-medium">
                        Importante:
                      </strong>{" "}
                      El nuevo plan seleccionado se activará automáticamente una
                      vez que termine tu plan actual (
                      <span className="font-medium">
                        {formatDate(
                          subscription?.subscription.expiresAt as Date,
                          "dd MMM yyyy",
                        )}
                      </span>
                      ).
                    </p>
                  )}
                  <UpgradeButton
                    size="lg"
                    variant="gradient"
                    disabled={
                      !selectedPlan || isLoading || selectedPlan === currentPlan
                    }
                    onClick={handleProceedToPayment}
                    className={cn(
                      "after:bg-premium relative w-full rounded-full duration-500 after:absolute after:inset-0 after:-z-1 after:size-full after:opacity-0 after:blur-lg after:saturate-150 after:transition-all after:duration-500 after:content-[''] hover:after:opacity-80",
                      {
                        "after:bg-premium-plus bg-premium-plus!":
                          featureType === "upgrade-plan" ||
                          selectedPlan === siteConfig.plan.premiumPlus,
                      },
                      shouldRotateIcon && "[&>svg]:rotate-180",
                      selectedPlan === currentPlan && "[&>svg]:hidden",
                    )}
                  >
                    {isLoading ? (
                      <Loader className="size-4 animate-spin" />
                    ) : selectedPlan === currentPlan ? (
                      "Plan Actual"
                    ) : (
                      <>
                        {actionLabel} {getPlanName(selectedPlan)}
                      </>
                    )}
                  </UpgradeButton>
                  {isTrialActive && (
                    <p className="text-muted-foreground text-center text-xs">
                      Actualmente tienes una prueba gratuita activa. Si mejoras
                      tu plan, perderás el acceso a esta prueba.
                    </p>
                  )}
                  {!isTrialActive && (
                    <p className="text-muted-foreground text-xxs text-center">
                      Al suscribirte, aceptas nuestros{" "}
                      <a href="#" className="underline">
                        Términos y Condiciones
                      </a>{" "}
                      y{" "}
                      <a href="#" className="underline">
                        Política de Privacidad
                      </a>
                    </p>
                  )}
                </div>
              </DialogFooter>
            </motion.div>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
};

export default PaymentModal;
