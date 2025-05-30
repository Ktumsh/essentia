"use client";

import { Stars } from "lucide-react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useState } from "react";

import { SparklesButton } from "@/components/button-kit/sparkles-button";
import { Button } from "@/components/kit/button";
import PaymentModal from "@/components/ui/payment/payment-modal";
import { RECIPE_DATA } from "@/db/data/recipe-data";
import { SUGGESTED_ACTION_DATA } from "@/db/data/suggested-action-data";
import { useIsMobile } from "@/hooks/use-mobile";
import { useTrial } from "@/hooks/use-trial";
import { useUserProfile } from "@/hooks/use-user-profile";

import NutritionCarousel from "./nutrition-carousel";
import SectionTitle from "./section-title";

const Nutrition = () => {
  const router = useRouter();

  const { data: session } = useSession();
  const { user } = useUserProfile();

  const { isPremium } = user ?? {};

  const [isOpen, setIsOpen] = useState(false);

  const isMobile = useIsMobile();

  const { isTrialUsed } = useTrial();

  const searchTerm = SUGGESTED_ACTION_DATA[4].action;

  const onCreatePlan = () => {
    if (isPremium) {
      router.push(`/aeris?search=${encodeURIComponent(searchTerm)}`);
    } else {
      setIsOpen(true);
    }
  };

  return (
    <>
      <section className="col-[1/2] lg:col-[1/3]">
        <SectionTitle title="Recetas" hash="recetas">
          {!isMobile && session?.user && (
            <SparklesButton onClick={onCreatePlan}>
              Crea tu plan nutricional
            </SparklesButton>
          )}
        </SectionTitle>
        <section className="mb-16">
          {session?.user && (
            <Button
              fullWidth
              variant="premium"
              onClick={onCreatePlan}
              className="mb-4 h-14 rounded-xl text-lg md:hidden"
            >
              <Stars className="size-5! **:fill-white md:size-4!" />
              <span>Crea tu plan nutricional</span>
            </Button>
          )}
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
