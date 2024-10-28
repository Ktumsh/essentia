"use client";

import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Chip,
  Image as ImageUI,
  Divider,
  CardFooter,
  Tabs,
  Tab,
} from "@nextui-org/react";
import Image from "next/image";
import { Fragment } from "react";
import { toast } from "sonner";

import TooltipCTN from "@/modules/core/components/ui/utils/tooltip-ctn";
import { DownloadIcon } from "@/modules/icons/action";
import { CheckCircledIcon, WarningCircledIcon } from "@/modules/icons/common";
import { ExcerciseIcon } from "@/modules/icons/interface";
import {
  EquipmentIcon,
  ItineraryIcon,
  ProgressionIcon,
  QuestionFillIcon,
  RestIcon,
  ZapIcon,
} from "@/modules/icons/miscellaneus";
import { CalendarFillIcon, ClockIcon } from "@/modules/icons/status";
import { cn } from "@/utils/common";

import { useDownloadTool } from "../../hooks/use-download-tool";

export interface Exercise {
  name: string;
  reps?: number;
  sets?: number;
  duration?: string;
  rest?: string;
  progression: string;
  equipment?: string;
  instructions?: string;
  benefits?: string;
  modifications?: string;
}

export interface Routine {
  exercises: Exercise[];
  durationWeeks: number;
  goal: string;
  fitnessLevel: string;
  recommendations?: string;
  warmUp?: string;
  coolDown?: string;
  schedule?: Array<{
    day: string;
    exercises: string[];
  }>;
}

const renderExerciseDetails = (exercise: Exercise) => {
  return (
    <>
      <Tabs
        aria-label="Alternar entre instrucciones del ejercicio"
        isVertical
        variant="light"
        classNames={{
          wrapper: "gap-2 md:gap-4",
          cursor: "bg-gray-100 dark:bg-dark shadow-none",
          tabList: "px-0",
          tabContent:
            "text-main-m dark:text-main-dark-m group-data-[selected=true]:text-main-h dark:group-data-[selected=true]:text-main-dark",
          panel: "min-h-[272px] sm:min-h-56 md:min-h-[260px] px-0",
        }}
      >
        <Tab
          key="exercise"
          aria-label="Ejercicio"
          title={<ExcerciseIcon aria-hidden="true" className="size-4" />}
        >
          <h3 className="font-medium text-main md:text-lg dark:text-white">
            {exercise.name}
          </h3>
          <div className="inline-flex flex-col justify-center gap-2 text-main-h dark:text-main-dark-h">
            <div className="flex gap-2">
              {exercise.reps && (
                <div className="inline-flex items-center gap-1">
                  <span>{exercise.reps} repeticiones</span>
                </div>
              )}
              {exercise.reps && "-"}
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
                    <RestIcon className="size-3" />
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
              <div className="inline-flex gap-1 md:items-center">
                <TooltipCTN placement="left" content="Progresión">
                  <div aria-hidden="true" className="mt-1 md:mt-0">
                    <ProgressionIcon className="size-3" />
                  </div>
                </TooltipCTN>
                <span>{exercise.progression}</span>
              </div>
            )}
            {exercise.modifications && (
              <div className="inline-flex items-center gap-1">
                <TooltipCTN placement="left" content="Modificaciones">
                  <div aria-hidden="true">
                    <ItineraryIcon className="size-3" />
                  </div>
                </TooltipCTN>
                <span>{exercise.modifications}</span>
              </div>
            )}
            {exercise.benefits && (
              <div className="flex items-center gap-3 p-3 text-xs bg-gray-100 rounded-lg w-fit md:text-sm dark:bg-dark text-main-h dark:text-white">
                <div className="flex items-center justify-center bg-white rounded-lg min-w-8 md:min-w-10 size-8 md:size-10 dark:bg-full-dark text-warning">
                  <ZapIcon className="opacity-50 size-5 md:size-6" />
                </div>
                <div className="flex flex-col ">
                  <h3 className="font-sans font-extrabold uppercase">
                    Beneficios
                  </h3>
                  <p className="dark:text-main-dark-h">{exercise.benefits}</p>
                </div>
              </div>
            )}
          </div>
        </Tab>
        <Tab
          key="how-to-do"
          aria-label="Instrucciones"
          title={<QuestionFillIcon aria-hidden="true" className="size-4" />}
        >
          <div className="flex flex-col h-full gap-2 md:items-center md:justify-center md:text-center">
            <h3 className="text-base font-medium md:text-lg text-main dark:text-white">
              Instrucciones
            </h3>
            <p>{exercise.instructions || "No hay instrucciones disponibles"}</p>
          </div>
        </Tab>
      </Tabs>
    </>
  );
};

const ExerciseRoutineStock = ({ props: routine }: { props: Routine }) => {
  const { ref, downloadImage } = useDownloadTool("exercise-routine.png");

  if (!routine)
    return toast.error("Hubo un error al generar la rutina de ejercicio");

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
          width={639}
          height={360}
          quality={100}
          src="/extras/exercise-routine-banner.jpg"
          alt="Exercise Routine Banner"
          radius="none"
          classNames={{
            wrapper: "h-36 md:h-[200px] overflow-hidden",
            img: "!h-auto object-cover object-top",
          }}
        />
        <div className="z-10 pointer-events-none absolute inset-0 bg-gradient-to-b from-black/30 to-transparent to-70%"></div>
        <div className="absolute inset-x-0 top-0 z-10 flex justify-between w-full p-4 md:p-8">
          <Chip color="danger" className="shadow-md">
            Rutina de Ejercicios
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
        <div className="flex items-center justify-center">
          <div className="flex flex-col items-center justify-between w-full space-y-2 text-xs md:flex-row md:text-sm md:space-y-0 md:space-x-4">
            <Chip
              variant="dot"
              classNames={{
                base: "border-gray-100 dark:border-white/10",
                content: "font-semibold",
                dot: "bg-[hsl(var(--chart-4))]",
              }}
            >
              Diccionario
            </Chip>
            <div className="flex flex-wrap w-full gap-4">
              <div className="inline-flex items-center gap-1.5">
                <div aria-hidden="true">
                  <ExcerciseIcon className="size-4" />
                </div>
                <span>Ejercicio</span>
              </div>
              <div className="inline-flex items-center gap-1.5">
                <div aria-hidden="true">
                  <QuestionFillIcon className="size-4" />
                </div>
                <span>Instrucciones</span>
              </div>
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
              <div className="inline-flex items-center gap-1.5">
                <div aria-hidden="true">
                  <ItineraryIcon className="size-4" />
                </div>
                <span>Modificaciones</span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col md:flex-row gap-2 md:!mt-8">
          <div className="flex gap-2 md:w-1/2">
            <div className="flex flex-col w-full p-3 text-xs bg-gray-100 rounded-lg md:text-sm dark:bg-dark text-main-h dark:text-white">
              <h3 className="font-sans font-extrabold uppercase">Objetivo</h3>
              <p className="dark:text-main-dark-h">{routine.goal}</p>
            </div>
            <div className="flex flex-col w-full p-3 text-xs bg-gray-100 rounded-lg md:text-sm dark:bg-dark text-main-h dark:text-white">
              <h3 className="font-sans font-extrabold uppercase">Duración</h3>
              <p className="dark:text-main-dark-h">
                {routine.durationWeeks} semanas
              </p>
            </div>
          </div>
          <div className="flex flex-col p-3 text-xs bg-gray-100 rounded-lg md:w-1/2 md:text-sm dark:bg-dark text-main-h dark:text-white">
            <h3 className="font-sans font-extrabold uppercase">
              Nivel de Condición Física
            </h3>
            <p className="dark:text-main-dark-h">{routine.fitnessLevel}</p>
          </div>
        </div>
        {routine.warmUp && (
          <div className="flex items-center w-full gap-3 p-3 text-xs bg-gray-100 rounded-lg md:text-sm dark:bg-dark text-main-h dark:text-white">
            <WarningCircledIcon className="opacity-50 min-w-8 md:min-w-10 size-8 md:size-10 text-secondary" />
            <div className="flex flex-col">
              <h3 className="font-sans font-extrabold uppercase">
                Antes de comenzar
              </h3>
              <p className="dark:text-main-dark-h">{routine.warmUp}</p>
            </div>
          </div>
        )}

        <Divider className="bg-gray-200 dark:bg-dark" />
        <ul className="space-y-2 md:space-y-4">
          {routine.exercises.map((exercise, index) => (
            <Fragment key={index}>
              <li className="flex flex-col justify-center gap-2 text-xs md:text-sm">
                {renderExerciseDetails(exercise)}
              </li>
              <Divider className="bg-gray-200 dark:bg-dark last:hidden" />
            </Fragment>
          ))}
        </ul>
        <Divider className="w-auto bg-gray-200 dark:bg-dark" />
      </CardBody>
      <CardFooter className="flex-col space-y-2 md:space-y-4 p-2 md:p-8 !pt-0 justify-center items-center">
        {routine.coolDown && (
          <div className="flex items-center w-full gap-3 p-3 text-xs bg-gray-100 rounded-lg md:text-sm dark:bg-dark text-main-h dark:text-white">
            <CheckCircledIcon className="opacity-50 min-w-8 md:min-w-10 size-8 md:size-10 text-success" />
            <div className="flex flex-col">
              <h3 className="font-sans font-extrabold uppercase">
                Al finalizar
              </h3>
              <p className="dark:text-main-dark-h">{routine.coolDown}</p>
            </div>
          </div>
        )}
        {routine.schedule && (
          <div className="flex flex-col w-full p-2 space-y-2 text-xs bg-gray-100 rounded-lg md:p-3 md:space-y-3 md:text-sm dark:bg-dark text-main-h dark:text-white">
            <div className="inline-flex items-center justify-center h-full gap-2">
              <CalendarFillIcon className="size-4 text-main-m dark:text-main-dark-m" />
              <h3 className="font-sans font-extrabold uppercase">
                Programa semanal
              </h3>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {routine.schedule.map((daySchedule, index) => (
                <div
                  key={index}
                  className={cn(
                    "bg-white dark:bg-full-dark p-3 rounded-lg space-y-2",
                    index % 2 === 0 ? "last:col-span-2" : null
                  )}
                >
                  <h4 className="text-sm font-semibold text-center md:text-main dark:text-main-dark">
                    {daySchedule.day}
                  </h4>
                  <ul className="text-xs text-center md:text-sm dark:text-main-dark-h">
                    {daySchedule.exercises.map((exerciseName, idx) => (
                      <li key={idx}>{exerciseName}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        )}
        {routine.recommendations && (
          <div className="p-3 text-xs bg-gray-100 rounded-lg md:text-sm dark:bg-dark text-main-h dark:text-white">
            <h3 className="font-sans text-lg font-extrabold uppercase md:text-xl">
              Recomendaciones
            </h3>
            <p className="dark:text-main-dark-h">{routine.recommendations}</p>
          </div>
        )}
      </CardFooter>
    </Card>
  );
};

export default ExerciseRoutineStock;
