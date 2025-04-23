"use client";

import { CheckCircle, Clock, XCircle } from "lucide-react";

import { Card, CardContent } from "@/components/kit/card";
import { cn } from "@/lib/utils";

interface StatCardProps {
  icon: React.ReactNode;
  title: string;
  value: string | number;
  description: string;
  color: string;
}

const StatCard = ({
  icon,
  title,
  value,
  description,
  color,
}: StatCardProps) => (
  <Card
    className={cn(
      "hover:shadow-pretty transition-all duration-300 hover:translate-y-[-2px]",
      `border-${color}-200`,
      `dark:border-${color}-900/50`,
    )}
  >
    <CardContent className="p-6">
      <div className="flex items-start">
        <div
          className={cn(
            "mr-4 rounded-lg p-2",
            `bg-${color}-100`,
            `dark:bg-${color}-950`,
          )}
        >
          {icon}
        </div>
        <div className="space-y-1">
          <p className="text-foreground text-sm">{title}</p>
          <p className="text-muted-foreground text-xs">{description}</p>
          <h3 className="mt-1 text-2xl font-bold">{value}</h3>
        </div>
      </div>
    </CardContent>
  </Card>
);

interface ResultStatsProps {
  corrects: number;
  incorrects: number;
  time: string;
}

const ResultStats = ({ corrects, incorrects, time }: ResultStatsProps) => {
  return (
    <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-3">
      <StatCard
        icon={
          <CheckCircle
            className="h-6 w-6 text-green-600 dark:text-green-400"
            aria-hidden="true"
          />
        }
        title="Respuestas correctas"
        value={corrects}
        description="Todas tus preguntas respondidas correctamente"
        color="green"
      />
      <StatCard
        icon={
          <XCircle
            className="h-6 w-6 text-red-600 dark:text-red-400"
            aria-hidden="true"
          />
        }
        title="Respuestas incorrectas"
        value={incorrects}
        description="Todas tus preguntas respondidas incorrectamente"
        color="red"
      />
      <StatCard
        icon={
          <Clock
            className="h-6 w-6 text-blue-600 dark:text-blue-400"
            aria-hidden="true"
          />
        }
        title="Tiempo total"
        description="Tiempo que tardaste en completar la revisión"
        value={time}
        color="blue"
      />
    </div>
  );
};

export default ResultStats;
