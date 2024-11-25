"use client";

import { ArrowDownToLine } from "lucide-react";
import Image from "next/image";
import { toast } from "sonner";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { BetterTooltip } from "@/components/ui/tooltip";
import {
  CaloriesIcon,
  MealIcon,
  QuantityIcon,
} from "@/modules/icons/miscellaneus";
import { ClockIcon } from "@/modules/icons/status";

import { useDownloadTool } from "../../hooks/use-download-tool";

export interface MealDetail {
  name: string;
  type: string;
  quantity: string;
  calories: number;
  time: string;
}

export interface Plan {
  breakfast?: MealDetail[];
  lunch?: MealDetail[];
  snack?: MealDetail[];
  dinner?: MealDetail[];
  additional?: MealDetail[];
  recommendations?: string;
  totalCalories?: number;
  macronutrients: {
    proteins: number;
    carbohydrates: number;
    fats: number;
  };
}

const renderMealDetails = (mealDetails?: MealDetail[], mealType?: string) => {
  if (!mealType) return null;
  if (!mealDetails) return null;
  const mealTime = mealDetails[0].time;
  return (
    <>
      <div className="flex w-full items-center justify-between">
        <div className="inline-flex items-center gap-2">
          <h3 className="text-lg font-medium capitalize text-main dark:text-white md:text-xl">
            {mealType}
          </h3>
          <BetterTooltip content="Horario">
            <Badge
              variant="secondary"
              className="gap-1 border border-danger/30 !text-danger"
            >
              <ClockIcon className="size-3" />
              <span className="text-xs">{mealTime}</span>
            </Badge>
          </BetterTooltip>
        </div>
        <Badge className="py-1">
          <MealIcon className="size-4 text-main-m dark:text-main-dark-m" />
        </Badge>
      </div>
      <ul className="space-y-3">
        {mealDetails.map((detail, index) => (
          <li
            key={index}
            className="flex flex-col justify-center gap-2 text-xs md:text-sm"
          >
            <Badge className="gap-2 !bg-transparent px-0 text-sm hover:!bg-inherit sm:text-base">
              <span className="size-2 rounded-full bg-black/10 dark:bg-white/10"></span>
              {detail.name}
            </Badge>
            <div className="ml-3 inline-flex items-center gap-2 text-main-m dark:text-main-dark-m">
              <div className="inline-flex items-center gap-1">
                <BetterTooltip content="Cantidad">
                  <div aria-hidden="true">
                    <QuantityIcon className="size-3" />
                  </div>
                </BetterTooltip>
                <span>{detail.quantity}</span>
              </div>
              <div className="inline-flex items-center gap-1">
                <BetterTooltip content="Calorías">
                  <div aria-hidden="true">
                    <CaloriesIcon className="size-4" />
                  </div>
                </BetterTooltip>
                <span>{detail.calories}</span>
              </div>
            </div>
          </li>
        ))}
      </ul>
      <Separator />
    </>
  );
};

const NutritionPlanStock = ({ props: plan }: { props: Plan }) => {
  const { ref, downloadImage } = useDownloadTool("nutrition-plan.png");

  const breakfast = plan?.breakfast?.[0]?.type;
  const lunch = plan?.lunch?.[0]?.type;
  const snack = plan?.snack?.[0]?.type;
  const dinner = plan?.dinner?.[0]?.type;
  const additional = plan?.additional?.[0]?.type;

  if (!plan)
    return toast.error("Hubo un error al generar el plan de alimentación");

  const totalCalories = plan.totalCalories;

  return (
    <Card ref={ref} className="group/card overflow-hidden rounded-xl">
      <CardHeader className="relative z-0 rounded-none p-0">
        <div className="h-52 overflow-hidden">
          <Image
            width={696}
            height={464}
            quality={100}
            src="/extras/meal-nutritional-plan-top.jpg"
            alt="Nutrition Plan Banner"
            className="aspect-auto object-cover object-top"
          />
        </div>
        <div className="absolute inset-x-0 top-0 z-10 flex w-full justify-between p-2 md:p-6">
          <Badge className="shadow-md">Plan nutricional</Badge>
          <BetterTooltip content="Descargar como imagen">
            <Button
              size="icon"
              onClick={downloadImage}
              className="absolute right-6 top-6 z-10 size-8 !bg-black/20 text-white opacity-0 shadow-none hover:!bg-black/30 active:bg-black/30 group-hover/card:opacity-100"
            >
              <ArrowDownToLine className="!size-3.5" />
              <span className="sr-only">Descargar como Imagen</span>
            </Button>
          </BetterTooltip>
        </div>
      </CardHeader>
      <div className="space-y-2 p-2 text-main-h dark:text-main-dark md:space-y-4 md:p-6">
        <div className="flex flex-wrap items-center justify-center gap-2">
          <div className="flex flex-1 flex-col rounded-lg bg-gray-100 p-3 text-xs text-main-h dark:bg-dark dark:text-white md:text-sm">
            <h3 className="font-sans font-extrabold uppercase">Proteínas</h3>
            <p className="dark:text-main-dark-h">
              {plan.macronutrients.proteins} g
            </p>
          </div>
          <div className="order-3 flex flex-1 flex-col rounded-lg bg-gray-100 p-3 text-xs text-main-h dark:bg-dark dark:text-white md:order-none md:text-sm">
            <h3 className="font-sans font-extrabold uppercase">
              Carbohidratos
            </h3>
            <p className="dark:text-main-dark-h">
              {plan.macronutrients.carbohydrates} g
            </p>
          </div>
          <div className="flex flex-1 flex-col rounded-lg bg-gray-100 p-3 text-xs text-main-h dark:bg-dark dark:text-white md:text-sm">
            <h3 className="font-sans font-extrabold uppercase">Grasas</h3>
            <p className="dark:text-main-dark-h">
              {plan.macronutrients.fats} g
            </p>
          </div>
        </div>
        {renderMealDetails(plan.breakfast, breakfast)}
        {renderMealDetails(plan.lunch, lunch)}
        {renderMealDetails(plan.snack, snack)}
        {renderMealDetails(plan.dinner, dinner)}
        {renderMealDetails(plan.additional, additional)}
        <div className="flex flex-col items-center justify-center gap-4 md:flex-row">
          {plan.recommendations && (
            <div className="rounded-lg bg-gray-100 p-3 text-sm text-main-h dark:bg-dark dark:text-white">
              <h3 className="font-sans text-xl font-extrabold uppercase">
                Recomendaciones
              </h3>
              <p className="text-main-h dark:text-main-dark">
                {plan.recommendations}
              </p>
            </div>
          )}
          <div className="flex flex-col gap-2">
            <div className="relative inline-flex w-fit flex-col gap-1 rounded-xl bg-gradient-to-bl from-gray-200 to-white to-50% p-3 text-sm text-main-h before:absolute before:inset-0.5 before:z-0 before:rounded-[10px] before:bg-white before:content-[''] dark:from-dark dark:to-full-dark dark:text-white before:dark:bg-full-dark">
              <span className="absolute -right-1.5 -top-1.5 flex size-6 items-center justify-center rounded-full border-white bg-danger dark:border-full-dark">
                <CaloriesIcon className="size-5 text-white" />
              </span>
              <div className="z-10 flex flex-col">
                <h3 className="text-main-h dark:text-main-dark">
                  Total aproximado
                </h3>
                <BetterTooltip content="Calorías">
                  <span className="text-nowrap font-sans text-xl font-extrabold uppercase">
                    {totalCalories} kcal
                  </span>
                </BetterTooltip>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default NutritionPlanStock;
