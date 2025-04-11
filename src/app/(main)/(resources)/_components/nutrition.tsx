"use client";

import { Stars } from "lucide-react";
import { useRouter } from "next/navigation";

import { SparklesButton } from "@/components/button-kit/sparkles-button";
import { Button } from "@/components/kit/button";
import { INITIAL_CHAT_MESSAGES } from "@/consts/initial-chat-messages";
import { RECIPES } from "@/consts/recipes-data";
import { useIsMobile } from "@/hooks/use-mobile";

import CourseList from "./course-list";
import NutritionCarousel from "./nutrition-carousel";
import SectionTitle from "./section-title";

import type { Course } from "@/types/resource";

interface NutritionProps extends Course {
  isPremium?: boolean | null;
}

const Nutrition = (props: NutritionProps) => {
  const {
    userId,
    resource,
    modules,
    about,
    slug,
    completedLessons,
    moduleProgress,
    courseProgress,
    courseInitialized,
    isPremium,
  } = props;

  const router = useRouter();

  const isMobile = useIsMobile();

  const searchTerm = INITIAL_CHAT_MESSAGES[4].action;

  const onCreatePlan = () => {
    if (isPremium) {
      router.push(`/essentia-ai?search=${encodeURIComponent(searchTerm)}`);
    } else {
      router.push("/pricing");
    }
  };

  return (
    <>
      <CourseList
        userId={userId}
        resource={resource}
        modules={modules}
        about={about}
        slug={slug}
        completedLessons={completedLessons}
        moduleProgress={moduleProgress}
        courseProgress={courseProgress}
        courseInitialized={courseInitialized}
        isPremium={isPremium}
      />
      <section className="col-[1/2] lg:col-[1/3]">
        <SectionTitle title="Recetas" hash="recetas">
          {!isMobile && (
            <SparklesButton onClick={onCreatePlan}>
              Crea tu plan nutricional
            </SparklesButton>
          )}
        </SectionTitle>
        <section className="mb-16">
          <Button
            fullWidth
            variant="premium"
            onClick={onCreatePlan}
            className="mb-4 h-14 rounded-xl text-lg md:hidden"
          >
            <Stars className="size-5! **:fill-white md:size-4!" />
            <span>Crea tu plan nutricional</span>
          </Button>
          <SectionTitle
            title="Desayunos Saludables"
            hash="desayunos-saludables"
            className="[&_a]:font-poppins md:flex-col md:items-start md:gap-1 [&_a]:text-base [&_a]:font-semibold [&_a]:uppercase [&_svg]:size-4"
          >
            <p className="text-foreground/80 text-base">
              En Essentia te damos las mejores recetas de desayuno saludable
              para que comiences el día comiendo sano. Granola, batido de frutas
              o Yogurt con berries.
            </p>
          </SectionTitle>
          <NutritionCarousel data={RECIPES} startIndex={18} totalItems={15} />
        </section>
        <section className="mb-16">
          <SectionTitle
            title="Almuerzos y Cenas Saludables"
            hash="almuerzos-y-cenas-saludables"
            className="[&_a]:font-poppins md:flex-col md:items-start md:gap-1 [&_a]:text-base [&_a]:font-semibold [&_a]:uppercase [&_svg]:size-4"
          >
            <p className="text-foreground/80 text-base">
              Prepara tu almuerzo o cena de forma saludable con nuestras
              recetas. Tortilla de acelga, berenjena rellena o salmón a la
              plancha.
            </p>
          </SectionTitle>
          <NutritionCarousel data={RECIPES} startIndex={0} totalItems={18} />
        </section>
        <section className="mb-16">
          <SectionTitle
            title="Onces Saludables"
            hash="onces-saludables"
            className="[&_a]:font-poppins md:flex-col md:items-start md:gap-1 [&_a]:text-base [&_a]:font-semibold [&_a]:uppercase [&_svg]:size-4"
          >
            <p className="text-foreground/80 text-base">
              Prepara tu once saludable o la hora del té con alguna de estas
              recetas. Aprende a hacer pan integral, hamburguesas de lentejas o
              galletas de avena.
            </p>
          </SectionTitle>
          <NutritionCarousel data={RECIPES} startIndex={33} totalItems={15} />
        </section>
      </section>
    </>
  );
};

export default Nutrition;
