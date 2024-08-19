"use client";

import { useCallback, useRef } from "react";

import { DownloadIcon } from "@radix-ui/react-icons";
import { toPng } from "html-to-image";
import TooltipCTN from "@/modules/core/components/ui/tooltip-ctn";
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

interface Activity {
  activity: string;
}

export interface MoodTracking {
  mood: Activity[];
  suggestion: string;
  tip: string;
}

const MoodTrackingStock = ({
  props: moodTracking,
}: {
  props: MoodTracking;
}) => {
  const cardRef = useRef<HTMLDivElement>(null);

  const downloadImage = useCallback(() => {
    const node = cardRef.current;
    if (node) {
      toPng(node)
        .then((dataUrl) => {
          const link = document.createElement("a");
          link.download = "mood-tracking.png";
          link.href = dataUrl;
          link.click();
        })
        .catch((error) => {
          console.error("Error generating image:", error);
        });
    }
  }, []);

  if (!moodTracking)
    return toast.error("Hubo un error al generar las actividades de bienestar");

  return (
    <Card
      ref={cardRef}
      radius="md"
      className="bg-white dark:bg-base-full-dark shadow-lg"
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
            wrapper: "h-[200px] overflow-hidden",
            img: "w-auto object-cover object-top",
          }}
        />
        <div className="z-10 pointer-events-none absolute inset-0 bg-gradient-to-b from-black/60 to-transparent to-70%"></div>
        <div className="z-10 absolute top-0 inset-x-0 w-full flex justify-between p-4 md:p-8">
          <Chip color="danger" className="shadow-md">
            Actividades de Bienestar
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
      <CardBody className="p-4 md:p-8 space-y-4 text-base-color-h dark:text-base-color-dark">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ListIcon className="size-5 text-base-color-m dark:text-base-color-dark-m" />
            <h3 className="text-lg md:text-xl font-medium text-base-color dark:text-white">
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
              className="flex flex-col justify-center gap-2 text-xs md:text-sm"
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
            </li>
          ))}
        </ul>
        <Divider className="bg-gray-200 dark:bg-base-dark" />
        <div className="flex flex-col md:flex-row items-center justify-center gap-4 mt-4">
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
      </CardBody>
    </Card>
  );
};

export default MoodTrackingStock;
