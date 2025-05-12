"use client";

import {
  Calendar,
  Clock,
  Dumbbell,
  Heart,
  ArrowUpCircle,
  Info,
  AlertCircle,
  CheckCircle2,
  Flame,
  Zap,
} from "lucide-react";
import { useState } from "react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/kit/accordion";
import { Badge } from "@/components/kit/badge";
import { Card } from "@/components/kit/card";
import { ScrollArea } from "@/components/kit/scroll-area";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/kit/tabs";
import { cn } from "@/lib/utils";

import StockFooter from "./stock-footer";
import StockHeader from "./stock-header";

import type { Routine } from "../../_lib/tool-schemas";

const RoutineStock = (routine: Routine) => {
  const [activeTab, setActiveTab] = useState("overview");

  /* const fileName = `${routine.goal.replace(" ", "-")}.png`;
  const { ref, downloadImage } = useDownloadTool(fileName); */

  return (
    <Card className="dark:shadow-alternative/15 dark:border-accent shadow-stock mb-8 w-full max-w-lg overflow-hidden rounded-3xl border-slate-100 transition-all duration-300">
      <StockHeader
        imageSrc="/extras/exercise-routine.png"
        title={routine.title ?? routine.goal}
        label="Rutina de ejercicios"
        infoItems={[
          {
            icon: <Calendar className="size-4" />,
            text: `${routine.durationWeeks} semanas`,
          },
          {
            icon: <Dumbbell className="size-4" />,
            text: `${routine.exercises.length} ejercicios`,
          },
        ]}
      />
      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="w-full gap-0"
      >
        <div className="dark:border-accent border-b border-slate-100 px-3 md:px-6">
          <TabsList className="h-14 w-full bg-transparent md:justify-start md:gap-8">
            {["overview", "exercises", "schedule"].map((tab) => (
              <TabsTrigger
                key={tab}
                value={tab}
                className="flex-1 rounded-none border-b-2 border-transparent px-0 font-medium capitalize transition-all duration-200 data-[state=active]:border-lime-500 data-[state=active]:text-lime-500 data-[state=active]:shadow-none md:flex-0 dark:data-[state=active]:text-lime-400"
              >
                {tab === "overview"
                  ? "Resumen"
                  : tab === "exercises"
                    ? "Ejercicios"
                    : "Programa"}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>
        <TabsContent
          value="overview"
          className="mt-0 focus-visible:ring-0 focus-visible:outline-none"
        >
          <ScrollArea className="h-[400px]">
            <div className="space-y-5 p-3 md:p-6">
              <div className="space-y-4">
                <OverviewSection
                  title="Calentamiento"
                  content={routine.warmUp}
                  icon={<Flame className="size-5 text-orange-500" />}
                />

                <OverviewSection
                  title="Enfriamiento"
                  content={routine.coolDown}
                  icon={<Clock className="size-5 text-blue-500" />}
                />

                <OverviewSection
                  title="Recomendaciones"
                  content={routine.recommendations}
                  icon={<Zap className="size-5 text-yellow-500" />}
                />
              </div>
            </div>
          </ScrollArea>
        </TabsContent>

        {/* Exercises Tab */}
        <TabsContent
          value="exercises"
          className="mt-0 focus-visible:ring-0 focus-visible:outline-none"
        >
          <ScrollArea className="h-[400px]">
            <Accordion
              type="single"
              collapsible
              className="space-y-3 p-3 md:p-6"
            >
              {routine.exercises.map((exercise, index) => (
                <ExerciseCard key={index} exercise={exercise} index={index} />
              ))}
            </Accordion>
          </ScrollArea>
        </TabsContent>

        {/* Schedule Tab */}
        <TabsContent
          value="schedule"
          className="mt-0 focus-visible:ring-0 focus-visible:outline-none"
        >
          <ScrollArea className="h-[400px]">
            <div className="space-y-4 p-3 md:p-6">
              {routine.schedule ? (
                routine.schedule.map((day, index) => (
                  <ScheduleCard key={index} schedule={day} />
                ))
              ) : (
                <div className="text-muted-foreground py-10 text-center">
                  No hay programa semanal disponible
                </div>
              )}
            </div>
          </ScrollArea>
        </TabsContent>
      </Tabs>
      <StockFooter />
    </Card>
  );
};

export default RoutineStock;

function OverviewSection({
  title,
  content,
  icon,
}: {
  title: string;
  content: string | React.ReactNode;
  icon: React.ReactNode;
}) {
  return (
    <div className="hover:bg-accent! dark:bg-accent/50 rounded-2xl bg-slate-50 p-4 transition-all duration-200">
      <div className="mb-2 flex items-center gap-2">
        {icon}
        <h3 className="text-foreground text-base font-semibold">{title}</h3>
      </div>
      <p className="text-muted-foreground text-sm leading-relaxed">
        {content || `No hay información de ${title.toLowerCase()} disponible.`}
      </p>
    </div>
  );
}

function ExerciseCard({
  exercise,
  index,
}: {
  exercise: Routine["exercises"][number];
  index: number;
}) {
  return (
    <AccordionItem
      value={`exercise-${index}`}
      className="dark:data-[state=open]:bg-accent/50 dark:border-accent overflow-hidden rounded-2xl border! border-slate-100 data-[state=open]:bg-slate-50"
    >
      <AccordionTrigger className="flex items-center p-4 hover:no-underline">
        <div className="flex items-center gap-3">
          <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-lime-100 text-sm font-medium text-lime-500 dark:bg-lime-900/30">
            {index + 1}
          </div>
          <h3 className="font-medium">{exercise.name}</h3>
        </div>
      </AccordionTrigger>
      <AccordionContent className="space-y-4 px-4 pt-0 pb-5">
        <div className="flex flex-wrap gap-2 pt-1">
          {exercise.sets && (
            <Badge
              variant="outline"
              className="bg-background rounded-full px-3 py-0.5 text-xs font-medium"
            >
              {exercise.sets} series
            </Badge>
          )}
          {exercise.reps && (
            <Badge
              variant="outline"
              className="bg-background rounded-full px-3 py-0.5 text-xs font-medium"
            >
              {exercise.reps} reps
            </Badge>
          )}
          {exercise.duration && (
            <Badge
              variant="outline"
              className="bg-background rounded-full px-3 py-0.5 text-xs font-medium"
            >
              {exercise.duration}
            </Badge>
          )}
          {exercise.rest && (
            <Badge
              variant="outline"
              className="bg-background rounded-full px-3 py-0.5 text-xs font-medium"
            >
              Descanso: {exercise.rest}
            </Badge>
          )}
        </div>
        {exercise.instructions && (
          <ExerciseDetail
            icon={<Info className="size-4 text-blue-500" />}
            title="Instrucciones"
            content={exercise.instructions}
          />
        )}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {exercise.equipment && (
            <ExerciseDetail
              icon={<Dumbbell className="size-4 text-gray-500" />}
              title="Equipamiento"
              content={exercise.equipment}
            />
          )}
          {exercise.progression && (
            <ExerciseDetail
              icon={<ArrowUpCircle className="size-4 text-green-500" />}
              title="Progresión"
              content={exercise.progression}
            />
          )}
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {exercise.benefits && (
            <ExerciseDetail
              icon={<Heart className="size-4 text-red-500" />}
              title="Beneficios"
              content={exercise.benefits}
            />
          )}
          {exercise.modifications && (
            <ExerciseDetail
              icon={<AlertCircle className="size-4 text-orange-500" />}
              title="Modificaciones"
              content={exercise.modifications}
            />
          )}
        </div>
      </AccordionContent>
    </AccordionItem>
  );
}

function ExerciseDetail({
  icon,
  title,
  content,
}: {
  icon: React.ReactNode;
  title: string;
  content: string | React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "bg-background space-y-1 rounded-2xl p-3",
        title === "Instrucciones" && "bg-transparent p-0",
      )}
    >
      <div className="text-foreground flex items-center gap-2 text-xs font-medium">
        {icon}
        {title}
      </div>
      <p className="text-muted-foreground pl-6 text-xs leading-relaxed">
        {content}
      </p>
    </div>
  );
}

function ScheduleCard({
  schedule,
}: {
  schedule: { exercises: string[]; day: string };
}) {
  return (
    <div className="dark:border-accent hover:shadow-little-pretty overflow-hidden rounded-2xl border border-slate-100 transition-all duration-200">
      <div className="dark:border-accent border-b border-slate-100 bg-blue-50 px-4 py-3 dark:bg-blue-900/20">
        <h3 className="text-foreground text-base font-medium">
          {schedule.day}
        </h3>
      </div>
      <div className="p-4">
        <ul className="space-y-2">
          {schedule.exercises.map((exercise, idx) => (
            <li
              key={idx}
              className="text-muted-foreground flex items-start text-sm"
            >
              <CheckCircle2 className="mt-0.5 mr-2 size-4 flex-shrink-0 text-blue-500" />
              <span>{exercise}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
