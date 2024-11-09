"use client";

import { Button } from "@nextui-org/react";
import dynamic from "next/dynamic";
import Link from "next/link";

import { NUTRITION_MODAL_DATA } from "@/consts/nutrition-modal";
import useWindowSize from "@/modules/core/hooks/use-window-size";
import { HashIcon } from "@/modules/icons/common";

import { useVisibilityObserver } from "../hooks/use-visibility-obs";

const Loading = () => {
  const windowSize = useWindowSize();
  const width = windowSize.width;
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

const Nutrition = () => {
  const secondCarousel = useVisibilityObserver();
  const thirdCarousel = useVisibilityObserver();

  return (
    <>
      <section className="-ml-3 py-4 md:py-0">
        <div className="mb-8 w-full px-8 md:px-6">
          <h3 className="text-main drop-shadow-md dark:text-white">
            <Button
              as={Link}
              id="recetas-saludables"
              data-id="recetas-saludables"
              data-name="Recetas Saludables"
              href="#recetas-saludables"
              disableRipple
              radius="none"
              variant="flat"
              endContent={
                <HashIcon className="ml-1 size-5 opacity-0 transition-opacity group-data-[hover=true]:opacity-100" />
              }
              className="h-auto w-fit gap-0 bg-transparent p-0 text-xl font-semibold data-[pressed=true]:scale-100 data-[hover=true]:opacity-80"
            >
              <span className="mr-1 bg-orient-700 px-2 text-white dark:bg-cerise-red-400 dark:text-black">
                Recetas
              </span>
              Saludable
            </Button>
          </h3>
        </div>
        <section className="mb-24">
          <div className="mb-4 flex flex-col space-y-3 px-8 text-main dark:text-white md:px-3">
            <h4 className="text-main drop-shadow-md dark:text-white">
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
                className="h-auto w-fit gap-0 bg-transparent p-0 text-lg data-[pressed=true]:scale-100 data-[hover=true]:opacity-80"
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
          <NutritionCarousel
            data={NUTRITION_MODAL_DATA}
            startIndex={18}
            totalItems={15}
          />
        </section>
        <section className="mb-24" ref={secondCarousel.ref}>
          <div className="mb-4 flex flex-col space-y-3 px-8 text-main dark:text-white md:px-3">
            <h4 className="text-main drop-shadow-md dark:text-white">
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
                className="h-auto w-fit gap-0 bg-transparent p-0 text-lg data-[pressed=true]:scale-100 data-[hover=true]:opacity-80"
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
            <NutritionCarousel
              data={NUTRITION_MODAL_DATA}
              startIndex={0}
              totalItems={18}
            />
          ) : (
            <Loading />
          )}
        </section>
        <section className="mb-24" ref={thirdCarousel.ref}>
          <div className="mb-4 flex flex-col space-y-3 px-8 text-main dark:text-white md:px-3">
            <h4 className="text-main drop-shadow-md dark:text-white">
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
                className="h-auto w-fit gap-0 bg-transparent p-0 text-lg data-[pressed=true]:scale-100 data-[hover=true]:opacity-80"
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
            <NutritionCarousel
              data={NUTRITION_MODAL_DATA}
              startIndex={33}
              totalItems={15}
            />
          ) : (
            <Loading />
          )}
        </section>
      </section>
    </>
  );
};

export default Nutrition;
