"use client";

import { ArrowDownToLine } from "lucide-react";
import Image from "next/image";
import { toast } from "sonner";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { BetterTooltip } from "@/components/ui/tooltip";
import { QuoteLeftIcon } from "@/modules/icons/common";
import { HeartIcon, ListIcon } from "@/modules/icons/miscellaneus";

import { useDownloadTool } from "../../hooks/use-download-tool";

interface Activity {
  activity: string;
  description: string;
}

interface PoeticPhrase {
  phrase: string;
  author: string;
}

export interface MoodTracking {
  mood: Activity[];
  suggestion: string;
  tip: string;
  poeticPhrase?: PoeticPhrase;
}

const MoodTrackingStock = ({
  props: moodTracking,
}: {
  props: MoodTracking;
}) => {
  const { ref, downloadImage } = useDownloadTool("mood-tracking.png");

  if (!moodTracking)
    return toast.error("Hubo un error al generar las actividades de bienestar");

  return (
    <Card ref={ref} className="group/card overflow-hidden rounded-xl">
      <CardHeader className="relative z-0 rounded-none p-0">
        <div className="h-36 overflow-hidden md:h-52">
          <Image
            width={696}
            height={208}
            quality={80}
            src="/extras/mood-tracking-top.webp"
            alt="Mood Tracking Banner"
            className="aspect-auto h-36 object-cover md:h-52"
          />
        </div>
        <div className="absolute inset-x-0 top-0 z-10 flex w-full justify-between p-6">
          <Badge className="shadow-md">Actividades de bienestar</Badge>
          <BetterTooltip content="Descargar como imagen">
            <Button
              size="icon"
              onClick={downloadImage}
              className="absolute right-6 top-6 z-10 size-8 bg-black/20! text-white shadow-none hover:bg-black/30! active:bg-black/30 group-hover/card:opacity-100 md:opacity-0"
            >
              <ArrowDownToLine className="size-3.5!" />
              <span className="sr-only">Descargar como Imagen</span>
            </Button>
          </BetterTooltip>
        </div>
      </CardHeader>
      <div className="space-y-2 p-2 text-main-h dark:text-main-dark md:space-y-4 md:p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ListIcon className="size-4 text-main-m dark:text-main-dark-m md:size-5" />
            <h3 className="font-medium text-main dark:text-white md:text-xl">
              Actividades recomendadas
            </h3>
          </div>
          <Badge className="bg-rose-100 py-1.5 dark:bg-rose-950">
            <HeartIcon className="size-4 text-rose-500" />
          </Badge>
        </div>
        <ul className="list-inside list-disc space-y-3">
          {moodTracking.mood.map((mood, index) => (
            <li
              key={index}
              className="flex flex-col justify-center text-xs md:text-sm"
            >
              <div className="mb-1 ml-1.5 inline-flex items-center gap-3 text-sm md:text-base">
                <span className="size-1.5 rounded-full bg-black/10 dark:bg-white/10"></span>
                <span className="font-semibold">{mood.activity}</span>
              </div>
              <p className="ml-6 text-main-h dark:text-main-dark-h">
                {mood.description}
              </p>
            </li>
          ))}
        </ul>
        <Separator />
        <div className="mt-4 flex flex-col items-center justify-center gap-2 md:flex-row md:gap-4">
          <div className="rounded-lg bg-gray-100 p-3 text-xs text-main-h dark:bg-dark dark:text-white md:text-sm">
            <h3 className="font-sans text-base font-extrabold uppercase md:text-xl">
              Recomendación
            </h3>
            <p className="text-main-h dark:text-main-dark">
              {moodTracking.suggestion}
            </p>
          </div>
          <div className="rounded-lg border-4 border-gray-100 p-3 text-xs text-main-h dark:border-dark dark:text-white md:text-sm">
            <p className="text-main-h dark:text-main-dark">
              {moodTracking.tip}
            </p>
          </div>
        </div>
        {moodTracking.poeticPhrase && (
          <div className="flex flex-col items-center justify-center space-y-2 p-3 text-sm text-main-h dark:text-white">
            <div className="inline-flex gap-2">
              <QuoteLeftIcon className="size-6 min-w-6 text-main-l dark:text-main-dark-l" />
              <p className="text-wrap text-main-h dark:text-main-dark-h">
                {moodTracking.poeticPhrase.phrase}
              </p>
            </div>
            {moodTracking.poeticPhrase.author !== "Anónimo" &&
              moodTracking.poeticPhrase.author !== "Desconocido" && (
                <p className="text-xs text-main-m dark:text-main-dark-m">
                  - {moodTracking.poeticPhrase.author}
                </p>
              )}
          </div>
        )}
      </div>
    </Card>
  );
};

export default MoodTrackingStock;
