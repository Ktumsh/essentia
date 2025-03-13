"use client";

import { Clock } from "lucide-react";
import Image from "next/image";
import { Fragment } from "react";
import { toast } from "sonner";

import { Badge } from "@/components/kit/badge";
import { Card, CardHeader } from "@/components/kit/card";
import { Separator } from "@/components/kit/separator";
import { BetterTooltip } from "@/components/kit/tooltip";
import {
  CaloriesIcon,
  MealIcon,
  QuantityIcon,
} from "@/components/ui/icons/miscellaneus";

import DownloadButton from "./download-button";
import { useDownloadTool } from "../../_hooks/use-download-tool";
import { NutritionalPlan } from "../../_lib/ai/tool-schemas";

const renderMealDetails = (
  mealDetails?: NutritionalPlan["breakfast"],
  mealType?: string,
) => {
  if (!mealType) return null;
  if (!mealDetails) return null;
  const mealTime = mealDetails[0].time;
  return (
    <>
      <div className="flex w-full items-center justify-between">
        <div className="ml-6 inline-flex items-center gap-2">
          <h3 className="text-foreground font-space-mono text-base font-semibold capitalize md:text-lg">
            {mealType}
          </h3>
          <BetterTooltip content="Horario">
            <Badge className="bg-background border-primary/30 text-primary! gap-1 border px-2">
              <Clock className="size-3" />
              <span className="text-xs">{mealTime}</span>
            </Badge>
          </BetterTooltip>
        </div>
        <Badge className="py-1">
          <MealIcon className="text-muted-foreground size-4" />
        </Badge>
      </div>
      <ul className="space-y-3">
        {mealDetails.map((detail, index) => (
          <li
            key={index}
            className="flex flex-col justify-center gap-2 text-xs md:text-sm"
          >
            <div className="mb-1 ml-1.5 inline-flex items-center gap-3 text-sm md:text-base">
              <span className="bg-primary size-1.5 rounded-full"></span>
              <span className="text-foreground font-semibold">
                {detail.name}
              </span>
            </div>
            <div className="text-muted-foreground ml-6 inline-flex items-center gap-2">
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
                <span>{detail.calories} kcal</span>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
};

const NutritionPlanStock = (nutritionalPlan: NutritionalPlan) => {
  const { ref, downloadImage } = useDownloadTool("nutrition-plan.png");

  const breakfast = nutritionalPlan.breakfast?.[0].type;
  const lunch = nutritionalPlan.lunch?.[0].type;
  const snack = nutritionalPlan.snack?.[0].type;
  const dinner = nutritionalPlan.dinner?.[0].type;
  const additional = nutritionalPlan.additional?.[0].type;

  if (!nutritionalPlan)
    return toast.error("Hubo un error al generar el plan de alimentación");

  const totalCalories = nutritionalPlan.totalCalories;

  const mealTypes: { details?: NutritionalPlan["breakfast"]; type?: string }[] =
    [
      { details: nutritionalPlan.breakfast, type: breakfast },
      { details: nutritionalPlan.lunch, type: lunch },
      { details: nutritionalPlan.snack, type: snack },
      { details: nutritionalPlan.dinner, type: dinner },
      { details: nutritionalPlan.additional, type: additional },
    ].filter((meal) => meal.details && meal.type);

  return (
    <Card ref={ref} className="group/card overflow-hidden rounded-xl">
      <CardHeader className="relative z-0 rounded-none p-0">
        <div className="h-36 overflow-hidden md:h-52">
          <Image
            width={696}
            height={208}
            quality={80}
            src="/extras/meal-nutritional-plan-top.jpg"
            alt="Nutrition Plan Banner"
            className="aspect-auto h-36 object-cover object-top md:h-52"
          />
        </div>
        <div className="absolute inset-x-0 top-0 z-10 flex w-full justify-between p-6">
          <Badge className="shadow-md">Plan nutricional</Badge>
          <DownloadButton downloadImage={downloadImage} />
        </div>
      </CardHeader>
      <div className="text-foreground/80 space-y-2 p-2 md:space-y-4 md:p-6">
        <div className="flex flex-wrap items-center justify-center gap-2">
          <div className="text-foreground/80 bg-accent flex flex-1 flex-col rounded-lg p-3 text-xs md:text-sm">
            <h3 className="font-space-mono text-foreground font-extrabold uppercase">
              Proteínas
            </h3>
            <p>{nutritionalPlan.macronutrients.proteins} g</p>
          </div>
          <div className="text-foreground/80 bg-accent order-3 flex flex-1 flex-col rounded-lg p-3 text-xs md:order-none md:text-sm">
            <h3 className="font-space-mono text-foreground font-extrabold uppercase">
              Carbohidratos
            </h3>
            <p>{nutritionalPlan.macronutrients.carbohydrates} g</p>
          </div>
          <div className="text-foreground/80 bg-accent flex flex-1 flex-col rounded-lg p-3 text-xs md:text-sm">
            <h3 className="font-space-mono text-foreground font-extrabold uppercase">
              Grasas
            </h3>
            <p>{nutritionalPlan.macronutrients.fats} g</p>
          </div>
        </div>
        {mealTypes.map((meal, index) => (
          <Fragment key={index}>
            {renderMealDetails(meal.details, meal.type)}
            {index < mealTypes.length - 1 && <Separator />}
          </Fragment>
        ))}
        <div className="flex flex-col items-center justify-center gap-4 md:flex-row">
          {nutritionalPlan.recommendations && (
            <div className="text-foreground/80 bg-accent rounded-lg p-3 text-xs md:text-sm">
              <h3 className="font-space-mono text-foreground text-base font-extrabold uppercase md:text-xl">
                Recomendaciones
              </h3>
              <p className="text-foreground/80">
                {nutritionalPlan.recommendations}
              </p>
            </div>
          )}
          <div className="flex flex-col gap-2">
            <div className="text-foreground/80 from-accent to-background before:bg-background relative inline-flex w-fit flex-col gap-1 rounded-xl bg-linear-to-bl to-50% p-3 text-sm before:absolute before:inset-0.5 before:z-0 before:rounded-[10px] before:content-['']">
              <span className="bg-primary border-background absolute -top-1.5 -right-1.5 flex size-6 items-center justify-center rounded-full">
                <CaloriesIcon className="size-5 text-white" />
              </span>
              <div className="z-10 flex flex-col">
                <h3 className="text-foreground/80 text-xs md:text-sm">
                  Total aproximado
                </h3>
                <span className="font-space-mono text-foreground text-xl font-extrabold text-nowrap uppercase">
                  {totalCalories} kcal
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default NutritionPlanStock;
