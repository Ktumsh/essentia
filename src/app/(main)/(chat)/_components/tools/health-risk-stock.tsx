"use client";

import Image from "next/image";

import { Badge } from "@/components/kit/badge";
import { Card, CardFooter, CardHeader } from "@/components/kit/card";
import { Separator } from "@/components/kit/separator";
import { HeartbeatIcon } from "@/components/ui/icons/miscellaneus";
import { cn } from "@/lib/utils";

import DownloadButton from "./download-button";
import HealthRiskDetails from "./health-risk-details";
import { useDownloadTool } from "../../_hooks/use-download-tool";
import { HealthRisk } from "../../_lib/ai/tool-schemas";

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
          <DownloadButton downloadImage={downloadImage} />
        </div>
      </CardHeader>
      <div className="text-foreground/80 flex flex-col justify-around space-y-2 gap-x-6 p-2 md:flex-row md:space-y-4 md:p-6">
        <Separator className="mx-4 w-auto md:mx-6 md:hidden" />
        <HealthRiskDetails {...healthRisk} />
      </div>
      <CardFooter className="items-center justify-center p-2 pt-4 md:p-6 md:pt-0">
        <div className="flex flex-col-reverse items-center justify-center gap-2 md:flex-row md:gap-4">
          <div className="text-foreground/80 bg-accent rounded-lg p-3 text-xs md:text-sm">
            <h3 className="font-space-mono text-foreground text-base font-extrabold uppercase md:text-xl">
              Recomendación
            </h3>
            <p className="text-foreground/80">{healthRisk.recommendations}</p>
          </div>
          <div className="flex items-center gap-2 md:flex-col">
            <div className="text-foreground/80 from-accent to-background before:bg-background relative inline-flex w-fit flex-col gap-1 rounded-xl bg-linear-to-bl to-50% p-3 text-sm before:absolute before:inset-0.5 before:z-0 before:rounded-[10px] before:content-['']">
              <span className="bg-primary border-background absolute -top-1.5 -right-1.5 flex size-6 items-center justify-center rounded-full">
                <HeartbeatIcon className="size-5 text-white" />
              </span>
              <div className="z-10 flex flex-col">
                <h3 className="text-foreground/80 text-sm font-medium md:text-lg">
                  IMC
                </h3>
                <span className="font-space-mono text-foreground text-2xl font-extrabold uppercase md:text-4xl">
                  {healthRisk.bmi}
                </span>
              </div>
            </div>
            <div className="bg-accent rounded-lg px-3 py-1.5">
              <p
                className={cn(
                  "text-xxs! text-foreground/80 text-center first-letter:uppercase md:text-xs!",
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
