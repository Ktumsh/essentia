"use client";

import { DownloadIcon } from "@/modules/icons/action";
import TooltipCTN from "@/modules/core/components/ui/utils/tooltip-ctn";
import Image from "next/image";
import { HeartIcon, ListIcon } from "@/modules/icons/miscellaneus";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Chip,
  Image as ImageUI,
  Divider,
} from "@nextui-org/react";
import { toast } from "sonner";
import { useDownloadTool } from "../../hooks/use-download-tool";
import { QuoteLeftIcon } from "@/modules/icons/common";

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
      className="group/card bg-white dark:bg-base-full-dark"
    >
      <CardHeader className="relative p-0 rounded-none z-0">
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
        <div className="z-10 absolute top-0 inset-x-0 w-full flex justify-between p-2 md:p-8">
          <Chip color="danger" className="shadow-md">
            Actividades de Bienestar
          </Chip>
          <TooltipCTN content="Descargar como imagen">
            <Button
              isIconOnly
              size="sm"
              onPress={downloadImage}
              className="opacity-0 group-hover/card:opacity-100 bg-black/10 text-white"
            >
              <DownloadIcon className="size-4" />
              <span className="sr-only">Descargar como Imagen</span>
            </Button>
          </TooltipCTN>
        </div>
      </CardHeader>
      <CardBody className="p-2 md:p-8 space-y-2 md:space-y-4 text-base-color-h dark:text-base-color-dark">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ListIcon className="size-4 md:size-5 text-base-color-m dark:text-base-color-dark-m" />
            <h3 className="md:text-xl font-medium text-base-color dark:text-white">
              Actividades recomendadas
            </h3>
          </div>
          <Chip
            size="sm"
            variant="flat"
            className="bg-black/10 dark:bg-white/10"
          >
            <HeartIcon className="size-4 text-base-color-m dark:text-base-color-dark-m" />
          </Chip>
        </div>
        <ul className="list-disc list-inside space-y-3">
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
                    "text-md md:text-base font-semibold text-base-color-h dark:text-base-color-dark",
                }}
              >
                {mood.activity}
              </Chip>
              <p className="ml-4 text-base-color-h dark:text-base-color-dark-h">
                {mood.description}
              </p>
            </li>
          ))}
        </ul>
        <Divider className="bg-gray-200 dark:bg-base-dark" />
        <div className="flex flex-col md:flex-row items-center justify-center gap-2 md:gap-4 mt-4">
          <div className="p-3 text-sm bg-gray-100 dark:bg-base-dark text-base-color-h dark:text-white rounded-lg">
            <h3 className="text-xl font-extrabold font-sans uppercase">
              Recomendación
            </h3>
            <p className="text-base-color-h dark:text-base-color-dark">
              {moodTracking.suggestion}
            </p>
          </div>
          <div className="p-3 text-sm border-4 border-gray-100 dark:border-base-dark text-base-color-h dark:text-white rounded-3xl">
            <p className="text-base-color-h dark:text-base-color-dark">
              {moodTracking.tip}
            </p>
          </div>
        </div>
        {moodTracking.poeticPhrase && (
          <div className="flex flex-col items-center justify-center p-3 text-sm text-base-color-h dark:text-white space-y-2">
            <div className="inline-flex gap-2">
              <QuoteLeftIcon className="min-w-6 size-6 text-base-color-d dark:text-base-color-dark-d" />
              <p className="text-base-color-h dark:text-base-color-dark-h text-wrap">
                {moodTracking.poeticPhrase.phrase}
              </p>
            </div>
            {moodTracking.poeticPhrase.author !== "Anónimo" &&
              moodTracking.poeticPhrase.author !== "Desconocido" && (
                <p className="text-xs text-base-color-m dark:text-base-color-dark-m">
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
