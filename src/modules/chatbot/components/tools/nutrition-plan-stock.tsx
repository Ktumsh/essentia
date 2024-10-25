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

import TooltipCTN from "@/modules/core/components/ui/utils/tooltip-ctn";
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
      <div className="flex items-center justify-between w-full">
        <div className="inline-flex items-center gap-2">
          <h3 className="text-lg md:text-xl font-medium text-base-color dark:text-white capitalize">
            {mealType}
          </h3>
          <TooltipCTN content="Horario">
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
          </TooltipCTN>
        </div>
        <Chip
          size="sm"
          variant="flat"
          className="bg-gray-100 dark:bg-base-dark-80"
        >
          <MealIcon className="size-4 text-base-color-d dark:text-base-color-dark-d" />
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
                  "text-md md:text-base font-semibold text-base-color-h dark:text-base-color-dark",
              }}
            >
              {detail.name}
            </Chip>
            <div className="ml-3 inline-flex items-center gap-2 text-base-color-m dark:text-base-color-dark-m">
              <div className="inline-flex items-center gap-1">
                <TooltipCTN content="Cantidad">
                  <div aria-hidden="true">
                    <QuantityIcon className="size-3" />
                  </div>
                </TooltipCTN>
                <span>{detail.quantity}</span>
              </div>
              <div className="inline-flex items-center gap-1">
                <TooltipCTN content="Calorías">
                  <div aria-hidden="true">
                    <CaloriesIcon className="size-4" />
                  </div>
                </TooltipCTN>
                <span>{detail.calories}</span>
              </div>
            </div>
          </li>
        ))}
      </ul>
      <Divider className="bg-gray-200 dark:bg-base-dark" />
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
      className="group/card bg-white dark:bg-base-full-dark"
    >
      <CardHeader className="relative p-0 rounded-none z-0">
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
        <div className="z-10 pointer-events-none absolute inset-0 bg-gradient-to-b from-black/30 to-transparent to-70%"></div>
        <div className="z-10 absolute top-0 inset-x-0 w-full flex justify-between p-2 md:p-8">
          <Chip color="danger" className="shadow-md">
            Plan nutricional
          </Chip>
          <TooltipCTN content="Descargar como imagen">
            <Button
              isIconOnly
              size="sm"
              onPress={downloadImage}
              className="opacity-0 group-hover/card:opacity-100 bg-black/10 text-white"
            >
              <DownloadIcon className="size-4" />
              <span className="sr-only">Descargar como Imagen</span>
            </Button>
          </TooltipCTN>
        </div>
      </CardHeader>
      <CardBody className="p-2 md:p-8 space-y-2 md:space-y-4 text-base-color-h dark:text-base-color-dark">
        <div className="flex justify-center items-center flex-wrap gap-2">
          <div className="flex flex-col flex-1 p-3 text-xs md:text-sm bg-gray-100 dark:bg-base-dark text-base-color-h dark:text-white rounded-lg">
            <h3 className="font-extrabold font-sans uppercase">Proteínas</h3>
            <p className="dark:text-base-color-dark-h">
              {plan.macronutrients.proteins} g
            </p>
          </div>
          <div className="flex flex-col order-3 md:order-none flex-1 p-3 text-xs md:text-sm bg-gray-100 dark:bg-base-dark text-base-color-h dark:text-white rounded-lg">
            <h3 className="font-extrabold font-sans uppercase">
              Carbohidratos
            </h3>
            <p className="dark:text-base-color-dark-h">
              {plan.macronutrients.carbohydrates} g
            </p>
          </div>
          <div className="flex flex-col flex-1 p-3 text-xs md:text-sm bg-gray-100 dark:bg-base-dark text-base-color-h dark:text-white rounded-lg">
            <h3 className="font-extrabold font-sans uppercase">Grasas</h3>
            <p className="dark:text-base-color-dark-h">
              {plan.macronutrients.fats} g
            </p>
          </div>
        </div>
        {renderMealDetails(plan.breakfast, breakfast)}
        {renderMealDetails(plan.lunch, lunch)}
        {renderMealDetails(plan.snack, snack)}
        {renderMealDetails(plan.dinner, dinner)}
        {renderMealDetails(plan.additional, additional)}
        <div className="flex flex-col md:flex-row items-center justify-center gap-4">
          {plan.recommendations && (
            <div className="p-3 text-sm bg-gray-100 dark:bg-base-dark text-base-color-h dark:text-white rounded-lg">
              <h3 className="text-xl font-extrabold font-sans uppercase">
                Recomendaciones
              </h3>
              <p className="text-base-color-h dark:text-base-color-dark">
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
                "flex-col gap-1 w-fit p-3 text-sm bg-gradient-to-bl from-gray-200 to-white to-50% dark:from-base-dark dark:to-base-full-dark text-base-color-h dark:text-white rounded-xl",
                "before:content-[''] before:absolute before:inset-0.5 before:bg-white before:dark:bg-base-full-dark before:rounded-[10px] before:z-0",
              ],
              badge:
                "!size-7 top-[5%] right-[5%] border-white dark:border-base-full-dark",
            }}
          >
            <div className="flex flex-col z-[1]">
              <h3 className="text-base-color-h dark:text-base-color-dark">
                Total aproximado
              </h3>
              <p className="text-xl font-extrabold font-sans uppercase">
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
