"use client";

import { Select, SelectItem, Selection } from "@nextui-org/react";
import { useState } from "react";
import PricingCard from "./pricing-card";
import { Session } from "@/types/session";
import { siteConfig } from "@/config/site";

interface PricingSelectorProps {
  session: Session;
  currentPriceId: string | null;
}

const PricingSelector = ({ session, currentPriceId }: PricingSelectorProps) => {
  const [value, setValue] = useState<Selection>(new Set(["basic_plan"]));

  return (
    <>
      <div className="mb-4">
        <Select
          aria-label="Selecciona un plan"
          disallowEmptySelection
          selectedKeys={value}
          onSelectionChange={setValue}
          classNames={{
            trigger:
              "bg-white dark:bg-base-full-dark rounded-md border border-gray-300 dark:border-[#123a6f]",
            popoverContent:
              "rounded-md bg-white dark:bg-base-full-dark border border-gray-300 dark:border-[#123a6f] shadow-md",
            listbox: "p-0",
          }}
        >
          <SelectItem
            key="basic_plan"
            textValue="Gratis"
            className="data-[selected=true]:bg-gray-200 dark:data-[selected=true]:bg-base-dark data-[selectable=true]:focus:bg-gray-200 dark:data-[selectable=true]:focus:bg-base-dark rounded"
          >
            <div className="flex items-center gap-2">
              <span>Gratis</span>
              <span className="text-xs font-medium text-base-color-m dark:text-base-color-dark-m">
                Plan Actual
              </span>
            </div>
          </SelectItem>
          <SelectItem
            key="premium_plan"
            textValue="Premium"
            className="data-[selected=true]:bg-gray-200 dark:data-[selected=true]:bg-base-dark data-[selectable=true]:focus:bg-gray-200 dark:data-[selectable=true]:focus:bg-base-dark rounded"
          >
            <div className="flex items-center gap-2">
              <span>Premium</span>
              <span className="text-xs font-medium text-base-color-m dark:text-base-color-dark-m">
                Recomendado
              </span>
            </div>
          </SelectItem>
          <SelectItem
            key="premium_plus_plan"
            textValue="Premium Plus"
            className="data-[selected=true]:bg-gray-200 dark:data-[selected=true]:bg-base-dark data-[selectable=true]:focus:bg-gray-200 dark:data-[selectable=true]:focus:bg-base-dark rounded"
          >
            <div className="flex items-center gap-2">
              <span>Premium Plus</span>
              <span className="text-xs font-medium text-base-color-m dark:text-base-color-dark-m">
                Ahorra más
              </span>
            </div>
          </SelectItem>
        </Select>
      </div>
      {Array.from(value)[0] === "basic_plan" ? (
        <PricingCard
          session={session}
          title="Gratis"
          subtitle="Actual"
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
      ) : Array.from(value)[0] === "premium_plan" ? (
        <PricingCard
          session={session}
          title="Premium"
          subtitle="Recomendado"
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
      ) : (
        <PricingCard
          session={session}
          title="Premium Plus"
          subtitle="Ahorra más"
          description="Plan anual con todas las funcionalidades de Essentia AI y algunos beneficios adicionales."
          buttonTitle="Escoger Premium Plus"
          priceId={siteConfig.planPrices.premiumPlus}
          isCurrentPlan={currentPriceId === siteConfig.planPrices.premiumPlus}
          price={91200}
          isAnual
          features={[
            "Todo lo del plan mensual +",
            "Descuentos en futuras suscripciones",
            "Prioridad en soporte",
          ]}
        />
      )}
    </>
  );
};

export default PricingSelector;
