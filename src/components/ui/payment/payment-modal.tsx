"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
  BookmarkCheck,
  Brain,
  Loader,
  MessagesSquare,
  Sparkles,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { toast } from "sonner";

import { UpgradeButton } from "@/components/button-kit/upgrade-button";
import { Button } from "@/components/kit/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/kit/dialog";
import { siteConfig } from "@/config/site.config";
import { startUserTrial } from "@/db/querys/user-querys";
import { usePlan } from "@/hooks/use-current-plan";
import { useIsTrialActive } from "@/hooks/use-is-trial-active";
import { useUserProfile } from "@/hooks/use-user-profile";
import { getClientIp, getPlanName, getPlanPrice } from "@/lib/utils";

import { createSubscription } from "./actions";
import { PlanSelector } from "./plan-selector";
import { LinkIcon } from "../icons/action";

export type FeatureType =
  | "ai-recommendations"
  | "saved-recommendations"
  | "chat"
  | "upload-limit"
  | "general";

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
  const { currentPlan } = usePlan();
  const [step, setStep] = useState<"main" | "trial">(
    mode === "trial" ? "trial" : "main",
  );

  const { user } = useUserProfile();

  const [selectedPlan, setSelectedPlan] = useState<string>(
    currentPlan === siteConfig.plan.free
      ? siteConfig.plan.premium
      : currentPlan || siteConfig.plan.free,
  );

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const isFree = selectedPlan === siteConfig.plan.free;

  const { isUsingTrial } = useIsTrialActive();

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
      const subscriptionResponse = await createSubscription({
        priceId: getPlanPrice(selectedPlan),
      });
      router.push(subscriptionResponse.checkoutUrl);
    } catch {
      toast.error("Hubo un error creando tu suscripción");
      setIsLoading(false);
    }
  }, [selectedPlan, currentPlan, router, isFree]);

  const handleStartTrial = async () => {
    try {
      setIsLoading(true);
      const ip = await getClientIp();

      if (user?.id) {
        await startUserTrial(user.id, ip);
        router.refresh();
        setIsOpen(false);
      }
      toast.success("Prueba gratuita activada");
      router.refresh();
      setIsOpen(false);
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
          icon: <Brain className="size-5 text-yellow-400 md:size-6" />,
        };
      case "saved-recommendations":
        return {
          title: "Desbloquea recomendaciones guardadas",
          description:
            "Guarda y gestiona todas tus recomendaciones personalizadas para acceder a ellas cuando las necesites.",
          icon: <BookmarkCheck className="size-5 text-yellow-400 md:size-6" />,
        };
      case "chat":
        return {
          title: "Desbloquea a Essentia AI",
          description:
            "Interactúa con nuestra inteligencia artificial para obtener respuestas rápidas, precisas y herramientas personalizadas para tu salud.",
          icon: <MessagesSquare className="size-5 text-yellow-400 md:size-6" />,
        };
      case "upload-limit":
        if (isUsingTrial) {
          return {
            title: "Límite alcanzado en tu prueba gratuita",
            description:
              "Tu prueba gratuita te da acceso a funciones Premium, pero permite subir hasta 6 archivos médicos. Mejora tu plan para ampliar este límite.",
            icon: <Sparkles className="size-5 text-yellow-400 md:size-6" />,
          };
        } else {
          return {
            title: "Aumenta tu límite de archivos",
            description:
              "Has alcanzado el máximo de documentos médicos permitidos por tu plan. Mejora para subir más archivos y disfrutar de todos los beneficios.",
            icon: <Sparkles className="size-5 text-yellow-400 md:size-6" />,
          };
        }
      default:
        return {
          title: "Mejora tu experiencia con Essentia Premium",
          description:
            "Accede a todas las funciones avanzadas para gestionar tu salud de manera más eficiente.",
          icon: <Sparkles className="size-5 text-yellow-400 md:size-6" />,
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
                <div className="rounded-[20px] bg-gradient-to-r from-indigo-500 to-pink-500 p-5">
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
                    Accede a Essentia AI con recomendaciones personalizadas
                  </li>
                  <li className="flex items-center gap-2">
                    <BookmarkCheck className="size-4 shrink-0 text-indigo-500" />
                    Guarda y organiza tus planes de salud
                  </li>
                  <li className="flex items-center gap-2">
                    <MessagesSquare className="size-4 shrink-0 text-indigo-500" />
                    Interactúa con IA sin límites
                  </li>
                </ul>
                <p className="text-foreground/80 mt-3 text-center text-sm md:text-start">
                  Mira más detalles sobre los beneficios en nuestra{" "}
                  <Link
                    target="_blank"
                    rel="noopener noreferrer"
                    href="/pricing"
                    className="inline-flex items-center gap-x-1 font-semibold text-green-500"
                  >
                    página de precios <LinkIcon />
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
                <div className="rounded-[20px] bg-gradient-to-r from-indigo-500 to-pink-500 p-5">
                  <div className="mb-2 flex items-center gap-2">
                    {featureContent.icon}
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
                />
              </div>
              <DialogFooter isSecondary>
                <div className="w-full space-y-3">
                  {isUsingTrial ? (
                    <>
                      <Button
                        size="lg"
                        disabled
                        className="w-full rounded-full bg-gradient-to-r from-indigo-500 to-pink-500 text-white"
                      >
                        Usando prueba gratuita de Premium
                      </Button>
                      <p className="text-muted-foreground mt-2 text-center text-xs">
                        Puedes mejorar a Premium una vez finalice tu prueba
                        gratuita. Durante este periodo, el límite de archivos es
                        de <strong>6 activos</strong>.
                      </p>
                    </>
                  ) : (
                    <UpgradeButton
                      size="lg"
                      variant="gradient"
                      disabled={
                        !selectedPlan ||
                        isLoading ||
                        selectedPlan === currentPlan
                      }
                      onClick={handleProceedToPayment}
                      className="relative w-full rounded-full duration-500 after:absolute after:inset-0 after:-z-1 after:size-full after:bg-gradient-to-r after:from-indigo-500 after:to-pink-500 after:opacity-0 after:blur-lg after:saturate-150 after:transition-all after:duration-500 after:content-[''] hover:after:opacity-80"
                    >
                      {isLoading ? (
                        <Loader className="size-4 animate-spin" />
                      ) : selectedPlan === currentPlan ? (
                        "Plan Actual"
                      ) : (
                        <>
                          {isFree ? "Degradar a" : "Mejorar a"}{" "}
                          {getPlanName(selectedPlan)}
                        </>
                      )}
                    </UpgradeButton>
                  )}
                  {!isUsingTrial && (
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
