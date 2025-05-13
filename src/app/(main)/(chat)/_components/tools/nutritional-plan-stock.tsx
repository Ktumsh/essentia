"use client";

import {
  Clock,
  Coffee,
  Utensils,
  Apple,
  Moon,
  Plus,
  Leaf,
  Flame,
  Droplet,
  Wheat,
  Info,
} from "lucide-react";
import { useState } from "react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/kit/accordion";
import { Card } from "@/components/kit/card";
import { Progress } from "@/components/kit/progress";
import { ScrollArea } from "@/components/kit/scroll-area";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/kit/tabs";
import { CLOUDINARY_BASE_URL } from "@/lib/consts";
import { cn } from "@/lib/utils";

import StockFooter from "./stock-footer";
import StockHeader from "./stock-header";

import type { NutritionalPlan } from "../../_lib/tool-schemas";

const NutritionalPlanStock = (nutritionalPlan: NutritionalPlan) => {
  const [activeTab, setActiveTab] = useState("overview");

  const calculateMealCalories = (
    meals: NutritionalPlan["breakfast"],
  ): number => {
    if (!meals) return 0;
    return meals.reduce((total, meal) => total + meal.calories, 0);
  };

  return (
    <Card className="dark:shadow-alternative/15 dark:border-accent shadow-stock mb-8 w-full max-w-lg overflow-hidden rounded-3xl border-slate-100 transition-all duration-300">
      <StockHeader
        imageSrc={`${CLOUDINARY_BASE_URL}/tool/nutritional-plan`}
        title={nutritionalPlan.title ?? "Plan Alimenticio Personalizado"}
        label="Plan Nutricional"
        infoItems={[
          {
            icon: <Flame className="h-4 w-4" />,
            text: `${nutritionalPlan.totalCalories} calorías`,
          },
          {
            icon: <Leaf className="h-4 w-4" />,
            text: "Balance nutricional",
          },
        ]}
      />

      {/* Tabs Navigation */}
      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="w-full gap-0"
      >
        <div className="dark:border-accent border-b border-slate-100 px-3 md:px-6">
          <TabsList className="h-14 w-full bg-transparent md:justify-start md:gap-8">
            {["overview", "meals", "macros"].map((tab) => (
              <TabsTrigger
                key={tab}
                value={tab}
                className="flex-1 rounded-none border-b-2 border-transparent px-0 font-medium capitalize transition-all duration-200 data-[state=active]:border-red-500 data-[state=active]:text-red-500 data-[state=active]:shadow-none md:flex-0 dark:data-[state=active]:text-red-400"
              >
                {tab === "overview"
                  ? "Resumen"
                  : tab === "meals"
                    ? "Comidas"
                    : "Macros"}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>
        <TabsContent
          value="overview"
          className="mt-0 focus-visible:ring-0 focus-visible:outline-none"
        >
          <ScrollArea className="h-[400px]">
            <div className="space-y-5 p-3 md:p-6">
              {/* Calories Overview */}
              <div className="dark:bg-accent/50 hover:bg-accent! rounded-2xl bg-slate-50 p-4 transition-colors">
                <div className="mb-2 flex items-center justify-between">
                  <h3 className="text-foreground flex items-center gap-2 text-base font-semibold">
                    <Flame className="size-5 text-orange-500" />
                    Calorías Diarias
                  </h3>
                  <span className="text-lg font-semibold text-orange-500">
                    {nutritionalPlan.totalCalories} kcal
                  </span>
                </div>
                <div className="space-y-3">
                  {nutritionalPlan.breakfast && (
                    <MealCalorieBar
                      label="Desayuno"
                      calories={calculateMealCalories(
                        nutritionalPlan.breakfast,
                      )}
                      totalCalories={nutritionalPlan.totalCalories}
                      color="bg-amber-500"
                    />
                  )}
                  {nutritionalPlan.lunch && (
                    <MealCalorieBar
                      label="Almuerzo"
                      calories={calculateMealCalories(nutritionalPlan.lunch)}
                      totalCalories={nutritionalPlan.totalCalories}
                      color="bg-green-500"
                    />
                  )}
                  {nutritionalPlan.snack && (
                    <MealCalorieBar
                      label="Snack"
                      calories={calculateMealCalories(nutritionalPlan.snack)}
                      totalCalories={nutritionalPlan.totalCalories}
                      color="bg-red-500"
                    />
                  )}
                  {nutritionalPlan.dinner && (
                    <MealCalorieBar
                      label="Cena"
                      calories={calculateMealCalories(nutritionalPlan.dinner)}
                      totalCalories={nutritionalPlan.totalCalories}
                      color="bg-blue-500"
                    />
                  )}
                  {nutritionalPlan.additional && (
                    <MealCalorieBar
                      label="Adicional"
                      calories={calculateMealCalories(
                        nutritionalPlan.additional,
                      )}
                      totalCalories={nutritionalPlan.totalCalories}
                      color="bg-purple-500"
                    />
                  )}
                </div>
              </div>

              {/* Macronutrients Overview */}
              <div className="dark:bg-accent/50 rounded-2xl bg-slate-50 p-4">
                <h3 className="text-foreground mb-4 flex items-center gap-2 text-base font-semibold">
                  <Leaf className="size-5 text-green-500" />
                  Macronutrientes
                </h3>
                <div className="grid grid-cols-3 gap-2">
                  <MacronutrientCard
                    label="Proteínas"
                    value={nutritionalPlan.macronutrients.proteins}
                    icon={<Droplet className="h-4 w-4 text-blue-500" />}
                    color="bg-blue-100 dark:bg-blue-900/30"
                    textColor="text-blue-500"
                  />
                  <MacronutrientCard
                    label="Carbohidratos"
                    value={nutritionalPlan.macronutrients.carbohydrates}
                    icon={<Wheat className="h-4 w-4 text-amber-500" />}
                    color="bg-amber-100 dark:bg-amber-900/30"
                    textColor="text-amber-500"
                  />
                  <MacronutrientCard
                    label="Grasas"
                    value={nutritionalPlan.macronutrients.fats}
                    icon={<Flame className="h-4 w-4 text-orange-500" />}
                    color="bg-orange-100 dark:bg-orange-900/30"
                    textColor="text-orange-500"
                  />
                </div>
              </div>

              {/* Recommendations */}
              <div className="dark:bg-accent/50 rounded-2xl bg-slate-50 p-4">
                <h3 className="text-foreground mb-2 flex items-center gap-2 text-base font-semibold">
                  <Info className="size-5 text-blue-500" />
                  Recomendaciones
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {nutritionalPlan.recommendations}
                </p>
              </div>
            </div>
          </ScrollArea>
        </TabsContent>

        {/* Meals Tab */}
        <TabsContent
          value="meals"
          className="mt-0 focus-visible:ring-0 focus-visible:outline-none"
        >
          <ScrollArea className="h-[400px]">
            <div className="space-y-5 p-3 md:p-6">
              {nutritionalPlan.breakfast &&
                nutritionalPlan.breakfast.length > 0 && (
                  <MealSection
                    title="Desayuno"
                    meals={nutritionalPlan.breakfast}
                    icon={<Coffee className="size-5 text-amber-500" />}
                  />
                )}
              {nutritionalPlan.lunch && nutritionalPlan.lunch.length > 0 && (
                <MealSection
                  title="Almuerzo"
                  meals={nutritionalPlan.lunch}
                  icon={<Utensils className="size-5 text-green-500" />}
                />
              )}
              {nutritionalPlan.snack && nutritionalPlan.snack.length > 0 && (
                <MealSection
                  title="Snack"
                  meals={nutritionalPlan.snack}
                  icon={<Apple className="size-5 text-red-500" />}
                />
              )}
              {nutritionalPlan.dinner && nutritionalPlan.dinner.length > 0 && (
                <MealSection
                  title="Cena"
                  meals={nutritionalPlan.dinner}
                  icon={<Moon className="size-5 text-blue-500" />}
                />
              )}
              {nutritionalPlan.additional &&
                nutritionalPlan.additional.length > 0 && (
                  <MealSection
                    title="Adicional"
                    meals={nutritionalPlan.additional}
                    icon={<Plus className="size-5 text-purple-500" />}
                  />
                )}
            </div>
          </ScrollArea>
        </TabsContent>

        <TabsContent
          value="macros"
          className="mt-0 focus-visible:ring-0 focus-visible:outline-none"
        >
          <ScrollArea className="h-[400px]">
            <div className="space-y-5 p-3 md:p-6">
              <div className="dark:bg-accent/50 rounded-2xl bg-slate-50 p-4">
                <h3 className="text-foreground mb-4 text-base font-semibold">
                  Distribución de Macronutrientes
                </h3>
                <MacronutrientChart
                  proteins={nutritionalPlan.macronutrients.proteins}
                  carbs={nutritionalPlan.macronutrients.carbohydrates}
                  fats={nutritionalPlan.macronutrients.fats}
                />
              </div>
              <div className="dark:bg-accent/50 rounded-2xl bg-slate-50 p-4">
                <h3 className="text-foreground mb-4 text-base font-semibold">
                  Detalles de Macronutrientes
                </h3>
                <div className="space-y-4">
                  <MacronutrientDetail
                    label="Proteínas"
                    value={nutritionalPlan.macronutrients.proteins}
                    icon={<Droplet className="size-5 text-blue-500" />}
                    description="Las proteínas son esenciales para la construcción y reparación de tejidos, especialmente músculos."
                    color="text-blue-500"
                  />
                  <MacronutrientDetail
                    label="Carbohidratos"
                    value={nutritionalPlan.macronutrients.carbohydrates}
                    icon={<Wheat className="size-5 text-amber-500" />}
                    description="Los carbohidratos son la principal fuente de energía para el cuerpo y el cerebro."
                    color="text-amber-500"
                  />
                  <MacronutrientDetail
                    label="Grasas"
                    value={nutritionalPlan.macronutrients.fats}
                    icon={<Flame className="size-5 text-orange-500" />}
                    description="Las grasas son importantes para la absorción de vitaminas y la producción de hormonas."
                    color="text-orange-500"
                  />
                </div>
              </div>
              <div className="dark:bg-accent/50 rounded-2xl bg-slate-50 p-4">
                <h3 className="text-foreground mb-2 text-base font-semibold">
                  Cálculo de Calorías
                </h3>
                <div className="text-muted-foreground space-y-3 text-sm">
                  <p className="grid grid-cols-2">
                    <span className="text-foreground/80 font-medium">
                      Proteínas
                    </span>
                    <span className="text-end">
                      {nutritionalPlan.macronutrients.proteins} g × 4 kcal ={" "}
                      {nutritionalPlan.macronutrients.proteins * 4} kcal
                    </span>
                  </p>
                  <p className="grid grid-cols-2">
                    <span className="text-foreground/80 font-medium">
                      Carbohidratos
                    </span>
                    <span className="text-end">
                      {nutritionalPlan.macronutrients.carbohydrates} g × 4 kcal
                      = {nutritionalPlan.macronutrients.carbohydrates * 4} kcal
                    </span>
                  </p>
                  <p className="grid grid-cols-2">
                    <span className="text-foreground/80 font-medium">
                      Grasas
                    </span>
                    <span className="text-end">
                      {nutritionalPlan.macronutrients.fats} g × 9 kcal ={" "}
                      {nutritionalPlan.macronutrients.fats * 9} kcal
                    </span>
                  </p>
                  <div className="mt-2 border-t pt-2">
                    <p className="text-foreground/80 font-medium">
                      Total: {nutritionalPlan.totalCalories} kcal
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </ScrollArea>
        </TabsContent>
      </Tabs>
      <StockFooter />
    </Card>
  );
};

export default NutritionalPlanStock;

function MealCalorieBar({
  label,
  calories,
  totalCalories,
  color,
}: {
  label: string;
  calories: number;
  totalCalories: number | null;
  color: string;
}) {
  const safeTotalCalories = totalCalories ?? 0;
  const percentage =
    safeTotalCalories > 0 ? (calories / safeTotalCalories) * 100 : 0;

  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">
          {percentage.toFixed()}% {label}
        </span>
        <span className="text-foreground font-medium">{calories} kcal</span>
      </div>
      <Progress
        value={percentage}
        className="bg-background"
        indicatorColor={cn("rounded-full", color)}
      />
    </div>
  );
}

function MacronutrientCard({
  label,
  value,
  icon,
  color,
  textColor,
}: {
  label: string;
  value: number;
  icon: React.ReactNode;
  color: string;
  textColor: string;
}) {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl p-3 text-center">
      <div
        className={`h-10 w-10 rounded-full ${color} mb-2 flex items-center justify-center`}
      >
        {icon}
      </div>
      <span className={`text-lg font-semibold ${textColor}`}>{value}g</span>
      <span className="text-xs text-gray-500 dark:text-gray-400">{label}</span>
    </div>
  );
}

// Componente para mostrar una sección de comidas
function MealSection({
  title,
  meals,
  icon,
}: {
  title: string;
  meals: NutritionalPlan["breakfast"];
  icon: React.ReactNode;
}) {
  if (!meals || meals.length === 0) return null;

  return (
    <div className="space-y-3">
      <h3 className="text-foreground flex items-center gap-2 text-base font-semibold">
        {icon}
        {title}
      </h3>
      <Accordion type="single" collapsible className="space-y-2">
        {meals?.map((meal, index) => (
          <MealCard key={index} meal={meal} index={index} />
        ))}
      </Accordion>
    </div>
  );
}

function MealCard({
  meal,
  index,
}: {
  meal: Exclude<NutritionalPlan["breakfast"], null>[number];
  index: number;
}) {
  return (
    <AccordionItem
      value={`meal-${index}`}
      className="dark:data-[state=open]:bg-accent/50 dark:border-accent overflow-hidden rounded-2xl border! border-slate-100 data-[state=open]:bg-slate-50"
    >
      <AccordionTrigger className="flex p-4 hover:no-underline md:items-center">
        <div className="flex-1">
          <h4 className="mb-1 font-medium">{meal.name}</h4>
          <p className="text-muted-foreground text-xs">{meal.quantity}</p>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-sm font-medium">{meal.calories} kcal</span>
        </div>
      </AccordionTrigger>
      <AccordionContent className="px-4 pt-0 pb-4">
        <div className="text-muted-foreground flex items-center gap-2 text-xs">
          <Clock className="h-4 w-4" />
          <span>Horario sugerido: {meal.time}</span>
        </div>
      </AccordionContent>
    </AccordionItem>
  );
}

function MacronutrientChart({
  proteins,
  carbs,
  fats,
}: {
  proteins: number;
  carbs: number;
  fats: number;
}) {
  const total = proteins + carbs + fats;
  const proteinPercentage = Math.round((proteins / total) * 100);
  const carbsPercentage = Math.round((carbs / total) * 100);
  const fatsPercentage = Math.round((fats / total) * 100);

  return (
    <div className="space-y-4">
      <div className="flex h-6 w-full overflow-hidden rounded-full">
        <div
          className="flex h-full items-center justify-center bg-blue-500 text-xs font-medium text-white"
          style={{ width: `${proteinPercentage}%` }}
        >
          {proteinPercentage}%
        </div>
        <div
          className="flex h-full items-center justify-center bg-amber-500 text-xs font-medium text-white"
          style={{ width: `${carbsPercentage}%` }}
        >
          {carbsPercentage}%
        </div>
        <div
          className="flex h-full items-center justify-center bg-orange-500 text-xs font-medium text-white"
          style={{ width: `${fatsPercentage}%` }}
        >
          {fatsPercentage}%
        </div>
      </div>
      <div className="flex justify-between text-xs">
        <div className="flex items-center gap-1">
          <div className="h-3 w-3 rounded-full bg-blue-500"></div>
          <span className="text-muted-foreground">Proteínas</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="h-3 w-3 rounded-full bg-amber-500"></div>
          <span className="text-muted-foreground">Carbohidratos</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="h-3 w-3 rounded-full bg-orange-500"></div>
          <span className="text-muted-foreground">Grasas</span>
        </div>
      </div>
    </div>
  );
}

function MacronutrientDetail({
  label,
  value,
  icon,
  description,
  color,
}: {
  label: string;
  value: number;
  icon: React.ReactNode;
  description: string;
  color: string;
}) {
  return (
    <div className="flex gap-3">
      <div className={cn("mt-0.5", color)}>{icon}</div>
      <div>
        <div className="flex items-center gap-2">
          <h4 className="text-foreground font-medium">{label}</h4>
          <span className={cn("text-sm font-semibold", color)}>{value}g</span>
        </div>
        <p className="text-muted-foreground mt-1 text-xs">{description}</p>
      </div>
    </div>
  );
}
