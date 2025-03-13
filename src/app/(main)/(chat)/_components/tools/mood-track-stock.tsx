"use client";

import Image from "next/image";
import { toast } from "sonner";

import { Badge } from "@/components/kit/badge";
import { Card, CardHeader } from "@/components/kit/card";
import { Separator } from "@/components/kit/separator";
import { QuoteLeftIcon } from "@/components/ui/icons/common";
import { HeartIcon, ListIcon } from "@/components/ui/icons/miscellaneus";

import DownloadButton from "./download-button";
import { useDownloadTool } from "../../_hooks/use-download-tool";
import { MoodTrack } from "../../_lib/ai/tool-schemas";

const MoodTrackStock = (moodTrack: MoodTrack) => {
  const { ref, downloadImage } = useDownloadTool("mood-tracking.png");

  if (!moodTrack)
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
          <DownloadButton downloadImage={downloadImage} />
        </div>
      </CardHeader>
      <div className="text-foreground/80 space-y-2 p-2 md:space-y-4 md:p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ListIcon className="text-muted-foreground size-4 md:size-5" />
            <h3 className="text-foreground font-merriweather font-medium md:text-xl">
              Actividades recomendadas
            </h3>
          </div>
          <Badge className="bg-rose-100 py-1.5 dark:bg-rose-950">
            <HeartIcon className="size-4 text-rose-500" />
          </Badge>
        </div>
        <ul className="list-inside list-disc space-y-3">
          {moodTrack.mood.map((mood, index) => (
            <li
              key={index}
              className="flex flex-col justify-center text-xs md:text-sm"
            >
              <div className="mb-1 ml-1.5 inline-flex items-center gap-3 text-sm md:text-base">
                <span className="bg-primary size-1.5 rounded-full"></span>
                <span className="text-foreground font-semibold">
                  {mood.activity}
                </span>
              </div>
              <p className="text-foreground/80 ml-6">{mood.description}</p>
            </li>
          ))}
        </ul>
        <Separator />
        <div className="mt-4 flex flex-col items-center justify-center gap-2 md:flex-row md:gap-4">
          <div className="text-foreground/80 bg-accent rounded-lg p-3 text-xs md:text-sm">
            <h3 className="font-space-mono text-foreground text-base font-extrabold uppercase md:text-xl">
              Recomendación
            </h3>
            <p className="text-foreground/80">{moodTrack.suggestion}</p>
          </div>
          <div className="text-foreground/80 border-border rounded-lg border-4 p-3 text-xs md:text-sm">
            <p className="text-foreground/80">{moodTrack.tip}</p>
          </div>
        </div>
        {moodTrack.poeticPhrase && (
          <div className="text-foreground/80 flex flex-col items-center justify-center space-y-2 p-3 text-sm">
            <div className="inline-flex gap-2">
              <QuoteLeftIcon className="text-muted-foreground size-6 min-w-6" />
              <p className="text-foreground/80 text-wrap">
                {moodTrack.poeticPhrase.phrase}
              </p>
            </div>
            {moodTrack.poeticPhrase.author !== "Anónimo" &&
              moodTrack.poeticPhrase.author !== "Desconocido" && (
                <p className="text-muted-foreground text-xs">
                  - {moodTrack.poeticPhrase.author}
                </p>
              )}
          </div>
        )}
      </div>
    </Card>
  );
};

export default MoodTrackStock;
