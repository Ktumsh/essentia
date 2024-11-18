"use client";

import {
  Badge,
  Button,
  Card,
  CardBody,
  CardHeader,
  Chip,
  Image as ImageUI,
  Divider,
} from "@nextui-org/react";
import Image from "next/image";
import { toast } from "sonner";

import { BetterTooltip } from "@/components/ui/tooltip";
import { DownloadIcon } from "@/modules/icons/action";
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
            <Chip
              size="sm"
              variant="bordered"
              color="danger"
              classNames={{
                base: "border-bittersweet-400/30 dark:border-cerise-red-600/30",
                content: "flex items-center justify-center gap-1",
              }}
            >
              <ClockIcon className="size-3" />
              <span className="text-xs">{mealTime}</span>
            </Chip>
          </BetterTooltip>
        </div>
        <Chip size="sm" variant="flat" className="bg-gray-100 dark:bg-dark/80">
          <MealIcon className="size-4 text-main-l dark:text-main-dark-l" />
        </Chip>
      </div>
      <ul className="space-y-3">
        {mealDetails.map((detail, index) => (
          <li
            key={index}
            className="flex flex-col justify-center gap-2 text-xs md:text-sm"
          >
            <Chip
              variant="dot"
              classNames={{
                base: "flex items-start md:items-center h-auto md:h-7 px-0 border-none text-wrap whitespace-wrap",
                dot: "ml-0 mt-1.5 md:mt-0 bg-black/10 dark:bg-white/10",
                content:
                  "text-md md:text-base font-semibold text-main-h dark:text-main-dark",
              }}
            >
              {detail.name}
            </Chip>
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
      <Divider className="bg-gray-200 dark:bg-dark" />
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
    <Card
      ref={ref}
      radius="md"
      shadow="none"
      className="group/card bg-white dark:bg-full-dark"
    >
      <CardHeader className="relative z-0 rounded-none p-0">
        <ImageUI
          as={Image}
          width={639}
          height={426}
          quality={100}
          src="/extras/meal-nutritional-plan-top.jpg"
          alt="Nutrition Plan Banner"
          radius="none"
          classNames={{
            wrapper: "h-36 md:h-[200px] overflow-hidden",
            img: "!h-auto object-cover object-top",
          }}
        />
        <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-b from-black/30 to-transparent to-70%"></div>
        <div className="absolute inset-x-0 top-0 z-10 flex w-full justify-between p-2 md:p-8">
          <Chip color="danger" className="shadow-md">
            Plan nutricional
          </Chip>
          <BetterTooltip content="Descargar como imagen">
            <Button
              isIconOnly
              size="sm"
              onPress={downloadImage}
              className="bg-black/10 text-white opacity-0 group-hover/card:opacity-100"
            >
              <DownloadIcon className="size-4" />
              <span className="sr-only">Descargar como Imagen</span>
            </Button>
          </BetterTooltip>
        </div>
      </CardHeader>
      <CardBody className="space-y-2 p-2 text-main-h dark:text-main-dark md:space-y-4 md:p-8">
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
          <Badge
            isOneChar
            color="danger"
            shape="circle"
            size="lg"
            content={<CaloriesIcon className="size-5 text-white" />}
            placement="top-right"
            classNames={{
              base: [
                "flex-col gap-1 w-fit p-3 text-sm bg-gradient-to-bl from-gray-200 to-white to-50% dark:from-dark dark:to-full-dark text-main-h dark:text-white rounded-xl",
                "before:content-[''] before:absolute before:inset-0.5 before:bg-white before:dark:bg-full-dark before:rounded-[10px] before:z-0",
              ],
              badge:
                "!size-7 top-[5%] right-[5%] border-white dark:border-full-dark",
            }}
          >
            <div className="z-[1] flex flex-col">
              <h3 className="text-main-h dark:text-main-dark">
                Total aproximado
              </h3>
              <p className="font-sans text-xl font-extrabold uppercase">
                {totalCalories} kcal
              </p>
            </div>
          </Badge>
        </div>
      </CardBody>
    </Card>
  );
};

export default NutritionPlanStock;
