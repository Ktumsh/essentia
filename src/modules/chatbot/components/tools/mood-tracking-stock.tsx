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

import TooltipCTN from "@/modules/core/components/ui/utils/tooltip-ctn";
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
      className="bg-white group/card dark:bg-full-dark"
    >
      <CardHeader className="relative z-0 p-0 rounded-none">
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
        <div className="z-10 pointer-events-none absolute inset-0 bg-gradient-to-b from-black/30 to-transparent to-70%"></div>
        <div className="absolute inset-x-0 top-0 z-10 flex justify-between w-full p-2 md:p-8">
          <Chip color="danger" className="shadow-md">
            Actividades de Bienestar
          </Chip>
          <TooltipCTN content="Descargar como imagen">
            <Button
              isIconOnly
              size="sm"
              onPress={downloadImage}
              className="text-white opacity-0 group-hover/card:opacity-100 bg-black/10"
            >
              <DownloadIcon className="size-4" />
              <span className="sr-only">Descargar como Imagen</span>
            </Button>
          </TooltipCTN>
        </div>
      </CardHeader>
      <CardBody className="p-2 space-y-2 md:p-8 md:space-y-4 text-main-h dark:text-main-dark">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ListIcon className="size-4 md:size-5 text-main-m dark:text-main-dark-m" />
            <h3 className="font-medium md:text-xl text-main dark:text-white">
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
        <ul className="space-y-3 list-disc list-inside">
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
        <div className="flex flex-col items-center justify-center gap-2 mt-4 md:flex-row md:gap-4">
          <div className="p-3 text-sm bg-gray-100 rounded-lg dark:bg-dark text-main-h dark:text-white">
            <h3 className="font-sans text-xl font-extrabold uppercase">
              Recomendación
            </h3>
            <p className="text-main-h dark:text-main-dark">
              {moodTracking.suggestion}
            </p>
          </div>
          <div className="p-3 text-sm border-4 border-gray-100 dark:border-dark text-main-h dark:text-white rounded-3xl">
            <p className="text-main-h dark:text-main-dark">
              {moodTracking.tip}
            </p>
          </div>
        </div>
        {moodTracking.poeticPhrase && (
          <div className="flex flex-col items-center justify-center p-3 space-y-2 text-sm text-main-h dark:text-white">
            <div className="inline-flex gap-2">
              <QuoteLeftIcon className="min-w-6 size-6 text-main-l dark:text-main-dark-l" />
              <p className="text-main-h dark:text-main-dark-h text-wrap">
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
