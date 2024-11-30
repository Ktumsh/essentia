"use client";

import { Calendar } from "lucide-react";
import { useMemo } from "react";
import { Bar, BarChart, XAxis, YAxis } from "recharts";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BetterTooltip } from "@/components/ui/tooltip";
import { QuestionIcon } from "@/modules/icons/miscellaneus";
import { cn } from "@/utils/common";

import { RiskAssessment, RiskValue } from "./health-risk-stock";
import { getFormattedDate } from "../../lib/utils";

const RISK_KEYS = [
  {
    key: "diabetes",
    label: "Diabetes",
  },
  {
    key: "heartDisease",
    label: "Enfermedad cardíaca",
  },
  {
    key: "lungDisease",
    label: "Enfermedad pulmonar",
  },
  {
    key: "kidneyDisease",
    label: "Enfermedad renal",
  },
  {
    key: "hypertension",
    label: "Hipertensión",
  },
];

const CHART_CONFIG = {
  risk: {
    label: "Riesgo",
  },
  diabetes: {
    label: "Diabetes",
    color: "hsl(var(--chart-1))",
  },
  heartDisease: {
    label: "Enfermedad cardíaca",
    color: "hsl(var(--chart-2))",
  },
  lungDisease: {
    label: "Enfermedad pulmonar",
    color: "hsl(var(--chart-3))",
  },
  kidneyDisease: {
    label: "Enfermedad renal",
    color: "hsl(var(--chart-4))",
  },
  hypertension: {
    label: "Hipertensión",
    color: "hsl(var(--chart-5))",
  },
} satisfies ChartConfig;

const HealthRiskDetails = ({
  riskAssessment,
}: {
  riskAssessment: RiskAssessment;
}) => {
  const getTotalRiskLevel = useMemo(
    () => (generalRiskLevel: string, generalRiskLevelPercentage: number) => {
      const riskLevels = [
        {
          condition:
            generalRiskLevel === "bajo" && generalRiskLevelPercentage <= 3,
          message: "¡Excelente! Sigue así. 😃",
          color: "text-emerald-400",
          strokeColor: "!bg-emerald-400",
        },
        {
          condition:
            generalRiskLevel === "bajo" &&
            generalRiskLevelPercentage > 3 &&
            generalRiskLevelPercentage <= 7,
          message: "¡Muy bien! Mantén esos hábitos saludables. 😊",
          color: "text-green-500",
          strokeColor: "!bg-green-500",
        },
        {
          condition:
            generalRiskLevel === "bajo" && generalRiskLevelPercentage > 7,
          message:
            "¡Generalmente estás bien! Aunque siempre puedes mejorar. 😊",
          color: "text-lime-500",
          strokeColor: "!bg-lime-500",
        },
        {
          condition:
            generalRiskLevel === "medio" &&
            generalRiskLevelPercentage > 10 &&
            generalRiskLevelPercentage <= 20,
          message:
            "Presta atención. Considera ajustes en tu estilo de vida. 😐",
          color: "text-yellow-500",
          strokeColor: "!bg-yellow-500",
        },
        {
          condition:
            generalRiskLevel === "medio" && generalRiskLevelPercentage > 20,
          message: "Precaución. Considera mejorar tus hábitos de salud. 😬",
          color: "text-orange-500",
          strokeColor: "!bg-orange-500",
        },
        {
          condition:
            generalRiskLevel === "alto" &&
            generalRiskLevelPercentage > 20 &&
            generalRiskLevelPercentage <= 50,
          message:
            "¡Ten cuidado! Es importante que consideres tomar medidas. 🥲",
          color: "text-red-500",
          strokeColor: "!bg-red-500",
        },
        {
          condition:
            generalRiskLevel === "alto" && generalRiskLevelPercentage > 50,
          message: "¡Alerta! Consulta a un profesional de salud. 🚨",
          color: "text-rose-600",
          strokeColor: "!bg-rose-600",
        },
      ];

      return (
        riskLevels.find((level) => level.condition) || {
          message: "No se ha podido evaluar el riesgo.",
          color: "text-gray-500",
          strokeColor: "stroke-gray-500",
        }
      );
    },
    [],
  );

  const riskInfo = useMemo(
    () =>
      getTotalRiskLevel(
        riskAssessment.generalRiskLevel,
        riskAssessment.generalRiskLevelPercentage,
      ),
    [
      riskAssessment.generalRiskLevel,
      riskAssessment.generalRiskLevelPercentage,
      getTotalRiskLevel,
    ],
  );

  const assessmentDate = useMemo(() => {
    return getFormattedDate(riskAssessment.assessmentDate);
  }, [riskAssessment.assessmentDate]);

  const CHART_DATA = useMemo(
    () => [
      {
        browser: "diabetes",
        level: riskAssessment.diabetes.percentage,
        fill: CHART_CONFIG.diabetes.color,
      },
      {
        browser: "heartDisease",
        level: riskAssessment.heartDisease.percentage,
        fill: CHART_CONFIG.heartDisease.color,
      },
      {
        browser: "lungDisease",
        level: riskAssessment.lungDisease.percentage,
        fill: CHART_CONFIG.lungDisease.color,
      },
      {
        browser: "kidneyDisease",
        level: riskAssessment.kidneyDisease.percentage,
        fill: CHART_CONFIG.kidneyDisease.color,
      },
      {
        browser: "hypertension",
        level: riskAssessment.hypertension.percentage,
        fill: CHART_CONFIG.hypertension.color,
      },
    ],
    [
      riskAssessment.diabetes.percentage,
      riskAssessment.heartDisease.percentage,
      riskAssessment.hypertension.percentage,
      riskAssessment.kidneyDisease.percentage,
      riskAssessment.lungDisease.percentage,
    ],
  );

  return (
    <div className="!mt-0 w-full">
      <Tabs
        defaultValue="assessment"
        aria-label="Alternar entre interpretación y acciones recomendadas"
      >
        <TabsList>
          <TabsTrigger value="assessment">Evaluación</TabsTrigger>
          <TabsTrigger value="interpretation">Interpretación</TabsTrigger>
          <TabsTrigger value="actions">Acciones</TabsTrigger>
        </TabsList>
        <TabsContent value="assessment" asChild>
          <Card>
            <CardHeader className="items-center">
              <CardTitle className="text-base text-main dark:text-white">
                Evaluación de Riesgos de Salud
              </CardTitle>
              <CardDescription className="inline-flex items-center gap-1.5 text-xs">
                <Badge className="h-6 gap-1.5 bg-gray-100 px-3 font-normal text-main-h dark:bg-dark dark:text-main-dark">
                  <Calendar className="size-3.5 text-main-m dark:text-main-dark-m" />
                  {assessmentDate}
                </Badge>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={CHART_CONFIG} className="min-h-48 w-full">
                <BarChart
                  accessibilityLayer
                  data={CHART_DATA}
                  layout="vertical"
                  maxBarSize={36}
                  barCategoryGap={10}
                  endAngle={30}
                >
                  <YAxis
                    dataKey="browser"
                    type="category"
                    width={84}
                    tickLine={false}
                    axisLine={false}
                    tickMargin={10}
                    tickFormatter={(value) =>
                      CHART_CONFIG[value as keyof typeof CHART_CONFIG]?.label
                    }
                  />
                  <XAxis dataKey="level" type="number" hide />
                  <ChartTooltip
                    cursor={false}
                    content={
                      <ChartTooltipContent
                        labelKey="browser"
                        nameKey="risk"
                        indicator="line"
                        isPercentage
                      />
                    }
                  />
                  <Bar
                    dataKey="level"
                    layout="vertical"
                    radius={5}
                    fill="fill"
                  />
                </BarChart>
              </ChartContainer>
            </CardContent>
            <CardFooter className="justify-center">
              <div className="flex max-w-80 flex-col items-center space-y-4">
                <div className="inline-flex items-center gap-2">
                  <p className="font-sans text-4xl font-extrabold text-main dark:text-white">
                    {riskAssessment.generalRiskLevelPercentage}%
                  </p>
                  <BetterTooltip content="Porcentaje de riesgo general">
                    <span
                      aria-label="Ayuda"
                      className="flex size-3 items-center justify-center rounded-full bg-bittersweet-300 dark:bg-cerise-red-600"
                    >
                      <QuestionIcon className="size-2 text-white" />
                    </span>
                  </BetterTooltip>
                </div>
                <Progress
                  value={riskAssessment.generalRiskLevelPercentage}
                  indicatorColor={riskInfo.strokeColor}
                />
                <div className={cn("mt-2 text-xl font-bold", riskInfo.color)}>
                  Nivel de riesgo{" "}
                  <span className="uppercase">
                    {riskAssessment.generalRiskLevel}
                  </span>
                </div>
                <div className="text-center text-sm">{riskInfo.message}</div>
              </div>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="interpretation" asChild>
          <Card>
            <CardContent className="prose-sm space-y-6 p-6">
              {RISK_KEYS.map(({ key, label }) => {
                const risk = riskAssessment[
                  key as keyof RiskAssessment
                ] as RiskValue;
                return (
                  <div key={key}>
                    <h4 className="font-semibold text-main dark:text-white">
                      {label}
                    </h4>
                    {risk.interpretation && <p>{risk.interpretation}</p>}
                  </div>
                );
              })}
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="actions" asChild>
          <Card>
            <CardContent className="prose-sm space-y-6 p-6">
              {RISK_KEYS.map(({ key, label }) => {
                const risk = riskAssessment[
                  key as keyof RiskAssessment
                ] as RiskValue;
                return (
                  <div key={key}>
                    <h4 className="font-semibold text-main dark:text-white">
                      {label}
                    </h4>
                    {risk.recommendedActions && (
                      <p>{risk.recommendedActions}</p>
                    )}
                  </div>
                );
              })}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default HealthRiskDetails;
