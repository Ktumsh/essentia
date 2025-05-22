"use client";

import {
  ChevronLeft,
  ChevronRight,
  Trophy,
  CheckCircle2,
  XCircle,
  Clock,
  Loader,
} from "lucide-react";
import { motion } from "motion/react";
import { useRouter } from "next/navigation";
import {
  startTransition,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

import { ArrowLeftButton } from "@/components/button-kit/arrow-left-button";
import { CheckCheckButton } from "@/components/button-kit/check-check-button";
import { EyeButton } from "@/components/button-kit/eye-button";
import { EyeOffButton } from "@/components/button-kit/eye-off-button";
import { HandHeartButton } from "@/components/button-kit/hand-heart-button";
import { RepeatButton } from "@/components/button-kit/repeat-button";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/kit/alert-dialog";
import { Badge } from "@/components/kit/badge";
import { BadgeAlert } from "@/components/kit/badge-alert";
import { Button } from "@/components/kit/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/kit/card";
import { Confetti } from "@/components/kit/confeti";
import { Progress } from "@/components/kit/progress";
import { RadioGroup, RadioGroupItem } from "@/components/kit/radio-group";
import { BetterTooltip } from "@/components/kit/tooltip";
import PageWrapper from "@/components/ui/layout/page-wrapper";
import {
  resetReviewProgress,
  saveReviewProgress,
  startReview,
} from "@/db/querys/progress-querys";
import { ParsedReviewQuestion } from "@/db/querys/resource-querys";
import { Route, Stage } from "@/db/schema";
import { cn, getRouteColor } from "@/lib/utils";

import Countdown from "./countdown";

interface PracticalReviewProps {
  userId: string;
  reviewId: string;
  route: Route;
  stage: Stage;
  title: string;
  description: string;
  questions: ParsedReviewQuestion[];
  routeIndex: number;
}

export function PracticalReview({
  userId,
  reviewId,
  stage,
  title,
  description,
  questions,
  routeIndex,
  route,
}: PracticalReviewProps) {
  const router = useRouter();
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [submitting, setSubmitting] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [elapsedTime, setElapsedTime] = useState(0);
  const [showCountdown, setShowCountdown] = useState(true);
  const [startedAtState, setStartedAtState] = useState<Date | null>(null);

  useEffect(() => {
    startTransition(async () => {
      try {
        const newStartedAt = await startReview({ userId, reviewId });
        setStartedAtState(newStartedAt);
      } catch (error) {
        console.error("Error al iniciar la revisión:", error);
      }
    });
  }, [userId, reviewId]);

  useEffect(() => {
    if (!startedAtState) return;
    const interval = setInterval(() => {
      const now = Date.now();
      const start = new Date(startedAtState).getTime();
      setElapsedTime(Math.floor((now - start) / 1000));
    }, 1000);
    return () => clearInterval(interval);
  }, [startedAtState]);

  const totalQ = questions.length;
  const currQ = questions[current];

  const validate = useCallback(
    () => typeof answers[currQ.id] === "number",
    [answers, currQ.id],
  );

  const next = () => {
    if (!validate()) {
      setError("Selecciona una opción para continuar.");
      return;
    }
    setError(null);
    setCurrent((c) => Math.min(c + 1, totalQ - 1));
  };

  const prev = () => {
    setError(null);
    setCurrent((c) => Math.max(c - 1, 0));
  };

  const correctCount = questions.filter(
    (q) => answers[q.id] === q.answer,
  ).length;
  const score = Math.round((correctCount / totalQ) * 100);

  const submit = useCallback(async () => {
    if (!validate()) {
      setError("Debes seleccionar una opción antes de enviar.");
      return;
    }

    setError(null);
    setSubmitting(true);

    try {
      await saveReviewProgress({
        userId,
        reviewId,
        score,
        answers,
      });

      if (score >= 60 && !showConfetti) {
        setShowConfetti(true);
      }
      setShowResults(true);
    } catch {
      setError("Error al guardar el progreso.");
    } finally {
      setSubmitting(false);
    }
  }, [answers, reviewId, score, showConfetti, userId, validate]);

  const onResetProgress = useCallback(async () => {
    setSubmitting(true);
    try {
      await resetReviewProgress({
        userId,
        reviewId,
        routeSlug: route.slug,
        stageSlug: stage.slug,
      });
      setAnswers({});
      setCurrent(0);
      setShowResults(false);
      window.location.reload();
    } catch {
      setError("Error al reiniciar el progreso.");
    } finally {
      setSubmitting(false);
    }
  }, [userId, reviewId, route.slug, stage.slug]);

  const selectedValue = answers[currQ.id]?.toString();

  const bgGradient = useMemo(
    () => getRouteColor(routeIndex, "gradient"),
    [routeIndex],
  );

  const textColor = useMemo(
    () => getRouteColor(routeIndex, "text"),
    [routeIndex],
  );

  const borderAccent = useMemo(
    () => getRouteColor(routeIndex, "borderAccent"),
    [routeIndex],
  );

  const feedbackTitle = useMemo(() => {
    if (score === 100) return "🏆 ¡Resultados perfectos!";
    if (score >= 60) return "🎉 ¡Muy buen trabajo!";
    if (score >= 40) return "✨ ¡Revisión completada!";
    return "🔁 ¡Inténtalo de nuevo!";
  }, [score]);

  return (
    <PageWrapper classNameContainer="max-w-4xl" className="p-6">
      {showConfetti && (
        <Confetti duration={3000} onComplete={() => setShowConfetti(false)} />
      )}
      {/* Header */}
      <div className="relative mb-6 flex items-center justify-between">
        <ArrowLeftButton
          variant="ghost"
          size="sm"
          onClick={() => router.push(`/${route.slug}`)}
          className="-translate-x-3"
        >
          Regresar
        </ArrowLeftButton>
        <div className="absolute top-0 right-0 flex h-14 items-center gap-2">
          <div className="relative flex size-8 items-center justify-center rounded-full border-2 border-purple-200 dark:border-purple-800">
            <Clock className={cn("size-4 text-purple-500")} />
          </div>
          {showCountdown && (
            <div className="flex flex-col">
              <span className="text-muted-foreground text-xxs">
                Tiempo transcurrido
              </span>
              <Countdown seconds={elapsedTime} />
            </div>
          )}
          <div className="border-l-2 pl-2">
            {showCountdown ? (
              <BetterTooltip content="Ocultar temporizador">
                <EyeOffButton
                  variant="ghost"
                  size="icon"
                  onClick={() => setShowCountdown(false)}
                >
                  <span className="sr-only">Ocultar temporizador</span>
                </EyeOffButton>
              </BetterTooltip>
            ) : (
              <BetterTooltip content="Mostrar temporizador">
                <EyeButton
                  variant="ghost"
                  size="icon"
                  onClick={() => setShowCountdown(true)}
                >
                  <span className="sr-only">Mostrar temporizador</span>
                </EyeButton>
              </BetterTooltip>
            )}
          </div>
        </div>
      </div>

      {/* Info Card */}
      <Card className="mb-8 rounded-none border-0">
        <CardHeader className={cn("border-l-4 p-0 pl-4", borderAccent)}>
          <Badge
            className={cn(
              "h-6 bg-linear-to-r/shorter text-white",
              bgGradient,
              (routeIndex === 2 || routeIndex === 5) && "text-black",
            )}
          >
            Revisión práctica
          </Badge>
          <CardTitle className="text-2xl">{title}</CardTitle>
        </CardHeader>
        <CardContent className="mt-6 p-0">
          <p className="text-base">{description}</p>
          <div className={cn("mt-1 text-sm font-medium", textColor)}>
            Etapa {stage.order} - {stage.title}
          </div>
        </CardContent>
      </Card>

      {/* Progress Bar */}
      <div className="mb-8">
        <div className="mb-1 flex justify-between text-sm">
          <span>
            Pregunta {current + 1} / {totalQ}
          </span>
          <span>{Math.round(((current + 1) / totalQ) * 100)}%</span>
        </div>
        <Progress value={((current + 1) / totalQ) * 100} className="h-2" />
      </div>

      {/* Question */}
      <Card className="dark:bg-accent/50 mb-6 border-0 bg-slate-50">
        <CardContent className="p-6">
          <h3 className="mb-4 text-lg font-semibold">{currQ.question}</h3>
          <RadioGroup
            key={currQ.id}
            value={selectedValue}
            onValueChange={(v) => {
              setError(null);
              setAnswers({ ...answers, [currQ.id]: Number(v) });
            }}
          >
            {currQ.options.map((opt, i) => (
              <label
                key={i}
                htmlFor={`opt-${i}`}
                className="cursor-pointer text-base"
              >
                <div
                  className={cn(
                    "bg-background mb-2 flex items-center gap-4 rounded-xl border border-transparent p-4 transition-colors",
                    selectedValue === i.toString() &&
                      "bg-accent border-alternative",
                  )}
                >
                  <RadioGroupItem
                    value={i.toString()}
                    id={`opt-${i}`}
                    className={cn({
                      "bg-background!": selectedValue === i.toString(),
                    })}
                  />
                  <span>{opt}</span>
                </div>
              </label>
            ))}
          </RadioGroup>

          {error && (
            <div
              role="alert"
              className="mt-4 flex items-center gap-4 rounded-lg bg-red-50 p-3 text-base text-red-600 dark:bg-red-950/50 dark:text-red-400"
            >
              <BadgeAlert variant="error" className="mb-0" /> {error}
            </div>
          )}
        </CardContent>
      </Card>

      <CardFooter className="flex justify-between p-4 pt-0">
        <Button onClick={prev} disabled={current === 0}>
          <ChevronLeft /> Anterior
        </Button>
        {current < totalQ - 1 ? (
          <Button onClick={next}>
            Siguiente <ChevronRight />
          </Button>
        ) : (
          <CheckCheckButton
            variant="gradient"
            onClick={submit}
            disabled={submitting}
            className={cn(
              "flex-row-reverse rounded-full text-white",
              bgGradient,
              (routeIndex === 2 || routeIndex === 5) && "text-black",
            )}
          >
            {submitting ? "Finalizando..." : "Finalizar revisión"}
            {submitting && <Loader className="animate-spin" />}
          </CheckCheckButton>
        )}
      </CardFooter>

      {/* Results Dialog */}
      <AlertDialog open={showResults} onOpenChange={setShowResults}>
        <AlertDialogContent
          isSecondary
          isBlurred
          className="bg-linear-to-br/shorter from-indigo-200 to-pink-200 sm:max-w-md dark:from-indigo-950 dark:to-pink-950"
        >
          <AlertDialogHeader isSecondary className="items-center text-center">
            <AlertDialogTitle className="text-xl">
              {feedbackTitle}
            </AlertDialogTitle>
          </AlertDialogHeader>

          <div className="flex flex-col items-center justify-center p-6 pt-0">
            {/* Icono celebratorio */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
              className="mb-4 flex size-24 items-center justify-center rounded-full bg-linear-to-br/shorter from-yellow-400 to-pink-400 text-yellow-100 shadow-lg dark:from-yellow-700 dark:to-pink-700"
            >
              <Trophy className="h-10 w-10" />
            </motion.div>

            {/* Resultado */}
            <motion.h3
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-foreground mb-2 font-mono text-4xl font-extrabold"
            >
              {score}
              <span className="ml-1 font-mono text-3xl">%</span>
            </motion.h3>
            <p className="text-muted-foreground mb-6 text-sm">
              {correctCount} de {totalQ} respuestas correctas
            </p>

            {/* Estadísticas */}
            <div className="grid w-full grid-cols-2 gap-4">
              <div className="rounded-2xl bg-green-100 p-4 text-center shadow-lg dark:bg-green-900/50">
                <CheckCircle2 className="mx-auto mb-2 size-7 text-green-600 dark:text-green-400" />
                <div className="text-foreground text-sm font-medium">
                  Correctas
                </div>
                <div className="text-xl font-semibold text-green-700 dark:text-green-300">
                  {correctCount}
                </div>
              </div>
              <div className="rounded-2xl bg-red-100 p-4 text-center shadow-lg dark:bg-red-900/50">
                <XCircle className="mx-auto mb-2 size-7 text-red-600 dark:text-red-400" />
                <div className="text-foreground text-sm font-medium">
                  Incorrectas
                </div>
                <div className="text-xl font-semibold text-red-700 dark:text-red-300">
                  {totalQ - correctCount}
                </div>
              </div>
            </div>
          </div>

          {/* Botón final */}
          <AlertDialogFooter isSecondary className="flex-wrap border-0 pt-0">
            <Button
              variant="outline"
              onClick={() => router.refresh()}
              className="bg-background hover:bg-background flex-1 rounded-full border-0"
            >
              Ver resultados
            </Button>
            <RepeatButton
              variant="secondary"
              className="flex-1 rounded-full"
              onClick={onResetProgress}
            >
              Volver a intentar
            </RepeatButton>
            <HandHeartButton
              variant="gradient"
              onClick={() => router.push(`/${route.slug}`)}
              className={cn(
                "w-full rounded-full bg-linear-to-r/shorter",
                bgGradient,
              )}
            >
              Seguir aprendiendo
            </HandHeartButton>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </PageWrapper>
  );
}
