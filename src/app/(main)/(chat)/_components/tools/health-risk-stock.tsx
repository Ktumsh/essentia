"use client";

import {
  Heart,
  Droplet,
  TreesIcon as Lungs,
  Pill,
  Activity,
  Info,
  AlertTriangle,
  Scale,
  Calendar,
  ArrowRight,
  ChevronDown,
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
import { capitalize, formatDate } from "@/utils/format";

import StockFooter from "./stock-footer";
import StockHeader from "./stock-header";
import {
  getRiskBgColor,
  getRiskColor,
  getRiskColorByPercentage,
  getRiskLevelBadgeColor,
  getRiskLevelBgColor,
  getRiskLevelBgColorOpacity,
} from "../../_lib/utils";

import type { HealthRisk } from "../../_lib/tool-schemas";

const HealthRiskStock = (healthRisk: HealthRisk) => {
  const [activeTab, setActiveTab] = useState("overview");

  const riskItems = [
    { key: "diabetes", label: "Diabetes", data: healthRisk.diabetes },
    {
      key: "heartDisease",
      label: "Enfermedad Cardíaca",
      data: healthRisk.heartDisease,
    },
    {
      key: "hypertension",
      label: "Hipertensión",
      data: healthRisk.hypertension,
    },
    {
      key: "lungDisease",
      label: "Enfermedad Pulmonar",
      data: healthRisk.lungDisease,
    },
    {
      key: "kidneyDisease",
      label: "Enfermedad Renal",
      data: healthRisk.kidneyDisease,
    },
  ];

  const getRiskIcon = (riskType: string) => {
    switch (riskType.toLowerCase()) {
      case "diabetes":
        return <Droplet className="size-5 text-blue-500" />;
      case "heartdisease":
        return <Heart className="size-5 text-red-500" />;
      case "hypertension":
        return <Activity className="size-5 text-purple-500" />;
      case "lungdisease":
        return <Lungs className="size-5 text-teal-500" />;
      case "kidneydisease":
        return <Pill className="size-5 text-amber-500" />;
      default:
        return <AlertTriangle className="size-5 text-orange-500" />;
    }
  };

  return (
    <Card className="dark:shadow-alternative/15 dark:border-accent shadow-stock mb-8 w-full max-w-lg overflow-hidden rounded-3xl border-slate-100 transition-all duration-300">
      <StockHeader
        imageSrc={`${CLOUDINARY_BASE_URL}/tool/health-risk`}
        title={healthRisk.title ?? "Evaluación de Riesgos de Salud"}
        label="Riesgos de Salud"
        infoItems={[
          {
            icon: <Scale className="size-4" />,
            text: `IMC: ${healthRisk.bmi.toFixed(1)}`,
          },
          {
            icon: <Calendar className="size-4" />,
            text: formatDate(
              healthRisk.assessmentDate,
              "dd 'de' MMMM 'de' yyyy",
            ),
          },
        ]}
      />
      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="w-full gap-0"
      >
        <div className="dark:border-accent border-b border-slate-100 px-3 md:px-6">
          <TabsList className="h-14 w-full bg-transparent md:justify-start md:gap-8">
            {["overview", "details", "recommendations"].map((tab) => (
              <TabsTrigger
                key={tab}
                value={tab}
                className="flex-1 rounded-none border-b-2 border-transparent px-0 font-medium capitalize transition-all duration-200 data-[state=active]:border-blue-500 data-[state=active]:text-blue-500 data-[state=active]:shadow-none md:flex-0 dark:data-[state=active]:text-blue-400"
              >
                {tab === "overview"
                  ? "Resumen"
                  : tab === "details"
                    ? "Detalles"
                    : "Recomendaciones"}
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
              {/* General Risk Level */}
              <div className="dark:bg-accent/50 hover:bg-accent! rounded-2xl bg-slate-50 p-4 transition-colors">
                <div className="mb-3 flex items-center justify-between">
                  <h3 className="text-foreground flex items-center gap-2 text-base font-semibold">
                    <AlertTriangle className="size-5 text-orange-500" />
                    Nivel de Riesgo General
                  </h3>
                  <span
                    className={cn(
                      "text-lg font-semibold",
                      getRiskColor(healthRisk.generalRiskLevel),
                    )}
                  >
                    {capitalize(healthRisk.generalRiskLevel)}
                  </span>
                </div>
                <div className="space-y-2">
                  <Progress
                    value={healthRisk.generalRiskLevelPercentage}
                    className="bg-background h-3"
                    indicatorColor={cn(
                      "rounded-full",
                      getRiskBgColor(healthRisk.generalRiskLevel),
                    )}
                  />
                  <div className="text-muted-foreground flex justify-between text-xs">
                    <span>Bajo</span>
                    <span>Moderado</span>
                    <span>Alto</span>
                    <span>Muy Alto</span>
                  </div>
                </div>
              </div>

              {/* Risk Summary */}
              <div className="dark:bg-accent/50 hover:bg-accent! rounded-2xl bg-slate-50 p-4 transition-colors">
                <div className="mb-3">
                  <h3 className="text-foreground text-base font-semibold">
                    Resumen de Riesgos
                  </h3>
                  <span className="text-muted-foreground text-sm">
                    Probabilidad por enfermedad
                  </span>
                </div>
                <div className="space-y-3">
                  {riskItems.map((risk) => (
                    <RiskSummaryItem
                      key={risk.key}
                      label={risk.label}
                      percentage={risk.data.percentage}
                      level={capitalize(risk.data.level)}
                      icon={getRiskIcon(risk.key)}
                      riskColor={getRiskColor(risk.data.level)}
                    />
                  ))}
                </div>
              </div>

              {/* BMI Information */}
              <div className="dark:bg-accent/50 hover:bg-accent! rounded-2xl bg-slate-50 p-4 transition-colors">
                <h3 className="text-foreground mb-3 flex items-center gap-2 text-base font-semibold">
                  <Scale className="size-5 text-blue-500" />
                  Índice de Masa Corporal (IMC)
                </h3>
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-muted-foreground">Tu IMC</span>
                  <span className="text-foreground text-lg font-semibold">
                    {healthRisk.bmi.toFixed(1)}
                  </span>
                </div>
                <div className="space-y-2">
                  <BMIScale value={healthRisk.bmi} />
                  <div className="text-muted-foreground mt-4 grid gap-1 text-sm md:mt-2 md:grid-cols-2">
                    Clasificación:
                    <span
                      className={cn(
                        "md:text-end",
                        getRiskColorByPercentage(healthRisk.bmi),
                      )}
                    >
                      {healthRisk.bmiLevel}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </ScrollArea>
        </TabsContent>

        <TabsContent
          value="details"
          className="mt-0 focus-visible:ring-0 focus-visible:outline-none"
        >
          <ScrollArea className="h-[400px]">
            <Accordion
              type="single"
              collapsible
              className="space-y-3 p-3 md:p-6"
            >
              {riskItems.map((risk, index) => (
                <RiskDetailCard
                  key={risk.key}
                  title={risk.label}
                  data={risk.data}
                  icon={getRiskIcon(risk.key)}
                  index={index}
                />
              ))}
            </Accordion>
          </ScrollArea>
        </TabsContent>

        <TabsContent
          value="recommendations"
          className="mt-0 focus-visible:ring-0 focus-visible:outline-none"
        >
          <ScrollArea className="h-[400px]">
            <div className="space-y-4 p-3 md:p-6">
              <div className="dark:bg-accent/50 rounded-2xl bg-slate-50 p-4">
                <h3 className="text-foreground mb-3 flex items-center gap-2 text-base font-semibold">
                  <Info className="size-5 text-blue-500" />
                  Recomendaciones Generales
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {healthRisk.recommendations}
                </p>
              </div>
              <div className="space-y-4">
                {riskItems.map(
                  (risk) =>
                    risk.data.recommendedActions && (
                      <RecommendationCard
                        key={risk.key}
                        title={risk.label}
                        recommendations={risk.data.recommendedActions}
                        icon={getRiskIcon(risk.key)}
                        level={risk.data.level}
                      />
                    ),
                )}
              </div>
            </div>
          </ScrollArea>
        </TabsContent>
      </Tabs>
      <StockFooter />
    </Card>
  );
};

export default HealthRiskStock;

function RiskSummaryItem({
  label,
  percentage,
  level,
  icon,
  riskColor,
}: {
  label: string;
  percentage: number;
  level: string;
  icon: React.ReactNode;
  riskColor: string;
}) {
  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between text-sm">
        <div className="flex items-center gap-2">
          {icon}
          <span className="text-foreground/80">
            {percentage}% {label}
          </span>
        </div>
        <span className={`font-medium ${riskColor}`}>{level}</span>
      </div>
      <Progress
        value={percentage}
        className="bg-background"
        indicatorColor={cn("rounded-full", riskColor.replace("text", "bg"))}
      />
    </div>
  );
}

function BMIScale({ value }: { value: number }) {
  const ranges = [
    { label: "Bajo peso", color: "bg-blue-500" },
    { label: "Normal", color: "bg-green-500" },
    { label: "Sobrepeso", color: "bg-yellow-500" },
    { label: "Obesidad I", color: "bg-orange-500" },
    { label: "Obesidad II", color: "bg-red-500" },
    { label: "Obesidad III", color: "bg-red-700" },
  ];

  return (
    <>
      <div className="relative hidden py-5 md:block">
        <div className="flex h-2 overflow-hidden rounded-full">
          {ranges.map((range, index) => (
            <div key={index} className={cn("flex-1", range.color)}></div>
          ))}
        </div>
        <div
          className="bg-foreground absolute top-0 grid size-4 place-content-center rounded-full"
          style={{ left: `${value}%` }}
        >
          <ChevronDown className="text-foreground size-3.5 invert-100" />
        </div>
        <div className="text-muted-foreground text-xxs mt-1 flex justify-between">
          {ranges.map((label) => (
            <span key={label.label} className="flex-1 text-center">
              {label.label}
            </span>
          ))}
        </div>
      </div>

      <div className="flex md:hidden">
        <div className="relative flex h-60 justify-center gap-2">
          <div className="h-full">
            <div className="flex h-full w-4 flex-col overflow-hidden rounded-full">
              {ranges.map((r, i) => (
                <div key={i} className={cn("flex-1", r.color)} />
              ))}
            </div>
            <div
              className="absolute -left-1 h-1.5 w-4 rounded-full bg-white"
              style={{ top: `${value}%` }}
            />
          </div>
          <div className="text-muted-foreground justify-betweenn flex flex-col text-xs">
            {ranges.map((r) => (
              <span
                key={r.label}
                className="flex flex-1 items-center justify-between text-center"
              >
                {r.label}
              </span>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
function RiskDetailCard({
  title,
  data,
  icon,
  index,
}: {
  title: string;
  data: HealthRisk["diabetes"];
  icon: React.ReactNode;
  index: number;
}) {
  return (
    <AccordionItem
      value={`risk-${index}`}
      className="dark:data-[state=open]:bg-accent/50 dark:border-accent overflow-hidden rounded-2xl border! border-slate-100 data-[state=open]:bg-slate-50"
    >
      <AccordionTrigger className="flex p-4 hover:no-underline md:items-center">
        <div className="flex items-center gap-3">
          {icon}
          <div>
            <h3 className="text-foreground font-medium">{title}</h3>
            <div className="mt-0.5 flex items-center gap-2">
              <div className="bg-alternative h-1.5 w-1.5 rounded-full"></div>
              <p className="text-muted-foreground text-xs">
                Riesgo:{" "}
                <span className={cn("ml-2", getRiskColor(data.level))}>
                  {capitalize(data.level)}
                </span>
              </p>
            </div>
          </div>
        </div>
        <div
          className={cn(
            "ml-auto rounded-full px-2 py-1 text-xs font-medium",
            getRiskLevelBadgeColor(data.level),
          )}
        >
          {data.percentage}%
        </div>
      </AccordionTrigger>
      <AccordionContent className="space-y-4 px-4 pt-1 pb-5">
        <Progress
          value={data.percentage}
          indicatorColor={cn("rounded-full", getRiskLevelBgColor(data.level))}
        />
        {data.interpretation && (
          <div className="mt-3">
            <h4 className="text-foreground/80 mb-1 text-xs font-medium">
              Interpretación
            </h4>
            <p className="text-muted-foreground text-sm">
              {data.interpretation}
            </p>
          </div>
        )}
        {data.recommendedActions && (
          <div className="mt-3">
            <h4 className="text-foreground/80 mb-1 text-xs font-medium">
              Acciones Recomendadas
            </h4>
            <p className="text-muted-foreground text-sm">
              {data.recommendedActions}
            </p>
          </div>
        )}
      </AccordionContent>
    </AccordionItem>
  );
}

function RecommendationCard({
  title,
  recommendations,
  icon,
  level,
}: {
  title: string;
  recommendations: string;
  icon: React.ReactNode;
  level: string;
}) {
  return (
    <div className="bg-background dark:border-accent overflow-hidden rounded-2xl border border-slate-100">
      <div
        className={cn(
          getRiskLevelBgColorOpacity(level),
          "dark:border-accent border-b border-slate-100 p-3",
        )}
      >
        <div className="flex items-center gap-2">
          {icon}
          <h3 className="text-foreground font-medium">{title}</h3>
        </div>
      </div>
      <div className="p-4">
        <ul className="space-y-2">
          {recommendations
            .split(". ")
            .filter(Boolean)
            .map((rec, idx) => (
              <li
                key={idx}
                className="text-muted-foreground flex items-start text-sm"
              >
                <ArrowRight className="mt-0.5 mr-2 size-4 flex-shrink-0 text-blue-500" />
                <span>
                  {rec.trim()}
                  {!rec.endsWith(".") && "."}
                </span>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
}
