"use client";

import {
  Badge,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Chip,
  CircularProgress,
  Divider,
  Image as ImageUI,
} from "@nextui-org/react";
import Image from "next/image";
import { useMemo, type JSX } from "react";

import { BetterTooltip } from "@/components/ui/tooltip";
import { DownloadIcon } from "@/modules/icons/action";
import {
  HeartbeatIcon,
  HighLevelIcon,
  LowLevelIcon,
  MediumLevelIcon,
} from "@/modules/icons/miscellaneus";
import { CalendarFillIcon } from "@/modules/icons/status";
import { cn } from "@/utils/common";

import HealthRiskDetails from "./health-risk-details";
import { useDownloadTool } from "../../hooks/use-download-tool";
import { getFormattedDate } from "../../lib/utils";

export interface RiskValue {
  percentage: number;
  level: string;
  interpretation?: string;
  recommendedActions?: string;
}

export interface RiskAssessment {
  diabetes: RiskValue;
  heartDisease: RiskValue;
  lungDisease: RiskValue;
  kidneyDisease: RiskValue;
  hypertension: RiskValue;
  generalRiskLevelPercentage: number;
  generalRiskLevel: string;
  bmi: number;
  bmiLevel: string;
  recommendations: string;
  assessmentDate: string;
}

const AssesHealthRiskStock = ({
  props: riskAssessment,
}: {
  props: RiskAssessment;
}) => {
  const { ref, downloadImage } = useDownloadTool("health-risk.png");

  const getRiskIcon = (level: string) => {
    const icons: Record<string, JSX.Element> = {
      bajo: <LowLevelIcon className="ms-2 size-3.5 text-green-500" />,
      medio: <MediumLevelIcon className="ms-2 size-3.5 text-yellow-500" />,
      alto: <HighLevelIcon className="ms-2 size-3.5 text-red-500" />,
    };

    return icons[level] || null;
  };

  const getTotalRiskLevel = (
    generalRiskLevel: string,
    generalRiskLevelPercentage: number,
  ) => {
    const riskLevels = [
      {
        condition:
          generalRiskLevel === "bajo" && generalRiskLevelPercentage <= 3,
        message: "¡Excelente! Sigue así. 😃",
        color: "text-emerald-400",
        strokeColor: "stroke-emerald-400",
      },
      {
        condition:
          generalRiskLevel === "bajo" &&
          generalRiskLevelPercentage > 3 &&
          generalRiskLevelPercentage <= 7,
        message: "¡Muy bien! Mantén esos hábitos saludables. 😊",
        color: "text-green-500",
        strokeColor: "stroke-green-500",
      },
      {
        condition:
          generalRiskLevel === "bajo" && generalRiskLevelPercentage > 7,
        message: "¡Generalmente estás bien! Aunque siempre puedes mejorar. 😊",
        color: "text-lime-500",
        strokeColor: "stroke-lime-500",
      },
      {
        condition:
          generalRiskLevel === "medio" &&
          generalRiskLevelPercentage > 10 &&
          generalRiskLevelPercentage <= 20,
        message: "Presta atención. Considera ajustes en tu estilo de vida. 😐",
        color: "text-yellow-500",
        strokeColor: "stroke-yellow-500",
      },
      {
        condition:
          generalRiskLevel === "medio" && generalRiskLevelPercentage > 20,
        message: "Precaución. Considera mejorar tus hábitos de salud. 😬",
        color: "text-orange-500",
        strokeColor: "stroke-orange-500",
      },
      {
        condition:
          generalRiskLevel === "alto" &&
          generalRiskLevelPercentage > 20 &&
          generalRiskLevelPercentage <= 50,
        message: "¡Ten cuidado! Es importante que consideres tomar medidas. 🥲",
        color: "text-red-500",
        strokeColor: "stroke-red-500",
      },
      {
        condition:
          generalRiskLevel === "alto" && generalRiskLevelPercentage > 50,
        message: "¡Alerta! Consulta a un profesional de salud. 🚨",
        color: "text-rose-600",
        strokeColor: "stroke-rose-600",
      },
    ];

    return (
      riskLevels.find((level) => level.condition) || {
        message: "No se ha podido evaluar el riesgo.",
        color: "text-gray-500",
        strokeColor: "stroke-gray-500",
      }
    );
  };

  const riskInfo = useMemo(
    () =>
      getTotalRiskLevel(
        riskAssessment.generalRiskLevel,
        riskAssessment.generalRiskLevelPercentage,
      ),
    [
      riskAssessment.generalRiskLevel,
      riskAssessment.generalRiskLevelPercentage,
    ],
  );

  const assessmentDate = useMemo(() => {
    return getFormattedDate(riskAssessment.assessmentDate);
  }, [riskAssessment.assessmentDate]);

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
          height={307}
          quality={100}
          priority
          radius="none"
          src="/extras/health-risk-banner.jpg"
          alt="Health Risk Banner"
          classNames={{
            wrapper: "h-36 md:h-[200px] overflow-hidden",
            img: "!h-auto object-cover object-top",
          }}
        />
        <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-b from-black/30 to-transparent to-70%"></div>
        <div className="absolute inset-x-0 top-0 z-10 flex w-full justify-between p-2 md:p-8">
          <Chip color="danger" className="shadow-md">
            Tu riesgo de salud
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
      <CardBody className="justify-around space-y-2 p-2 text-main-h dark:text-main-dark md:flex-row md:space-y-4 md:p-8">
        <div className="flex flex-col items-center justify-between">
          <div className="flex flex-col items-center">
            <CircularProgress
              aria-label="Porcentaje de riesgo"
              value={riskAssessment.generalRiskLevelPercentage}
              strokeWidth={3}
              showValueLabel={true}
              color="danger"
              classNames={{
                svg: "!size-32",
                track: "dark:stroke-white/10",
                indicator: riskInfo.strokeColor,
                value: "text-3xl font-bold text-main dark:text-white font-sans",
              }}
            />
            <div className={cn("mt-2 text-xl font-bold", riskInfo.color)}>
              Nivel de riesgo{" "}
              <span className="uppercase">
                {riskAssessment.generalRiskLevel}
              </span>
            </div>
            <div className="text-center text-sm">{riskInfo.message}</div>
          </div>
          {riskAssessment.assessmentDate && (
            <Chip
              startContent={
                <CalendarFillIcon className="size-4 text-main-m dark:text-main-dark-m" />
              }
              variant="flat"
              radius="sm"
              classNames={{
                base: "mt-2 md:mt-4 px-3 h-10 bg-gray-100 dark:bg-dark text-main-h dark:text-main-dark",
              }}
            >
              Evaluación {assessmentDate}
            </Chip>
          )}
        </div>
        <Divider className="mx-4 w-auto bg-gray-200 dark:bg-dark md:mx-8 md:hidden" />
        <div className="flex flex-col justify-center space-y-2">
          <div className="flex justify-between gap-2">
            <div className="mt-7 flex flex-col space-y-2">
              {[
                { id: 1, label: "Diabetes", dot: "bg-[hsl(var(--chart-1))]" },
                {
                  id: 2,
                  label: "Enfermedad Cardíaca",
                  dot: "bg-[hsl(var(--chart-2))]",
                },
                {
                  id: 3,
                  label: "Enfermedad Pulmonar",
                  dot: "bg-[hsl(var(--chart-3))]",
                },
                {
                  id: 4,
                  label: "Enfermedad Renal",
                  dot: "bg-[hsl(var(--chart-4))]",
                },
                {
                  id: 5,
                  label: "Hipertensión",
                  dot: "bg-[hsl(var(--chart-5))]",
                },
              ].map(({ id, label, dot }) => (
                <Chip
                  key={id}
                  variant="dot"
                  classNames={{
                    base: "max-w-none border-none p-0",
                    content:
                      "flex justify-between text-sm text-main-h dark:text-main-dark font-semibold",
                    dot: dot,
                  }}
                >
                  <span>{label}</span>
                </Chip>
              ))}
            </div>
            <table className="flex flex-col items-center space-y-2 text-sm">
              <thead>
                <tr>
                  <th className="inline-flex items-center">
                    Riesgo
                    <HealthRiskDetails riskAssessment={riskAssessment} />
                  </th>
                </tr>
              </thead>
              <tbody className="flex flex-col space-y-2 [&_tr]:flex [&_tr]:h-7 [&_tr]:justify-between">
                {[
                  { id: 1, value: riskAssessment.diabetes },
                  { id: 2, value: riskAssessment.heartDisease },
                  { id: 3, value: riskAssessment.lungDisease },
                  { id: 4, value: riskAssessment.kidneyDisease },
                  { id: 5, value: riskAssessment.hypertension },
                ].map(({ id, value }) => (
                  <tr key={id}>
                    <td>{value.percentage}%</td>
                    <td>{getRiskIcon(value.level)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </CardBody>
      <Divider className="mx-4 w-auto bg-gray-200 dark:bg-dark md:mx-8" />
      <CardFooter className="items-center justify-center p-2 pt-4 md:p-8">
        <div className="flex flex-col-reverse items-center justify-center gap-2 md:flex-row md:gap-4">
          <div className="rounded-lg bg-gray-100 p-3 text-sm text-main-h dark:bg-dark dark:text-white">
            <h3 className="font-sans text-xl font-extrabold uppercase">
              Recomendación
            </h3>
            <p className="text-main-h dark:text-main-dark">
              {riskAssessment.recommendations}
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <Badge
              isOneChar
              color="danger"
              shape="circle"
              size="lg"
              content={<HeartbeatIcon className="size-5 text-white" />}
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
                <h3 className="text-lg font-medium text-main-h dark:text-main-dark">
                  IMC
                </h3>
                <BetterTooltip content="Índice de masa corporal">
                  <p className="font-sans text-4xl font-extrabold uppercase">
                    {riskAssessment.bmi}
                  </p>
                </BetterTooltip>
              </div>
            </Badge>
            <div className="rounded-lg bg-gray-100 px-3 py-1.5 dark:bg-dark">
              <p
                className={cn(
                  "text-center text-xs text-main-h first-letter:uppercase dark:text-main-dark",
                )}
              >
                {riskAssessment.bmiLevel}
              </p>
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};

export default AssesHealthRiskStock;
