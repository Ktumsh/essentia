"use client";

import { ArrowDownToLine } from "lucide-react";
import Image from "next/image";
import { Fragment } from "react";
import { toast } from "sonner";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardFooter, CardHeader } from "@/components/ui/card";
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
import { Routine } from "../../lib/ai/tool-schemas";

const renderExerciseDetails = (routine: Routine["exercises"][number]) => {
  return (
    <>
      <Tabs
        aria-label="Alternar entre instrucciones del ejercicio"
        defaultValue="exercises"
      >
        <TabsList className="dark:border-dark border border-gray-200">
          <TabsTrigger value="exercises">Ejercicio</TabsTrigger>
          <TabsTrigger value="how-to-do">Instrucciones</TabsTrigger>
        </TabsList>
        <TabsContent value="exercises" className="px-0">
          <div className="flex flex-col">
            <h3 className="text-main font-medium md:text-lg dark:text-white">
              {routine.name}
            </h3>
            <div className="text-main-h dark:text-main-dark-h inline-flex flex-col justify-center gap-2">
              {routine.reps && routine.sets && (
                <div className="flex gap-2">
                  {routine.reps && (
                    <div className="inline-flex items-center gap-1">
                      <span>{routine.reps} repeticiones</span>
                    </div>
                  )}
                  {routine.reps && "-"}
                  {routine.sets && (
                    <div className="inline-flex items-center gap-1">
                      <span>{routine.sets} series</span>
                    </div>
                  )}
                </div>
              )}
              {routine.duration && (
                <div className="inline-flex items-center gap-1">
                  <BetterTooltip side="left" content="Duración">
                    <div aria-hidden="true">
                      <ClockIcon className="size-3" />
                    </div>
                  </BetterTooltip>
                  <span>{routine.duration}</span>
                </div>
              )}
              {routine.rest && (
                <div className="inline-flex items-center gap-1">
                  <BetterTooltip side="left" content="Descanso">
                    <div aria-hidden="true">
                      <RestIcon className="size-3" />
                    </div>
                  </BetterTooltip>
                  <span>{routine.rest}</span>
                </div>
              )}
              {routine.equipment && (
                <div className="inline-flex items-center gap-1">
                  <BetterTooltip side="left" content="Equipamiento">
                    <div aria-hidden="true">
                      <EquipmentIcon className="size-3" />
                    </div>
                  </BetterTooltip>
                  <span>{routine.equipment}</span>
                </div>
              )}
              {routine.progression && (
                <div className="inline-flex gap-1 md:items-center">
                  <BetterTooltip side="left" content="Progresión">
                    <div aria-hidden="true" className="mt-1 md:mt-0">
                      <ProgressionIcon className="size-3" />
                    </div>
                  </BetterTooltip>
                  <span>{routine.progression}</span>
                </div>
              )}
              {routine.modifications && (
                <div className="inline-flex items-center gap-1">
                  <BetterTooltip side="left" content="Modificaciones">
                    <div aria-hidden="true">
                      <ItineraryIcon className="size-3" />
                    </div>
                  </BetterTooltip>
                  <span>{routine.modifications}</span>
                </div>
              )}
              {routine.benefits && (
                <div className="text-main-h dark:bg-dark flex w-fit items-center gap-3 rounded-lg bg-gray-100 p-3 text-xs md:text-sm dark:text-white">
                  <div className="dark:bg-full-dark flex size-8 min-w-8 items-center justify-center rounded-lg bg-white text-amber-400 md:size-10 md:min-w-10">
                    <ZapIcon className="size-5 opacity-50 md:size-6" />
                  </div>
                  <div className="flex flex-col">
                    <h3 className="font-sans font-extrabold uppercase">
                      Beneficios
                    </h3>
                    <p className="dark:text-main-dark-h">{routine.benefits}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </TabsContent>
        <TabsContent
          value="how-to-do"
          className="min-h-[272px] px-5 sm:min-h-56 md:min-h-[260px]"
        >
          <div className="flex min-h-[272px] items-center justify-center gap-2 sm:min-h-56 md:min-h-[260px]">
            <div className="text-center md:max-w-sm">
              <p>
                {routine.instructions || "No hay instrucciones disponibles"}
              </p>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </>
  );
};

const RoutineStock = (routine: Routine) => {
  const { ref, downloadImage } = useDownloadTool("exercise-routine.png");

  if (!routine)
    return toast.error("Hubo un error al generar la rutina de ejercicios");

  return (
    <Card ref={ref} className="group/card overflow-hidden rounded-xl">
      <CardHeader className="relative z-0 rounded-none p-0">
        <div className="h-36 overflow-hidden md:h-52">
          <Image
            width={696}
            height={208}
            quality={80}
            src="/extras/exercise-routine-banner.jpg"
            alt="Exercise Routine Banner"
            className="aspect-auto h-36 object-cover object-center md:h-52"
          />
        </div>
        <div className="absolute inset-x-0 top-0 z-10 mt-0! flex w-full justify-between p-6">
          <Badge className="shadow-md">Rutina de Ejercicios</Badge>
          <BetterTooltip content="Descargar como imagen">
            <Button
              size="icon"
              onClick={downloadImage}
              className="absolute top-6 right-6 z-10 size-8 bg-black/20! text-white shadow-none group-hover/card:opacity-100 hover:bg-black/30! active:bg-black/30 md:opacity-0"
            >
              <ArrowDownToLine className="size-3.5!" />
              <span className="sr-only">Descargar como Imagen</span>
            </Button>
          </BetterTooltip>
        </div>
      </CardHeader>
      <div className="text-main-h dark:text-main-dark space-y-2 p-2 md:space-y-4 md:p-6">
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
            <div className="text-main-h dark:bg-dark flex w-full flex-col rounded-lg bg-gray-100 p-3 text-xs md:text-sm dark:text-white">
              <h3 className="font-sans font-extrabold uppercase">Objetivo</h3>
              <p className="dark:text-main-dark-h">{routine.goal}</p>
            </div>
            <div className="text-main-h dark:bg-dark flex w-full flex-col rounded-lg bg-gray-100 p-3 text-xs md:text-sm dark:text-white">
              <h3 className="font-sans font-extrabold uppercase">Duración</h3>
              <p className="dark:text-main-dark-h">
                {routine.durationWeeks} semanas
              </p>
            </div>
          </div>
          <div className="text-main-h dark:bg-dark flex flex-col rounded-lg bg-gray-100 p-3 text-xs md:w-1/2 md:text-sm dark:text-white">
            <h3 className="font-sans font-extrabold uppercase">
              Nivel de Condición Física
            </h3>
            <p className="dark:text-main-dark-h">{routine.fitnessLevel}</p>
          </div>
        </div>
        {routine.warmUp && (
          <div className="text-main-h dark:bg-dark flex w-full items-center gap-3 rounded-lg bg-gray-100 p-3 text-xs md:text-sm dark:text-white">
            <WarningCircledIcon className="size-8 shrink-0 text-red-500 md:size-10" />
            <div className="flex flex-col">
              <h3 className="font-sans font-extrabold uppercase">
                Antes de comenzar
              </h3>
              <p className="dark:text-main-dark-h">{routine.warmUp}</p>
            </div>
          </div>
        )}
        <ul className="space-y-2 md:space-y-4">
          {routine.exercises.map((exercise, index) => (
            <Fragment key={index}>
              <li className="flex flex-col justify-center gap-2 text-xs md:text-sm">
                {renderExerciseDetails(exercise)}
              </li>
            </Fragment>
          ))}
        </ul>
      </div>
      <CardFooter className="flex-col items-center justify-center space-y-2 p-2 pt-0! md:space-y-4 md:p-6">
        {routine.coolDown && (
          <div className="text-main-h dark:bg-dark flex w-full items-center gap-3 rounded-lg bg-gray-100 p-3 text-xs md:text-sm dark:text-white">
            <CheckCircledIcon className="size-8 min-w-8 text-green-500 md:size-10 md:min-w-10" />
            <div className="flex flex-col">
              <h3 className="font-sans font-extrabold uppercase">
                Al finalizar
              </h3>
              <p className="dark:text-main-dark-h">{routine.coolDown}</p>
            </div>
          </div>
        )}
        {routine.schedule && (
          <div className="text-main-h dark:bg-dark flex w-full flex-col space-y-2 rounded-lg bg-gray-100 p-2 text-xs md:space-y-3 md:p-3 md:text-sm dark:text-white">
            <div className="inline-flex h-full items-center justify-center gap-2">
              <CalendarFillIcon className="text-main-m dark:text-main-dark-m size-4" />
              <h3 className="font-sans font-extrabold uppercase">
                Programa semanal
              </h3>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {routine.schedule.map((daySchedule, index) => (
                <div
                  key={index}
                  className={cn(
                    "prose dark:bg-full-dark flex flex-col items-center rounded-lg bg-white p-2 md:p-3",
                    {
                      "last:col-span-2": index % 2 === 0,
                    },
                  )}
                >
                  <h4 className="dark:text-main-dark md:text-main text-center text-sm font-semibold">
                    {daySchedule.day}
                  </h4>
                  <ul className="dark:text-main-dark-h w-fit text-xs md:text-sm">
                    {daySchedule.exercises.map((exerciseName, idx) => (
                      <li key={idx} className="pl-0 md:pl-[.375em]">
                        {exerciseName}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        )}
        {routine.recommendations && (
          <div className="text-main-h dark:bg-dark rounded-lg bg-gray-100 p-3 text-xs md:text-sm dark:text-white">
            <h3 className="font-sans text-base font-extrabold uppercase md:text-xl">
              Recomendaciones
            </h3>
            <p className="dark:text-main-dark-h">{routine.recommendations}</p>
          </div>
        )}
      </CardFooter>
    </Card>
  );
};

export default RoutineStock;
