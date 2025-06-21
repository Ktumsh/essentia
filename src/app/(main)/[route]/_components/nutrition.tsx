"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";
import { useState } from "react";

import PaymentModal from "@/app/payment/_components/payment-modal";
import { LinkIcon } from "@/components/icons/action";
import { RECIPE_DATA } from "@/db/data/recipe-data";
import { SUGGESTED_ACTION_DATA } from "@/db/data/suggested-action-data";
import { useTrial } from "@/hooks/use-trial";

import AerisSection from "./aeris-section";
import NutritionCarousel from "./nutrition-carousel";
import SectionTitle from "./section-title";

const Nutrition = () => {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const { isTrialUsed } = useTrial();

  const defaultPrompt = SUGGESTED_ACTION_DATA[4].action;

  return (
    <>
      <section className="col-[1/2] lg:col-[1/3]">
        {/* SECCIÓN DE PLAN NUTRICIONAL */}
        <AerisSection
          route="Nutrición y alimentación"
          title="Crea tu plan nutricional"
          hash="plan-nutricional"
          description={
            <>
              ¿Quieres una alimentación más saludable?{" "}
              <Link
                href="/soporte?q=quien%20es%20aeris"
                target="_blank"
                rel="noopener"
                className="text-secondary hover:underline"
              >
                Aeris
                <LinkIcon className="mb-1 ml-0.5 inline size-2" />
              </Link>{" "}
              puede ayudarte a crear un plan nutricional adaptado a tus
              objetivos, estilo de vida y preferencias alimentarias.
            </>
          }
          suggestions={[
            "Qué objetivo tienes (subir/bajar de peso, mantenerte)",
            "Si tienes alguna alergia o restricción alimentaria",
            "Cuántas comidas al día prefieres",
            "Si buscas algo vegano, bajo en carbohidratos, etc.",
          ]}
          placeholder="Ej: Quiero un plan para bajar de peso, con 3 comidas al día, sin gluten ni lácteos."
          defaultPrompt={defaultPrompt}
          featureType="nutritional-plan"
          ctaLabel="Crear plan nutricional"
        />

        {/* SECCIÓN DE RECETAS */}
        <SectionTitle title="Recetas" hash="recetas" />

        <section className="mb-16">
          <SectionTitle
            title="Desayunos Saludables"
            hash="desayunos-saludables"
            className="[&_a]:font-poppins md:flex-col md:items-start md:gap-1 [&_a]:text-base [&_a]:font-semibold [&_a]:uppercase [&_svg]:size-4"
          >
            <p className="text-foreground/80 text-sm md:text-base">
              En Essentia te damos las mejores recetas de desayuno saludable
              para que comiences el día comiendo sano. Granola, batido de frutas
              o Yogurt con berries.
            </p>
          </SectionTitle>
          <NutritionCarousel
            data={RECIPE_DATA}
            startIndex={18}
            totalItems={15}
          />
        </section>

        <section className="mb-16">
          <SectionTitle
            title="Almuerzos y Cenas Saludables"
            hash="almuerzos-y-cenas-saludables"
            className="[&_a]:font-poppins md:flex-col md:items-start md:gap-1 [&_a]:text-base [&_a]:font-semibold [&_a]:uppercase [&_svg]:size-4"
          >
            <p className="text-foreground/80 text-sm md:text-base">
              Prepara tu almuerzo o cena de forma saludable con nuestras
              recetas. Tortilla de acelga, berenjena rellena o salmón a la
              plancha.
            </p>
          </SectionTitle>
          <NutritionCarousel
            data={RECIPE_DATA}
            startIndex={0}
            totalItems={18}
          />
        </section>

        <section className="mb-16">
          <SectionTitle
            title="Onces Saludables"
            hash="onces-saludables"
            className="[&_a]:font-poppins md:flex-col md:items-start md:gap-1 [&_a]:text-base [&_a]:font-semibold [&_a]:uppercase [&_svg]:size-4"
          >
            <p className="text-foreground/80 text-sm md:text-base">
              Prepara tu once saludable o la hora del té con alguna de estas
              recetas. Aprende a hacer pan integral, hamburguesas de lentejas o
              galletas de avena.
            </p>
          </SectionTitle>
          <NutritionCarousel
            data={RECIPE_DATA}
            startIndex={33}
            totalItems={15}
          />
        </section>
      </section>

      {session?.user && (
        <PaymentModal
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          featureType="nutritional-plan"
          mode={!isTrialUsed ? "trial" : "upgrade"}
        />
      )}
    </>
  );
};

export default Nutrition;
