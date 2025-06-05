"use client";

import { motion } from "motion/react";
import { useMemo } from "react";

import RouteBadge from "@/app/(main)/(resources)/_components/route-badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { getRouteColor, getRouteDetails, cn } from "@/utils";

import type { Route, Stage } from "@/db/schema";

const ScoreCircle = ({ percentage }: { percentage: number }) => {
  const circumference = 2 * Math.PI * 45;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="relative size-48">
      <svg
        viewBox="0 0 100 100"
        role="img"
        aria-label={`Puntuación: ${percentage}%`}
        className="stroke-accent size-full"
      >
        {/* Círculo de fondo */}
        <circle cx="50" cy="50" r="45" fill="none" strokeWidth="8" />

        {/* Círculo de progreso animado */}
        <motion.circle
          cx="50"
          cy="50"
          r="45"
          fill="none"
          stroke="url(#gradient)"
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          transform="rotate(-90 50 50)"
        />

        {/* Gradiente para el círculo */}
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#6366f1" />
            <stop offset="100%" stopColor="#4f46e5" />
          </linearGradient>
        </defs>
      </svg>

      {/* Texto central */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <p className="font-mono text-4xl font-bold">
            {percentage}
            <span className="ml-1 font-mono text-3xl">%</span>
          </p>
          <p className="text-muted-foreground text-center text-sm">Logro</p>
        </motion.div>
      </div>
    </div>
  );
};

interface ResultVisualizationsProps {
  route: Route;
  stage: Stage;
  percentage: number;
  feedback: string;
  routeIndex: number;
}

const ResultVisualizations = ({
  route,
  stage,
  percentage,
  feedback,
  routeIndex,
}: ResultVisualizationsProps) => {
  const routeDetails = useMemo(() => getRouteDetails(route.name), [route.name]);

  const bgColor = useMemo(
    () => getRouteColor(routeIndex, "background"),
    [routeIndex],
  );

  const textColor = useMemo(
    () => getRouteColor(routeIndex, "text"),
    [routeIndex],
  );

  return (
    <div className="grid w-full gap-8 md:grid-cols-2">
      <Card className="bg-muted flex w-full flex-col items-center justify-center p-6">
        <CardHeader className="p-0 text-center">
          <CardTitle className="inline-flex items-center gap-2 text-xl">
            Tu puntuación
          </CardTitle>
        </CardHeader>
        <CardContent className="flex justify-center py-6">
          <ScoreCircle percentage={percentage} />
        </CardContent>
        <CardFooter className="p-0">
          <p className="text-muted-foreground text-center text-sm">
            <span className="flex items-center justify-center gap-1">
              {feedback}
            </span>
          </p>
        </CardFooter>
      </Card>
      <Card className="flex w-full flex-col justify-center space-y-4 border-0 p-0">
        <div className="flex items-center gap-4 text-sm">
          <RouteBadge routeIndex={routeIndex} routeDetails={routeDetails} />
          <p>
            Esta revisión práctica corresponde a la etapa {stage.order}:{" "}
            <strong className={cn("font-semibold", textColor)}>
              {stage.title}
            </strong>{" "}
            de la ruta{" "}
            <strong className={cn("font-semibold", textColor)}>
              {route.name}
            </strong>
            .
          </p>
        </div>
        {stage.objectives && (
          <div
            className={cn(
              "prose-sm text-foreground/80 rounded-xl p-4",
              bgColor,
            )}
          >
            <h3 className="text-foreground font-merriweather text-base font-semibold">
              Objetivos de la etapa
            </h3>
            <p className="bg-background/50 rounded-sm p-2">
              <em>{stage.objectives}</em>
            </p>
            <h3 className="text-foreground font-merriweather text-base font-semibold">
              ¿Qué aprendiste?
            </h3>
            <p>
              Al resolver esta revisión, has reforzado estos conocimientos y
              desarrollado competencias clave dentro del tema de{" "}
              <em className="text-foreground">{stage.title.toLowerCase()}</em>.
            </p>
          </div>
        )}
      </Card>
    </div>
  );
};

export default ResultVisualizations;
