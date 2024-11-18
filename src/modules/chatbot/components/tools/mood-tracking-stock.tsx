"use client";

import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Chip,
  Image as ImageUI,
  Divider,
} from "@nextui-org/react";
import Image from "next/image";
import { toast } from "sonner";

import { BetterTooltip } from "@/components/ui/tooltip";
import { DownloadIcon } from "@/modules/icons/action";
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
    <Card
      ref={ref}
      radius="md"
      shadow="none"
      className="group/card bg-white dark:bg-full-dark"
    >
      <CardHeader className="relative z-0 rounded-none p-0">
        <ImageUI
          as={Image}
          width={640}
          height={320}
          quality={100}
          radius="none"
          src="/extras/mood-tracking-top.webp"
          alt="Mood Tracking Banner"
          classNames={{
            wrapper: "h-36 md:h-[200px] overflow-hidden",
            img: "!h-auto object-cover object-top",
          }}
        />
        <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-b from-black/30 to-transparent to-70%"></div>
        <div className="absolute inset-x-0 top-0 z-10 flex w-full justify-between p-2 md:p-8">
          <Chip color="danger" className="shadow-md">
            Actividades de Bienestar
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
      <CardBody className="space-y-2 p-2 text-main-h dark:text-main-dark md:space-y-4 md:p-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ListIcon className="size-4 text-main-m dark:text-main-dark-m md:size-5" />
            <h3 className="font-medium text-main dark:text-white md:text-xl">
              Actividades recomendadas
            </h3>
          </div>
          <Chip
            size="sm"
            variant="flat"
            className="bg-black/10 dark:bg-white/10"
          >
            <HeartIcon className="size-4 text-main-m dark:text-main-dark-m" />
          </Chip>
        </div>
        <ul className="list-inside list-disc space-y-3">
          {moodTracking.mood.map((mood, index) => (
            <li
              key={index}
              className="flex flex-col justify-center text-xs md:text-sm"
            >
              <Chip
                variant="dot"
                classNames={{
                  base: "flex items-start md:items-center h-auto md:h-7 px-0 border-none text-wrap whitespace-wrap",
                  dot: "ml-0 mt-1.5 md:mt-0 bg-black/10 dark:bg-white/10",
                  content:
                    "text-md md:text-base font-semibold text-main-h dark:text-main-dark",
                }}
              >
                {mood.activity}
              </Chip>
              <p className="ml-4 text-main-h dark:text-main-dark-h">
                {mood.description}
              </p>
            </li>
          ))}
        </ul>
        <Divider className="bg-gray-200 dark:bg-dark" />
        <div className="mt-4 flex flex-col items-center justify-center gap-2 md:flex-row md:gap-4">
          <div className="rounded-lg bg-gray-100 p-3 text-sm text-main-h dark:bg-dark dark:text-white">
            <h3 className="font-sans text-xl font-extrabold uppercase">
              Recomendación
            </h3>
            <p className="text-main-h dark:text-main-dark">
              {moodTracking.suggestion}
            </p>
          </div>
          <div className="rounded-3xl border-4 border-gray-100 p-3 text-sm text-main-h dark:border-dark dark:text-white">
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
      </CardBody>
    </Card>
  );
};

export default MoodTrackingStock;
