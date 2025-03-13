"use client";

import { Calendar } from "lucide-react";
import { useMemo } from "react";
import { Bar, BarChart, XAxis, YAxis } from "recharts";

import { Badge } from "@/components/kit/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/kit/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/kit/chart";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/kit/popover";
import { Progress } from "@/components/kit/progress";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/kit/tabs";
import { BetterTooltip } from "@/components/kit/tooltip";
import { QuestionIcon } from "@/components/ui/icons/miscellaneus";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";

import { HealthRisk } from "../../_lib/ai/tool-schemas";
import { getFormattedDate } from "../../_lib/utils";

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
    color: "var(--chart-1)",
  },
  heartDisease: {
    label: "Enfermedad cardíaca",
    color: "var(--chart-2)",
  },
  lungDisease: {
    label: "Enfermedad pulmonar",
    color: "var(--chart-3)",
  },
  kidneyDisease: {
    label: "Enfermedad renal",
    color: "var(--chart-4)",
  },
  hypertension: {
    label: "Hipertensión",
    color: "var(--chart-5)",
  },
} satisfies ChartConfig;

type SpecificHealthRisk = Omit<
  HealthRisk,
  | "generalRiskLevelPercentage"
  | "generalRiskLevel"
  | "bmi"
  | "bmiLevel"
  | "recommendations"
  | "assessmentDate"
>;

const HealthRiskDetails = (healthRisk: HealthRisk) => {
  const isMobile = useIsMobile();

  const getTotalRiskLevel = useMemo(
    () => (generalRiskLevel: string, generalRiskLevelPercentage: number) => {
      const riskLevels = [
        {
          condition:
            generalRiskLevel === "bajo" && generalRiskLevelPercentage <= 3,
          message: "¡Excelente! Sigue así. 😃",
          color: "text-emerald-400",
          strokeColor: "bg-emerald-400!",
        },
        {
          condition:
            generalRiskLevel === "bajo" &&
            generalRiskLevelPercentage > 3 &&
            generalRiskLevelPercentage <= 7,
          message: "¡Muy bien! Mantén esos hábitos saludables. 😊",
          color: "text-green-500",
          strokeColor: "bg-green-500!",
        },
        {
          condition:
            generalRiskLevel === "bajo" && generalRiskLevelPercentage > 7,
          message:
            "¡Generalmente estás bien! Aunque siempre puedes mejorar. 😊",
          color: "text-lime-500",
          strokeColor: "bg-lime-500!",
        },
        {
          condition:
            generalRiskLevel === "medio" &&
            generalRiskLevelPercentage > 10 &&
            generalRiskLevelPercentage <= 20,
          message:
            "Presta atención. Considera ajustes en tu estilo de vida. 😐",
          color: "text-yellow-500",
          strokeColor: "bg-yellow-500!",
        },
        {
          condition:
            generalRiskLevel === "medio" && generalRiskLevelPercentage > 20,
          message: "Precaución. Considera mejorar tus hábitos de salud. 😬",
          color: "text-orange-500",
          strokeColor: "bg-orange-500!",
        },
        {
          condition:
            generalRiskLevel === "alto" &&
            generalRiskLevelPercentage > 20 &&
            generalRiskLevelPercentage <= 50,
          message:
            "¡Ten cuidado! Es importante que consideres tomar medidas. 🥲",
          color: "text-red-500",
          strokeColor: "bg-red-500!",
        },
        {
          condition:
            generalRiskLevel === "alto" && generalRiskLevelPercentage > 50,
          message: "¡Alerta! Consulta a un profesional de salud. 🚨",
          color: "text-rose-600",
          strokeColor: "bg-rose-600!",
        },
      ];

      return (
        riskLevels.find((level) => level.condition) || {
          message: "No se ha podido evaluar el riesgo.",
          color: "text-slate-500",
          strokeColor: "stroke-slate-500",
        }
      );
    },
    [],
  );

  const riskInfo = useMemo(
    () =>
      getTotalRiskLevel(
        healthRisk.generalRiskLevel,
        healthRisk.generalRiskLevelPercentage,
      ),
    [
      healthRisk.generalRiskLevel,
      healthRisk.generalRiskLevelPercentage,
      getTotalRiskLevel,
    ],
  );

  const assessmentDate = useMemo(() => {
    return getFormattedDate(healthRisk.assessmentDate);
  }, [healthRisk.assessmentDate]);

  const CHART_DATA = useMemo(
    () => [
      {
        browser: "diabetes",
        level: healthRisk.diabetes.percentage,
        fill: CHART_CONFIG.diabetes.color,
      },
      {
        browser: "heartDisease",
        level: healthRisk.heartDisease.percentage,
        fill: CHART_CONFIG.heartDisease.color,
      },
      {
        browser: "lungDisease",
        level: healthRisk.lungDisease.percentage,
        fill: CHART_CONFIG.lungDisease.color,
      },
      {
        browser: "kidneyDisease",
        level: healthRisk.kidneyDisease.percentage,
        fill: CHART_CONFIG.kidneyDisease.color,
      },
      {
        browser: "hypertension",
        level: healthRisk.hypertension.percentage,
        fill: CHART_CONFIG.hypertension.color,
      },
    ],
    [
      healthRisk.diabetes.percentage,
      healthRisk.heartDisease.percentage,
      healthRisk.hypertension.percentage,
      healthRisk.kidneyDisease.percentage,
      healthRisk.lungDisease.percentage,
    ],
  );

  return (
    <div className="mt-0! w-full">
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
              <CardTitle className="text-foreground text-base">
                Evaluación de Riesgos de Salud
              </CardTitle>
              <CardDescription className="inline-flex items-center gap-1.5 text-xs">
                <Badge className="text-foreground/80 bg-accent h-6 gap-1.5 px-3 font-normal">
                  <Calendar className="text-muted-foreground size-3.5" />
                  {assessmentDate}
                </Badge>
              </CardDescription>
            </CardHeader>
            <CardContent className="p-3 pt-0 md:p-6 md:pt-0">
              <ChartContainer
                config={CHART_CONFIG}
                className="text-xxs w-full md:min-h-48 md:text-xs"
              >
                <BarChart
                  accessibilityLayer
                  data={CHART_DATA}
                  layout="vertical"
                  maxBarSize={36}
                  barCategoryGap={isMobile ? 5 : 10}
                  endAngle={30}
                >
                  <YAxis
                    dataKey="browser"
                    type="category"
                    width={84}
                    tickLine={false}
                    axisLine={false}
                    tickMargin={8}
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
                  <Bar dataKey="level" layout="vertical" radius={99} />
                </BarChart>
              </ChartContainer>
            </CardContent>
            <CardFooter className="justify-center">
              <div className="flex max-w-80 flex-col items-center space-y-4">
                <div className="inline-flex items-center gap-1">
                  <p className="text-foreground font-space-mono text-4xl font-extrabold">
                    {healthRisk.generalRiskLevelPercentage}
                  </p>
                  <span className="text-foreground/80 font-space-mono self-end text-lg">
                    %
                  </span>
                </div>
                <div className="inline-flex w-full items-center gap-2">
                  <Progress
                    value={healthRisk.generalRiskLevelPercentage}
                    indicatorColor={riskInfo.strokeColor}
                  />
                  {isMobile ? (
                    <Popover>
                      <PopoverTrigger asChild>
                        <span
                          aria-label="Ayuda"
                          className="bg-primary flex size-3 shrink-0 items-center justify-center rounded-full"
                        >
                          <QuestionIcon className="size-2 text-white" />
                        </span>
                      </PopoverTrigger>
                      <PopoverContent
                        side="top"
                        className="w-auto rounded-full px-2 py-1"
                      >
                        <p className="text-xs">Porcentaje de riesgo general</p>
                      </PopoverContent>
                    </Popover>
                  ) : (
                    <BetterTooltip content="Porcentaje de riesgo general">
                      <span
                        aria-label="Ayuda"
                        className="bg-primary flex size-3 items-center justify-center rounded-full"
                      >
                        <QuestionIcon className="size-2 text-white" />
                      </span>
                    </BetterTooltip>
                  )}
                </div>
                <div
                  className={cn(
                    "font-space-mono mt-2 text-lg font-bold md:text-xl",
                    riskInfo.color,
                  )}
                >
                  Nivel de riesgo{" "}
                  <span className="font-space-mono uppercase">
                    {healthRisk.generalRiskLevel}
                  </span>
                </div>
                <div className="text-center text-xs md:text-sm">
                  {riskInfo.message}
                </div>
              </div>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="interpretation" asChild>
          <Card>
            <CardContent className="prose-sm space-y-6 p-6">
              {RISK_KEYS.map(({ key, label }) => {
                const risk = healthRisk[key as keyof SpecificHealthRisk];

                return (
                  <div key={key}>
                    <h4 className="text-foreground text-xs font-semibold first:mt-0! md:text-sm">
                      {label}
                    </h4>
                    {"interpretation" in risk && risk.interpretation && (
                      <p className="text-foreground/80 text-xs last:mb-0! md:text-sm">
                        {risk.interpretation}
                      </p>
                    )}
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
                const risk = healthRisk[key as keyof SpecificHealthRisk];

                return (
                  <div key={key}>
                    <h4 className="text-foreground text-xs font-semibold first:mt-0! md:text-sm">
                      {label}
                    </h4>
                    {risk.recommendedActions && (
                      <p className="text-foreground/80 text-xs last:mb-0! md:text-sm">
                        {risk.recommendedActions}
                      </p>
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
