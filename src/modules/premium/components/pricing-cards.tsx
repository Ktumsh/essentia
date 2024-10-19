"use client";

import { Session } from "@/types/session";
import PricingCard from "./pricing-card";
import PricingSelector from "./pricing-selector";
import { siteConfig } from "@/config/site";
import useWindowSize from "@/modules/core/hooks/use-window-size";

interface PricingCardsProps {
  session: Session;
  currentPriceId: string | null;
}

const PricingCards = ({ session, currentPriceId }: PricingCardsProps) => {
  const windowSize = useWindowSize();

  const getSubtitle = (priceId: string, defaultSubtitle: string) => {
    return currentPriceId === priceId ? "Actual" : defaultSubtitle;
  };

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-8 px-3 py-10 md:gap-12 md:py-20 lg:px-6 xl:px-0">
      <div className="grid justify-items-center gap-3 md:gap-4 z-10">
        <h1 className="text-center text-2xl font-semibold tracking-tight md:text-5xl">
          Precios
        </h1>
        <p className="max-w-md text-center text-sm text-base-color-h dark:text-base-color-dark-h md:max-w-[850px] md:text-base">
          Actualiza al plan Premium para obtener acceso a todas las
          funcionalidades de Essentia AI, diseñadas para brindarte una
          experiencia personalizada y ayudarte a alcanzar tus objetivos de
          bienestar, salud y fitness.
        </p>
      </div>
      <div className="w-full">
        {windowSize.width > 768 ? (
          <div className="hidden md:block">
            <div className="grid grid-cols-3 gap-4 lg:gap-6 xl:gap-12">
              <PricingCard
                session={session}
                title="Gratis"
                subtitle={getSubtitle(
                  siteConfig.planPrices.free,
                  "Predeterminado"
                )}
                description="Plan básico con acceso limitado a funcionalidades."
                buttonTitle="Escoger Gratis"
                priceId={siteConfig.planPrices.free}
                isCurrentPlan={currentPriceId === siteConfig.planPrices.free}
                price={0}
                features={[
                  "Recursos principales",
                  "Buscador de centros de salud",
                  "Recursos adicionales",
                  "Acceso a contenido educativo limitado",
                  "Recomendaciones básicas de salud",
                ]}
              />
              <PricingCard
                session={session}
                title="Premium"
                subtitle={getSubtitle(
                  siteConfig.planPrices.premium,
                  "Recomendado"
                )}
                description="Plan mensual que incluye acceso completo a todas las funcionalidades de Essentia AI."
                buttonTitle="Escoger Premium"
                priceId={siteConfig.planPrices.premium}
                isCurrentPlan={currentPriceId === siteConfig.planPrices.premium}
                price={9500}
                isRecommended
                features={[
                  "Todo lo del plan básico +",
                  "Acceso completo a Essentia AI",
                  "Seguimiento de chats",
                  "Interacción personalizada con la IA",
                  "Rutinas de ejercicio personalizadas",
                  "Planes nutricionales adaptados a tus necesidades",
                  "Evaluación detallada de tu nivel de riesgo de salud",
                  "Actividades diseñadas para mejorar tu bienestar",
                  "Recomendaciones personalizadas basadas en tus objetivos",
                ]}
              />
              <PricingCard
                session={session}
                title="Premium Plus"
                subtitle={getSubtitle(
                  siteConfig.planPrices.premiumPlus,
                  "Ahorra más"
                )}
                description="Plan anual con todas las funcionalidades de Essentia AI y algunos beneficios adicionales."
                buttonTitle="Escoger Premium Plus"
                priceId={siteConfig.planPrices.premiumPlus}
                isCurrentPlan={
                  currentPriceId === siteConfig.planPrices.premiumPlus
                }
                price={91200}
                isAnual
                features={[
                  "Todo lo del plan mensual +",
                  "Descuentos en futuras suscripciones",
                  "Prioridad en soporte",
                ]}
              />
            </div>
          </div>
        ) : (
          <div className="mx-auto w-full max-w-[450px] md:hidden">
            <PricingSelector
              session={session}
              currentPriceId={currentPriceId}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default PricingCards;
