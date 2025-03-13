"use client";

import { useRouter } from "next/navigation";

import { Button } from "@/components/kit/button";
import { StarsIcon } from "@/components/ui/icons/common";
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
            <Button
              radius="full"
              size="sm"
              variant="gradient"
              onClick={onCreatePlan}
              className="before:bg-background relative z-0 transition! before:absolute before:inset-[2px] before:z-[-1] before:rounded-[14px] before:content-[''] hover:shadow-lg active:saturate-200"
            >
              <StarsIcon
                aria-hidden="true"
                className="stars-icon size-3.5 focus:outline-hidden"
              />
              <span className="from-gradient-from via-gradient-via to-gradient-to bg-gradient-to-r bg-clip-text text-sm font-bold text-transparent dark:from-[-100%]">
                Crea tu plan nutricional
              </span>
            </Button>
          )}
        </SectionTitle>
        <section className="mb-16">
          <Button
            fullWidth
            variant="gradient"
            onClick={onCreatePlan}
            className="before:bg-background relative z-0 mb-4 h-14 rounded-2xl transition! before:absolute before:inset-[2px] before:z-[-1] before:rounded-[14px] before:content-[''] active:shadow-lg active:saturate-200 md:hidden"
          >
            <StarsIcon
              aria-hidden="true"
              className="stars-icon size-5! focus:outline-hidden"
            />
            <span className="from-gradient-from via-gradient-via to-gradient-to bg-gradient-to-r bg-clip-text text-lg font-bold text-transparent dark:from-[-100%]">
              Crea tu plan nutricional
            </span>
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
