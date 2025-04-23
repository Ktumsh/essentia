"use client";

import { Trophy, Star, CheckCircle, Clock, Calendar } from "lucide-react";
import { motion } from "motion/react";
import { useMemo } from "react";

import { Badge } from "@/components/kit/badge";
import { cn, getRouteColor } from "@/lib/utils";
import { formatDate } from "@/utils/format";

import type { Route, Stage, UserReviewProgress } from "@/db/schema";

interface ResultHeaderProps {
  title: string;
  route: Route;
  stage: Stage;
  reviewProgress: UserReviewProgress;
  score: number;
  time: string;
  routeIndex: number;
}

const ResultHeader = ({
  title,
  route,
  stage,
  reviewProgress,
  score,
  time,
  routeIndex,
}: ResultHeaderProps) => {
  const textColor = useMemo(
    () => getRouteColor(routeIndex, "text"),
    [routeIndex],
  );
  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className="flex flex-col items-center text-center"
    >
      <div className="mb-4 rounded-full bg-linear-to-br/shorter from-yellow-400 to-pink-400 p-6 text-yellow-100 shadow-lg dark:from-yellow-700 dark:to-pink-700">
        <Trophy className="size-16" />
      </div>

      <motion.h1
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        aria-label={title}
        className="font-merriweather mb-4 text-2xl font-semibold md:text-4xl"
      >
        {title}
      </motion.h1>

      <motion.p
        className="text-foreground/80 max-w-lg text-sm md:text-base"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        Has completado con éxito la revisión{" "}
        <span className="text-foreground font-medium text-nowrap">
          &quot;{stage.title}&quot;
        </span>{" "}
        de la ruta{" "}
        <span className={cn("font-medium", textColor)}>{route.name}</span>
      </motion.p>

      <motion.div
        className="mt-6 flex flex-wrap items-center justify-center gap-2"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <Badge className="rounded-[6px] bg-purple-100 px-2 py-1 text-sm text-purple-600 dark:bg-purple-950 dark:text-purple-400">
          <Star className="mr-1 inline h-3 w-3" aria-hidden="true" />
          <span>
            Etapa {stage.order} - {stage.title}
          </span>
        </Badge>
        <Badge className="rounded-[6px] bg-green-100 px-2 py-1 text-sm text-green-600 dark:bg-green-950 dark:text-green-400">
          <CheckCircle className="mr-1 inline h-3 w-3" aria-hidden="true" />
          <span>Porcentaje de logro: {score}%</span>
        </Badge>
        <Badge className="rounded-[6px] bg-blue-100 px-2 py-1 text-sm text-blue-600 dark:bg-blue-950 dark:text-blue-400">
          <Clock className="mr-1 inline h-3 w-3" aria-hidden="true" />
          <span>Tiempo: {time}</span>
        </Badge>
        <Badge className="rounded-[6px] bg-amber-100 px-2 py-1 text-sm text-amber-600 dark:bg-amber-950 dark:text-amber-400">
          <Calendar className="mr-1 inline h-3 w-3" aria-hidden="true" />
          <span>
            {formatDate(reviewProgress.completedAt as Date, "dd-MM-yyyy")}
          </span>
        </Badge>
      </motion.div>
    </motion.div>
  );
};

export default ResultHeader;
