import {
  CalendarCheck,
  CheckCircle,
  GaugeCircle,
  ListChecks,
  Timer,
  XCircle,
} from "lucide-react";

import { formatTime } from "@/app/(main)/(resources)/_lib/utils";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/kit/accordion";
import { Card, CardContent } from "@/components/kit/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/kit/tabs";
import { cn } from "@/lib/utils";
import { formatDate } from "@/utils/format";

import type { ParsedReviewQuestion } from "@/db/querys/resource-querys";
import type { UserReviewProgress } from "@/db/schema";

interface ResultsInfoProps {
  reviewProgress: UserReviewProgress;
  questions: (ParsedReviewQuestion & {
    selected: number | null;
    correct: boolean;
  })[];
  totalQuestions: number;
  percentage: number;
  timeTaken: number;
}

const ResultsInfo = ({
  reviewProgress,
  questions,
  totalQuestions,
  percentage,
  timeTaken,
}: ResultsInfoProps) => {
  return (
    <Tabs defaultValue="summary" className="w-full">
      <TabsList className="w-full rounded-full md:w-fit">
        <TabsTrigger
          value="summary"
          className="flex flex-1 items-center justify-center rounded-full px-3"
        >
          Resumen
        </TabsTrigger>
        <TabsTrigger
          value="detail"
          className="flex flex-1 items-center justify-center rounded-full px-3"
        >
          Detalle de respuestas
        </TabsTrigger>
      </TabsList>
      <TabsContent value="summary" className="mt-4">
        <Card className="bg-muted">
          <CardContent className="p-3 md:p-6">
            <div className="space-y-4">
              {[
                {
                  label: "Puntuación total",
                  value: `${percentage}%`,
                  icon: (
                    <GaugeCircle className="size-5 text-indigo-600 dark:text-indigo-400" />
                  ),
                  highlight: true,
                },
                {
                  label: "Preguntas totales",
                  value: totalQuestions,
                  icon: (
                    <ListChecks className="size-5 text-emerald-600 dark:text-emerald-400" />
                  ),
                },
                {
                  label: "Fecha de finalización",
                  value: formatDate(
                    reviewProgress.completedAt as Date,
                    "dd 'de' MMMM, yyyy",
                  ),
                  icon: (
                    <CalendarCheck className="size-5 text-amber-600 dark:text-amber-400" />
                  ),
                },
                {
                  label: "Tiempo empleado",
                  value: `${formatTime(timeTaken)} ${
                    timeTaken > 120
                      ? "minutos"
                      : timeTaken > 60
                        ? "minuto"
                        : "segundos"
                  }`,
                  icon: (
                    <Timer className="size-5 text-rose-600 dark:text-rose-400" />
                  ),
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className="bg-background flex items-center justify-between rounded-lg p-3"
                >
                  <div className="flex items-center gap-2 md:gap-4">
                    {item.icon}
                    <span className="text-foreground/80 text-sm md:text-base">
                      {item.label}
                    </span>
                  </div>
                  <span
                    className={cn("text-sm font-semibold md:text-base", {
                      "text-indigo-600 dark:text-indigo-400": item.highlight,
                    })}
                  >
                    {item.value}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="detail" className="mt-4">
        <Card className="bg-muted">
          <CardContent className="p-3 md:p-6">
            <Accordion type="single" collapsible className="w-full">
              {questions.map((question) => (
                <AccordionItem
                  key={question.id}
                  value={`question-${question.id}`}
                  className="border-0"
                >
                  <AccordionTrigger className="hover:bg-background rounded-xl px-4 py-3 hover:no-underline">
                    <div className="flex items-center gap-3 text-left">
                      <div
                        className={cn(
                          "rounded-full p-1",
                          question.correct
                            ? "bg-green-100 dark:bg-green-950"
                            : "bg-red-100 dark:bg-red-950",
                        )}
                      >
                        {question.correct ? (
                          <CheckCircle
                            className="size-5 text-green-500"
                            aria-hidden="true"
                          />
                        ) : (
                          <XCircle
                            className="size-5 text-red-500"
                            aria-hidden="true"
                          />
                        )}
                      </div>
                      <div>
                        <p className="font-medium">{question.question}</p>
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="bg-background mt-2 rounded-xl px-4 py-3 md:pr-4 md:pl-14">
                    <p>Tu respuesta:</p>
                    <p className="text-muted-foreground mt-1">
                      {question.selected !== null
                        ? question.options[question.selected]
                        : "No respondiste esta pregunta"}
                    </p>

                    {question.correct ? (
                      <div className="mt-2 flex items-center gap-2 rounded-md border border-green-100 bg-green-50 p-2 dark:border-green-900/50 dark:bg-green-950">
                        <CheckCircle
                          className="mt-0.5 size-5 flex-shrink-0 text-green-500"
                          aria-hidden="true"
                        />
                        <p className="text-sm text-green-600 dark:text-green-400">
                          ¡Correcto! Has respondido adecuadamente a esta
                          pregunta.
                        </p>
                      </div>
                    ) : (
                      <div className="mt-3 flex items-start gap-2 rounded-md border border-red-100 bg-red-50 p-2 dark:border-red-900/50 dark:bg-red-950">
                        <XCircle
                          className="mt-0.5 size-5 flex-shrink-0 text-red-500"
                          aria-hidden="true"
                        />
                        <div>
                          <p className="text-sm text-red-600 dark:text-red-400">
                            Respuesta incorrecta.
                          </p>
                          <p className="text-foreground/80 mt-1 text-sm">
                            La respuesta correcta es:{" "}
                            <span className="text-foreground font-medium">
                              {question.options[question.answer]}
                            </span>
                          </p>
                        </div>
                      </div>
                    )}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
};

export default ResultsInfo;
