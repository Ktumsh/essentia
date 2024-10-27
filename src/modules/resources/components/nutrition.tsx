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
    <div className="flex flex-1 space-x-8 ml-5 overflow-hidden">
      {Array.from({ length: width < 1024 ? 1 : 3 }).map((_, i) => (
        <div
          key={i}
          className="flex flex-col gap-4 w-full lg:w-[306.66px] h-96 p-5 rounded shrink-0 animate-pulse bg-gray-100 dark:bg-dark"
        >
          <div className="w-full h-64 shrink-0 animate-pulse bg-gray-200 dark:bg-full-dark"></div>
          <div className="w-4/5 h-4 rounded-full shrink-0 animate-pulse bg-gray-200 dark:bg-full-dark"></div>
          <div className="w-1/2 h-4 rounded-full shrink-0 animate-pulse bg-gray-200 dark:bg-full-dark"></div>
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
        <div className="w-full px-8 md:px-6 mb-8">
          <h3 className="drop-shadow-md text-main dark:text-white">
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
                <HashIcon className="size-5 ml-1 opacity-0 group-data-[hover=true]:opacity-100 transition-opacity" />
              }
              className="gap-0 text-xl w-fit p-0 bg-transparent h-auto data-[hover=true]:opacity-80 font-semibold data-[pressed=true]:scale-100"
            >
              <span className="px-2 mr-1 bg-orient-700 dark:bg-cerise-red-400 text-white dark:text-black">
                Recetas
              </span>
              Saludable
            </Button>
          </h3>
        </div>
        <section className="mb-24">
          <div className="flex flex-col px-8 md:px-3 space-y-3 mb-4 text-main dark:text-white">
            <h4 className="drop-shadow-md text-main dark:text-white">
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
                  <HashIcon className="size-4 ml-1 opacity-0 group-data-[hover=true]:opacity-100 transition-opacity" />
                }
                className="gap-0 text-lg w-fit p-0 bg-transparent h-auto data-[hover=true]:opacity-80 data-[pressed=true]:scale-100"
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
          <div className="flex flex-col px-8 md:px-3 space-y-3 mb-4 text-main dark:text-white">
            <h4 className="drop-shadow-md text-main dark:text-white">
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
                  <HashIcon className="size-4 ml-1 opacity-0 group-data-[hover=true]:opacity-100 transition-opacity" />
                }
                className="gap-0 text-lg w-fit p-0 bg-transparent h-auto data-[hover=true]:opacity-80 data-[pressed=true]:scale-100"
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
          <div className="flex flex-col px-8 md:px-3 space-y-3 mb-4 text-main dark:text-white">
            <h4 className="drop-shadow-md text-main dark:text-white">
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
                  <HashIcon className="size-4 ml-1 opacity-0 group-data-[hover=true]:opacity-100 transition-opacity" />
                }
                className="gap-0 text-lg w-fit p-0 bg-transparent h-auto data-[hover=true]:opacity-80 data-[pressed=true]:scale-100"
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
