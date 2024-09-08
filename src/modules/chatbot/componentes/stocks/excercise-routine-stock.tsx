"use client";

import TooltipCTN from "@/modules/core/components/ui/utils/tooltip-ctn";
import { ClockIcon } from "@/modules/icons/status";

import Image from "next/image";
import { toPng } from "html-to-image";
import { DownloadIcon } from "@radix-ui/react-icons";
import { Fragment, useCallback, useRef } from "react";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Chip,
  Image as ImageUI,
  Divider,
  CardFooter,
} from "@nextui-org/react";
import { toast } from "sonner";
import {
  EquipmentIcon,
  ProgressionIcon,
  RestIcon,
} from "@/modules/icons/miscellaneus";

export interface Exercise {
  name: string;
  reps?: number;
  sets?: number;
  duration?: string;
  rest?: string;
  progression: string;
  equipment?: string;
}

export interface Routine {
  exercises: Exercise[];
  durationWeeks: number;
  goal: string;
  fitnessLevel: string;
  recommendations?: string;
}

const renderExerciseDetails = (exercise: Exercise) => {
  return (
    <>
      <h3 className="text-base md:text-lg text-center font-medium text-base-color dark:text-white">
        {exercise.name}
      </h3>
      <div className="ml-3 inline-flex flex-col items-center justify-center gap-2 text-base-color-h dark:text-base-color-dark-h">
        <div className="flex gap-2">
          {exercise.reps && (
            <div className="inline-flex items-center gap-1">
              <span>{exercise.reps} repeticiones</span>
            </div>
          )}
          -
          {exercise.sets && (
            <div className="inline-flex items-center gap-1">
              <span>{exercise.sets} series</span>
            </div>
          )}
        </div>
        {exercise.duration && (
          <div className="inline-flex items-center gap-1">
            <TooltipCTN placement="left" content="Duración">
              <div aria-hidden="true">
                <ClockIcon className="size-3" />
              </div>
            </TooltipCTN>
            <span>{exercise.duration}</span>
          </div>
        )}
        {exercise.rest && (
          <div className="inline-flex items-center gap-1">
            <TooltipCTN placement="left" content="Descanso">
              <div aria-hidden="true">
                <RestIcon className="size-3.5" />
              </div>
            </TooltipCTN>
            <span>{exercise.rest}</span>
          </div>
        )}
        {exercise.equipment && (
          <div className="inline-flex items-center gap-1">
            <TooltipCTN placement="left" content="Equipamiento">
              <div aria-hidden="true">
                <EquipmentIcon className="size-3" />
              </div>
            </TooltipCTN>
            <span>{exercise.equipment}</span>
          </div>
        )}
        {exercise.progression && (
          <div className="inline-flex md:items-center gap-1">
            <TooltipCTN placement="left" content="Progresión">
              <div aria-hidden="true" className="mt-1 md:mt-0">
                <ProgressionIcon className="size-3" />
              </div>
            </TooltipCTN>
            <span>{exercise.progression}</span>
          </div>
        )}
      </div>
    </>
  );
};

const ExerciseRoutineStock = ({ props: routine }: { props: Routine }) => {
  const cardRef = useRef<HTMLDivElement>(null);

  const downloadImage = useCallback(() => {
    const node = cardRef.current;
    if (node) {
      toPng(node)
        .then((dataUrl) => {
          const link = document.createElement("a");
          link.download = "exercise-routine.png";
          link.href = dataUrl;
          link.click();
        })
        .catch((error) => {
          console.error("Error generating image:", error);
        });
    }
  }, []);

  if (!routine)
    return toast.error("Hubo un error al generar la rutina de ejercicio");

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
          height={360}
          quality={100}
          src="/extras/exercise-routine-banner.jpg"
          alt="Exercise Routine Banner"
          radius="none"
          classNames={{
            wrapper: "h-[200px] overflow-hidden",
            img: "w-auto object-cover object-top",
          }}
        />
        <div className="z-10 pointer-events-none absolute inset-0 bg-gradient-to-b from-black/60 to-transparent to-70%"></div>
        <div className="z-10 absolute top-0 inset-x-0 w-full flex justify-between p-4 md:p-8">
          <Chip color="danger" className="shadow-md">
            Rutina de Ejercicios
          </Chip>
          <TooltipCTN content="Descargar como imagen">
            <Button
              isIconOnly
              size="sm"
              onPress={downloadImage}
              className=" bg-black/50 text-white backdrop-blur backdrop-saturate-150"
            >
              <DownloadIcon className="size-3" />
              <span className="sr-only">Descargar como Imagen</span>
            </Button>
          </TooltipCTN>
        </div>
      </CardHeader>
      <CardBody className="p-4 md:p-8 space-y-4 text-base-color-h dark:text-base-color-dark">
        <div className="flex flex-col md:flex-row gap-2">
          <div className="flex md:w-1/2 gap-2">
            <div className="flex flex-col w-full p-3 text-xs md:text-sm bg-gray-100 dark:bg-base-dark text-base-color-h dark:text-white rounded-lg">
              <h3 className="font-extrabold font-sans uppercase">Objetivo</h3>
              <p>{routine.goal}</p>
            </div>
            <div className="flex flex-col w-full p-3 text-xs md:text-sm bg-gray-100 dark:bg-base-dark text-base-color-h dark:text-white rounded-lg">
              <h3 className="font-extrabold font-sans uppercase">Duración</h3>
              <p>{routine.durationWeeks} semanas</p>
            </div>
          </div>
          <div className="flex flex-col md:w-1/2 p-3 text-xs md:text-sm bg-gray-100 dark:bg-base-dark text-base-color-h dark:text-white rounded-lg">
            <h3 className="font-extrabold font-sans uppercase">
              Nivel de Condición Física
            </h3>
            <p>{routine.fitnessLevel}</p>
          </div>
        </div>
        <div className="flex items-center justify-center md:!mt-8">
          <div className="flex flex-col md:flex-row items-center justify-between w-full text-sm space-y-2 md:space-y-0">
            <Chip
              variant="dot"
              classNames={{
                base: "border-gray-100 dark:border-white/10",
                content: "font-semibold",
                dot: "bg-[hsl(var(--chart-4))]",
              }}
            >
              Misceláneas
            </Chip>
            <div className="inline-flex items-center gap-1.5">
              <div aria-hidden="true">
                <ClockIcon className="size-4" />
              </div>
              <span>Duración</span>
            </div>
            <div className="inline-flex items-center gap-1.5">
              <div aria-hidden="true">
                <RestIcon className="size-4" />
              </div>
              <span>Descanso</span>
            </div>
            <div className="inline-flex items-center gap-1.5">
              <div aria-hidden="true">
                <EquipmentIcon className="size-4" />
              </div>
              <span>Equipamiento</span>
            </div>
            <div className="inline-flex items-center gap-1.5">
              <div aria-hidden="true">
                <ProgressionIcon className="size-4" />
              </div>
              <span>Progresión</span>
            </div>
          </div>
        </div>
        <Divider className="bg-gray-200 dark:bg-base-dark" />
        <ul className="list-disc list-inside space-y-3">
          {routine.exercises.map((exercise, index) => (
            <Fragment key={index}>
              <li className="flex flex-col items-center justify-center gap-2 text-xs md:text-sm">
                {renderExerciseDetails(exercise)}
              </li>
              <Divider className="bg-gray-200 dark:bg-base-dark last:hidden" />
            </Fragment>
          ))}
        </ul>
        <Divider className="mx-4 md:mx-8 w-auto bg-gray-200 dark:bg-base-dark" />
      </CardBody>
      <CardFooter className="p-4 md:p-8 !pt-0 justify-center items-center">
        {routine.recommendations && (
          <div className="p-3 text-xs md:text-sm bg-gray-100 dark:bg-base-dark text-base-color-h dark:text-white rounded-lg">
            <h3 className="text-lg md:text-xl font-extrabold font-sans uppercase">
              Recomendaciones
            </h3>
            <p>{routine.recommendations}</p>
          </div>
        )}
      </CardFooter>
    </Card>
  );
};

export default ExerciseRoutineStock;
