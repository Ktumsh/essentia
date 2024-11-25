"use client";

import { ArrowDownToLine } from "lucide-react";
import Image from "next/image";
import { Fragment } from "react";
import { toast } from "sonner";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardFooter, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BetterTooltip } from "@/components/ui/tooltip";
import { CheckCircledIcon, WarningCircledIcon } from "@/modules/icons/common";
import {
  EquipmentIcon,
  ItineraryIcon,
  ProgressionIcon,
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
        defaultValue="exercises"
      >
        <TabsList>
          <TabsTrigger value="exercises">Ejercicio</TabsTrigger>
          <TabsTrigger value="how-to-do">Instrucciones</TabsTrigger>
        </TabsList>
        <TabsContent
          value="exercises"
          className="min-h-[272px] px-0 sm:min-h-56 md:min-h-[260px]"
        >
          <div className="flex flex-col">
            <h3 className="font-medium text-main dark:text-white md:text-lg">
              {exercise.name}
            </h3>
            <div className="inline-flex flex-col justify-center gap-2 text-main-h dark:text-main-dark-h">
              {exercise.reps && exercise.sets && (
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
              )}
              {exercise.duration && (
                <div className="inline-flex items-center gap-1">
                  <BetterTooltip side="left" content="Duración">
                    <div aria-hidden="true">
                      <ClockIcon className="size-3" />
                    </div>
                  </BetterTooltip>
                  <span>{exercise.duration}</span>
                </div>
              )}
              {exercise.rest && (
                <div className="inline-flex items-center gap-1">
                  <BetterTooltip side="left" content="Descanso">
                    <div aria-hidden="true">
                      <RestIcon className="size-3" />
                    </div>
                  </BetterTooltip>
                  <span>{exercise.rest}</span>
                </div>
              )}
              {exercise.equipment && (
                <div className="inline-flex items-center gap-1">
                  <BetterTooltip side="left" content="Equipamiento">
                    <div aria-hidden="true">
                      <EquipmentIcon className="size-3" />
                    </div>
                  </BetterTooltip>
                  <span>{exercise.equipment}</span>
                </div>
              )}
              {exercise.progression && (
                <div className="inline-flex gap-1 md:items-center">
                  <BetterTooltip side="left" content="Progresión">
                    <div aria-hidden="true" className="mt-1 md:mt-0">
                      <ProgressionIcon className="size-3" />
                    </div>
                  </BetterTooltip>
                  <span>{exercise.progression}</span>
                </div>
              )}
              {exercise.modifications && (
                <div className="inline-flex items-center gap-1">
                  <BetterTooltip side="left" content="Modificaciones">
                    <div aria-hidden="true">
                      <ItineraryIcon className="size-3" />
                    </div>
                  </BetterTooltip>
                  <span>{exercise.modifications}</span>
                </div>
              )}
              {exercise.benefits && (
                <div className="flex w-fit items-center gap-3 rounded-lg bg-gray-100 p-3 text-xs text-main-h dark:bg-dark dark:text-white md:text-sm">
                  <div className="flex size-8 min-w-8 items-center justify-center rounded-lg bg-white text-warning dark:bg-full-dark md:size-10 md:min-w-10">
                    <ZapIcon className="size-5 opacity-50 md:size-6" />
                  </div>
                  <div className="flex flex-col">
                    <h3 className="font-sans font-extrabold uppercase">
                      Beneficios
                    </h3>
                    <p className="dark:text-main-dark-h">{exercise.benefits}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </TabsContent>
        <TabsContent
          value="how-to-do"
          className="min-h-[272px] px-0 sm:min-h-56 md:min-h-[260px]"
        >
          <div className="flex min-h-[272px] gap-2 sm:min-h-56 md:min-h-[260px] md:items-center md:justify-center">
            <div className="max-w-sm md:text-center">
              <p>
                {exercise.instructions || "No hay instrucciones disponibles"}
              </p>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </>
  );
};

const ExerciseRoutineStock = ({ props: routine }: { props: Routine }) => {
  const { ref, downloadImage } = useDownloadTool("exercise-routine.png");

  if (!routine)
    return toast.error("Hubo un error al generar la rutina de ejercicio");

  return (
    <Card ref={ref} className="group/card overflow-hidden rounded-xl">
      <CardHeader className="relative z-0 rounded-none p-0">
        <div className="flex h-52 items-center overflow-hidden">
          <Image
            width={696}
            height={392}
            quality={100}
            src="/extras/exercise-routine-banner.jpg"
            alt="Exercise Routine Banner"
            className="aspect-auto object-cover object-top"
          />
        </div>
        <div className="absolute inset-x-0 top-0 z-10 flex w-full justify-between p-2 md:p-6">
          <Badge className="shadow-md">Rutina de Ejercicios</Badge>
          <BetterTooltip content="Descargar como imagen">
            <Button
              size="icon"
              onClick={downloadImage}
              className="absolute right-6 top-6 z-10 size-8 !bg-black/20 text-white opacity-0 shadow-none hover:!bg-black/30 active:bg-black/30 group-hover/card:opacity-100"
            >
              <ArrowDownToLine className="!size-3.5" />
              <span className="sr-only">Descargar como Imagen</span>
            </Button>
          </BetterTooltip>
        </div>
      </CardHeader>
      <div className="space-y-2 p-2 text-main-h dark:text-main-dark md:space-y-4 md:p-6">
        <div className="flex items-center justify-center">
          <div className="flex w-full flex-1 flex-col items-center justify-between space-y-2 text-xs md:flex-row md:space-y-0 md:text-sm">
            <Badge variant="outline" className="gap-1">
              <span className="size-2 rounded-full bg-[hsl(var(--chart-4))]"></span>
              Diccionario:
            </Badge>
            <div className="space-x-4 text-xs">
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
        <div className="flex flex-col gap-2 md:mt-6 md:flex-row">
          <div className="flex gap-2 md:w-1/2">
            <div className="flex w-full flex-col rounded-lg bg-gray-100 p-3 text-xs text-main-h dark:bg-dark dark:text-white md:text-sm">
              <h3 className="font-sans font-extrabold uppercase">Objetivo</h3>
              <p className="dark:text-main-dark-h">{routine.goal}</p>
            </div>
            <div className="flex w-full flex-col rounded-lg bg-gray-100 p-3 text-xs text-main-h dark:bg-dark dark:text-white md:text-sm">
              <h3 className="font-sans font-extrabold uppercase">Duración</h3>
              <p className="dark:text-main-dark-h">
                {routine.durationWeeks} semanas
              </p>
            </div>
          </div>
          <div className="flex flex-col rounded-lg bg-gray-100 p-3 text-xs text-main-h dark:bg-dark dark:text-white md:w-1/2 md:text-sm">
            <h3 className="font-sans font-extrabold uppercase">
              Nivel de Condición Física
            </h3>
            <p className="dark:text-main-dark-h">{routine.fitnessLevel}</p>
          </div>
        </div>
        {routine.warmUp && (
          <div className="flex w-full items-center gap-3 rounded-lg bg-gray-100 p-3 text-xs text-main-h dark:bg-dark dark:text-white md:text-sm">
            <WarningCircledIcon className="size-8 min-w-8 text-danger md:size-10 md:min-w-10" />
            <div className="flex flex-col">
              <h3 className="font-sans font-extrabold uppercase">
                Antes de comenzar
              </h3>
              <p className="dark:text-main-dark-h">{routine.warmUp}</p>
            </div>
          </div>
        )}

        <Separator className="bg-gray-200 dark:bg-dark" />
        <ul className="space-y-2 md:space-y-4">
          {routine.exercises.map((exercise, index) => (
            <Fragment key={index}>
              <li className="flex flex-col justify-center gap-2 text-xs md:text-sm">
                {renderExerciseDetails(exercise)}
              </li>
              <Separator className="bg-gray-200 last:hidden dark:bg-dark" />
            </Fragment>
          ))}
        </ul>
        <Separator className="w-auto bg-gray-200 dark:bg-dark" />
      </div>
      <CardFooter className="flex-col items-center justify-center space-y-2 p-2 !pt-0 md:space-y-4 md:p-8">
        {routine.coolDown && (
          <div className="flex w-full items-center gap-3 rounded-lg bg-gray-100 p-3 text-xs text-main-h dark:bg-dark dark:text-white md:text-sm">
            <CheckCircledIcon className="size-8 min-w-8 text-success opacity-50 md:size-10 md:min-w-10" />
            <div className="flex flex-col">
              <h3 className="font-sans font-extrabold uppercase">
                Al finalizar
              </h3>
              <p className="dark:text-main-dark-h">{routine.coolDown}</p>
            </div>
          </div>
        )}
        {routine.schedule && (
          <div className="flex w-full flex-col space-y-2 rounded-lg bg-gray-100 p-2 text-xs text-main-h dark:bg-dark dark:text-white md:space-y-3 md:p-3 md:text-sm">
            <div className="inline-flex h-full items-center justify-center gap-2">
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
                    "space-y-2 rounded-lg bg-white p-3 dark:bg-full-dark",
                    index % 2 === 0 ? "last:col-span-2" : null,
                  )}
                >
                  <h4 className="text-center text-sm font-semibold dark:text-main-dark md:text-main">
                    {daySchedule.day}
                  </h4>
                  <ul className="text-center text-xs dark:text-main-dark-h md:text-sm">
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
          <div className="rounded-lg bg-gray-100 p-3 text-xs text-main-h dark:bg-dark dark:text-white md:text-sm">
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
