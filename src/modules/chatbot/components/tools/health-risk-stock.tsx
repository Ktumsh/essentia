"use client";

import { ArrowDownToLine } from "lucide-react";
import Image from "next/image";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardFooter, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { BetterTooltip } from "@/components/ui/tooltip";
import { HeartbeatIcon } from "@/modules/icons/miscellaneus";
import { cn } from "@/utils/common";

import HealthRiskDetails from "./health-risk-details";
import { useDownloadTool } from "../../hooks/use-download-tool";
import { HealthRisk } from "../../lib/ai/tool-schemas";

const AssesHealthRiskStock = (healthRisk: HealthRisk) => {
  const { ref, downloadImage } = useDownloadTool("health-healthRisk.png");

  return (
    <Card ref={ref} className="group/card overflow-hidden rounded-xl">
      <CardHeader className="relative z-0 rounded-none p-0">
        <div className="h-36 overflow-hidden md:h-52">
          <Image
            width={696}
            height={208}
            quality={80}
            src="/extras/health-risk-banner.jpg"
            alt="Health Risk Banner"
            className="aspect-auto h-36 object-cover object-top md:h-52"
          />
        </div>
        <div className="absolute inset-x-0 top-0 z-10 mt-0! flex w-full justify-between p-6">
          <Badge className="shadow-md">Tu riesgo de salud</Badge>

          <BetterTooltip content="Descargar como imagen">
            <Button
              size="icon"
              onClick={downloadImage}
              className="absolute top-6 right-6 z-10 size-8 bg-black/20! text-white shadow-none group-hover/card:opacity-100 hover:bg-black/30! active:bg-black/30 md:opacity-0"
            >
              <ArrowDownToLine className="size-3.5!" />
              <span className="sr-only">Descargar como Imagen</span>
            </Button>
          </BetterTooltip>
        </div>
      </CardHeader>
      <div className="text-main-h dark:text-main-dark flex flex-col justify-around gap-x-6 space-y-2 p-2 md:flex-row md:space-y-4 md:p-6">
        <Separator className="mx-4 w-auto md:mx-6 md:hidden" />
        <HealthRiskDetails {...healthRisk} />
      </div>
      <CardFooter className="items-center justify-center p-2 pt-4 md:p-6 md:pt-0">
        <div className="flex flex-col-reverse items-center justify-center gap-2 md:flex-row md:gap-4">
          <div className="text-main-h dark:bg-dark rounded-lg bg-gray-100 p-3 text-xs md:text-sm dark:text-white">
            <h3 className="font-sans text-base font-extrabold uppercase md:text-xl">
              Recomendación
            </h3>
            <p className="text-main-h dark:text-main-dark">
              {healthRisk.recommendations}
            </p>
          </div>
          <div className="flex items-center gap-2 md:flex-col">
            <div className="text-main-h dark:from-dark dark:to-full-dark dark:before:bg-full-dark relative inline-flex w-fit flex-col gap-1 rounded-xl bg-linear-to-bl from-gray-200 to-white to-50% p-3 text-sm before:absolute before:inset-0.5 before:z-0 before:rounded-[10px] before:bg-white before:content-[''] dark:text-white">
              <span className="bg-danger dark:border-full-dark absolute -top-1.5 -right-1.5 flex size-6 items-center justify-center rounded-full border-white">
                <HeartbeatIcon className="size-5 text-white" />
              </span>
              <div className="z-10 flex flex-col">
                <h3 className="text-main-h dark:text-main-dark text-sm font-medium md:text-lg">
                  IMC
                </h3>
                <BetterTooltip content="Índice de masa corporal">
                  <span className="font-sans text-2xl font-extrabold uppercase md:text-4xl">
                    {healthRisk.bmi}
                  </span>
                </BetterTooltip>
              </div>
            </div>
            <div className="dark:bg-dark rounded-lg bg-gray-100 px-3 py-1.5">
              <p
                className={cn(
                  "text-xxs! text-main-h dark:text-main-dark text-center first-letter:uppercase md:text-xs!",
                )}
              >
                {healthRisk.bmiLevel}
              </p>
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};

export default AssesHealthRiskStock;
