"use client";

import TooltipCTN from "@/modules/core/components/ui/utils/tooltip-ctn";
import {
  HeartbeatIcon,
  HighLevelIcon,
  LowLevelIcon,
  MediumLevelIcon,
} from "@/modules/icons/miscellaneus";
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
import { useCallback, useMemo, useRef } from "react";
import Image from "next/image";
import { DownloadIcon } from "@radix-ui/react-icons";
import { toPng } from "html-to-image";
import { cn } from "@/utils/common";
import { toast } from "sonner";

interface RiskValue {
  percentage: number;
  level: string;
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
}

const AssesHealthRiskStock = ({
  props: riskAssessment,
}: {
  props: RiskAssessment;
}) => {
  const cardRef = useRef<HTMLDivElement>(null);

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
    generalRiskLevelPercentage: number
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

  const downloadImage = useCallback(() => {
    const node = cardRef.current;
    if (node) {
      toPng(node)
        .then((dataUrl) => {
          const link = document.createElement("a");
          link.download = "health-risk.png";
          link.href = dataUrl;
          link.click();
        })
        .catch(() => {
          toast.error("Hubo un error al descargar la imagen");
        });
    }
  }, []);

  const riskInfo = useMemo(
    () =>
      getTotalRiskLevel(
        riskAssessment.generalRiskLevel,
        riskAssessment.generalRiskLevelPercentage
      ),
    [riskAssessment.generalRiskLevel, riskAssessment.generalRiskLevelPercentage]
  );

  return (
    <Card
      ref={cardRef}
      radius="md"
      className="bg-white dark:bg-base-full-dark shadow-lg"
    >
      <CardHeader className="relative p-0 rounded-none z-0">
        <ImageUI
          as={Image}
          width={639}
          height={307}
          quality={100}
          priority
          radius="none"
          src="/extras/health-risk-banner.jpg"
          alt="Mood Tracking Banner"
          classNames={{
            wrapper: "h-[200px] overflow-hidden",
            img: "h-auto object-cover object-top",
          }}
        />
        <div className="z-10 pointer-events-none absolute inset-0 bg-gradient-to-b from-black/60 to-transparent to-70%"></div>
        <div className="z-10 absolute top-0 inset-x-0 w-full flex justify-between p-4 md:p-8">
          <Chip color="danger" className="shadow-md">
            Tu riesgo de salud
          </Chip>
          <TooltipCTN content="Descargar como imagen">
            <Button
              isIconOnly
              size="sm"
              onPress={downloadImage}
              className="bg-black/50 text-white backdrop-blur backdrop-saturate-150"
            >
              <DownloadIcon className="size-3" />
              <span className="sr-only">Descargar como Imagen</span>
            </Button>
          </TooltipCTN>
        </div>
      </CardHeader>
      <CardBody className="md:flex-row justify-around gap-4 p-4 md:p-8 text-base-color-h dark:text-base-color-dark">
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
              value:
                "text-3xl font-bold text-base-color dark:text-white font-sans",
            }}
          />
          <div className={cn("mt-2 text-xl font-bold", riskInfo.color)}>
            Nivel de riesgo{" "}
            <span className="uppercase">{riskAssessment.generalRiskLevel}</span>
          </div>
          <div className="text-sm text-center">{riskInfo.message}</div>
        </div>
        <Divider className="md:hidden mx-4 md:mx-8 w-auto bg-gray-200 dark:bg-base-dark" />
        <div className="flex justify-between gap-2">
          <div className="flex flex-col mt-7 space-y-2">
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
              { id: 5, label: "Hipertensión", dot: "bg-[hsl(var(--chart-5))]" },
            ].map(({ id, label, dot }) => (
              <Chip
                key={id}
                variant="dot"
                classNames={{
                  base: "max-w-none border-none p-0",
                  content:
                    "flex justify-between text-sm text-base-color-h dark:text-base-color-dark font-semibold",
                  dot: dot,
                }}
              >
                <span>{label}</span>
              </Chip>
            ))}
          </div>
          <table className="flex flex-col items-center text-sm space-y-2">
            <thead>
              <tr>
                <th>Riesgo</th>
              </tr>
            </thead>
            <tbody className="flex flex-col space-y-2 [&_tr]:h-7 [&_tr]:flex [&_tr]:justify-between">
              {[
                { id: 1, value: riskAssessment.diabetes },
                { id: 2, value: riskAssessment.heartDisease },
                { id: 3, value: riskAssessment.lungDisease },
                { id: 4, value: riskAssessment.kidneyDisease },
                { id: 5, value: riskAssessment.hypertension },
              ].map(({ id, value }) => (
                <tr key={id}>
                  <td>{value.percentage}%</td>
                  <TooltipCTN content={value.level} placement="right">
                    <td>{getRiskIcon(value.level)}</td>
                  </TooltipCTN>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardBody>
      <Divider className="mx-4 md:mx-8 w-auto bg-gray-200 dark:bg-base-dark" />
      <CardFooter className="p-4 md:p-8 pt-4 justify-center items-center">
        <div className="flex flex-col-reverse md:flex-row items-center justify-center gap-4">
          <div className="p-3 text-sm bg-gray-100 dark:bg-base-dark text-base-color-h dark:text-white rounded-lg">
            <h3 className="text-xl font-extrabold font-sans uppercase">
              Recomendación
            </h3>
            <p className="text-base-color-h dark:text-base-color-dark">
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
                  "flex-col gap-1 w-fit p-3 text-sm bg-gradient-to-bl from-gray-200 to-white to-50% dark:from-base-dark dark:to-base-full-dark text-base-color-h dark:text-white rounded-xl",
                  "before:content-[''] before:absolute before:inset-0.5 before:bg-white before:dark:bg-base-full-dark before:rounded-[10px] before:z-0",
                ],
                badge:
                  "!size-7 top-[5%] right-[5%] border-white dark:border-base-full-dark",
              }}
            >
              <div className="flex flex-col z-[1]">
                <h3 className="text-lg font-medium text-base-color-h dark:text-base-color-dark">
                  IMC
                </h3>
                <TooltipCTN content="Índice de masa corporal">
                  <p className="text-4xl font-extrabold font-sans uppercase">
                    {riskAssessment.bmi}
                  </p>
                </TooltipCTN>
              </div>
            </Badge>
            <div className="py-1.5 px-3 bg-gray-100 dark:bg-base-dark rounded-lg">
              <p
                className={cn(
                  "text-xs text-center first-letter:uppercase text-base-color-h dark:text-base-color-dark"
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
