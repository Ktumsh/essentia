"use client";

import { Button } from "@nextui-org/react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { INITIAL_CHAT_MESSAGES } from "@/consts/initial-chat-messages";
import { RECIPES } from "@/consts/recipes-data";
import useWindowSize from "@/modules/core/hooks/use-window-size";
import { HashIcon, StarsIcon } from "@/modules/icons/common";

import { useVisibilityObserver } from "../hooks/use-visibility-obs";

const Loading = () => {
  const windowSize = useWindowSize();
  const { width } = windowSize;

  return (
    <div className="ml-5 flex flex-1 space-x-8 overflow-hidden">
      {Array.from({ length: width < 1024 ? 1 : 3 }).map((_, i) => (
        <div
          key={i}
          className="flex h-96 w-full shrink-0 animate-pulse flex-col gap-4 rounded bg-gray-100 p-5 dark:bg-dark lg:w-[306.66px]"
        >
          <div className="h-64 w-full shrink-0 animate-pulse bg-gray-200 dark:bg-full-dark"></div>
          <div className="h-4 w-4/5 shrink-0 animate-pulse rounded-full bg-gray-200 dark:bg-full-dark"></div>
          <div className="h-4 w-1/2 shrink-0 animate-pulse rounded-full bg-gray-200 dark:bg-full-dark"></div>
        </div>
      ))}
    </div>
  );
};

const NutritionCarousel = dynamic(() => import("./nutrition-carousel"), {
  loading: () => <Loading />,
  ssr: false,
});

interface NutritionProps {
  isPremium?: boolean | null;
}

const Nutrition = ({ isPremium }: NutritionProps) => {
  const router = useRouter();
  const secondCarousel = useVisibilityObserver();
  const thirdCarousel = useVisibilityObserver();

  const windowSize = useWindowSize();
  const { width } = windowSize;

  const searchTerm = INITIAL_CHAT_MESSAGES[4].action;

  const onCreatePlan = () => {
    if (isPremium) {
      router.push(`/essentia-ai?search=${encodeURIComponent(searchTerm)}`);
    } else {
      router.push("/premium");
    }
  };

  return (
    <>
      <section className="px-6 py-4 lg:p-0">
        <div className="relative flex w-full select-none justify-between">
          <h3 className="text-main-h dark:text-main-dark">
            <Link
              id="recetas"
              data-id="recetas"
              data-name="Recetas"
              href="#recetas"
              className="group mb-2 ml-3 inline-flex h-auto w-fit items-center gap-0 bg-transparent p-0 px-2 text-xl font-semibold tracking-tight transition hover:opacity-80 lg:px-0"
            >
              Recetas
              <HashIcon className="ml-1 size-5 opacity-0 transition-opacity group-hover:opacity-100" />
            </Link>
          </h3>
          {width > 768 && (
            <Button
              radius="full"
              size="sm"
              onPress={onCreatePlan}
              startContent={
                <StarsIcon
                  aria-hidden="true"
                  className="stars-icon size-3.5 focus:outline-none"
                />
              }
              className="absolute right-0 top-0 shrink-0 bg-light-gradient-v2 !transition before:absolute before:inset-[2px] before:z-[-1] before:rounded-full before:bg-white before:content-[''] data-[hover=true]:shadow-lg data-[hover=true]:saturate-200 dark:bg-dark-gradient-v2 before:dark:bg-full-dark"
            >
              <span className="bg-light-gradient-v2 bg-clip-text font-sans font-extrabold text-transparent dark:bg-dark-gradient-v2">
                Crea tu plan nutricional
              </span>
            </Button>
          )}
        </div>
        <section className="mb-16">
          <div className="mb-4 flex flex-col space-y-1 text-main dark:text-white">
            <h4 className="text-main dark:text-white">
              <Button
                as={Link}
                id="desayunos-saludables"
                data-id="desayunos-saludables"
                data-name="Desayunos Saludables"
                href="#desayunos-saludables"
                disableRipple
                radius="none"
                variant="flat"
                endContent={
                  <HashIcon className="ml-1 size-4 opacity-0 transition-opacity group-data-[hover=true]:opacity-100" />
                }
                className="h-auto w-fit gap-0 bg-transparent p-0 text-sm font-semibold uppercase data-[pressed=true]:scale-100 data-[hover=true]:opacity-80"
              >
                Desayunos Saludables
              </Button>
            </h4>
            <p className="text-sm text-main-h dark:text-main-dark">
              En Essentia te damos las mejores recetas de desayuno saludable
              para que comiences el día comiendo sano. Granola, batido de frutas
              o Yogurt con berries.
            </p>
          </div>
          <NutritionCarousel data={RECIPES} startIndex={18} totalItems={15} />
        </section>
        <section className="mb-16" ref={secondCarousel.ref}>
          <div className="mb-4 flex flex-col space-y-1 text-main dark:text-white">
            <h4 className="text-main dark:text-white">
              <Button
                as={Link}
                id="almuerzos-y-cenas-saludables"
                data-id="almuerzos-y-cenas-saludables"
                data-name="Almuerzos y Cenas Saludables"
                href="#almuerzos-y-cenas-saludables"
                disableRipple
                radius="none"
                variant="flat"
                endContent={
                  <HashIcon className="ml-1 size-4 opacity-0 transition-opacity group-data-[hover=true]:opacity-100" />
                }
                className="h-auto w-fit gap-0 bg-transparent p-0 text-sm font-semibold uppercase data-[pressed=true]:scale-100 data-[hover=true]:opacity-80"
              >
                Almuerzos y Cenas Saludables
              </Button>
            </h4>
            <p className="text-sm text-main-h dark:text-main-dark">
              Prepara tu almuerzo o cena de forma saludable con nuestras
              recetas. Tortilla de acelga, berenjena rellena o salmón a la
              plancha.
            </p>
          </div>
          {secondCarousel.isVisible ? (
            <NutritionCarousel data={RECIPES} startIndex={0} totalItems={18} />
          ) : (
            <Loading />
          )}
        </section>
        <section className="mb-16" ref={thirdCarousel.ref}>
          <div className="mb-4 flex flex-col space-y-1 text-main dark:text-white">
            <h4 className="text-main dark:text-white">
              <Button
                as={Link}
                id="onces-saludables"
                data-id="onces-saludables"
                data-name="Onces Saludables"
                href="#onces-saludables"
                disableRipple
                radius="none"
                variant="flat"
                endContent={
                  <HashIcon className="ml-1 size-4 opacity-0 transition-opacity group-data-[hover=true]:opacity-100" />
                }
                className="h-auto w-fit gap-0 bg-transparent p-0 text-sm font-semibold uppercase data-[pressed=true]:scale-100 data-[hover=true]:opacity-80"
              >
                Onces Saludables
              </Button>
            </h4>
            <p className="text-sm text-main-h dark:text-main-dark">
              Prepara tu once saludable o la hora del té con alguna de estas
              recetas. Aprende a hacer pan integral, hamburguesas de lentejas o
              galletas de avena.
            </p>
          </div>
          {thirdCarousel.isVisible ? (
            <NutritionCarousel data={RECIPES} startIndex={33} totalItems={15} />
          ) : (
            <Loading />
          )}
        </section>
      </section>
    </>
  );
};

export default Nutrition;
