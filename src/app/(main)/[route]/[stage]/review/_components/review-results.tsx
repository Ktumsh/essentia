"use client";

import confetti from "canvas-confetti";
import { useRouter } from "next/navigation";
import { useState, useEffect, useMemo } from "react";

import {
  formatTime,
  getFeedbackDescription,
} from "@/app/(main)/[route]/_lib/utils";
import { ArrowLeftButton } from "@/components/button-kit/arrow-left-button";
import { HandHeartButton } from "@/components/button-kit/hand-heart-button";
import { RepeatButton } from "@/components/button-kit/repeat-button";
import { ScrollButton } from "@/components/button-kit/scroll-button";
import PageWrapper from "@/components/layout/page-wrapper";
import { BetterTooltip } from "@/components/ui/tooltip";
import { resetReviewProgress } from "@/db/querys/progress-querys";
import { useIsMobile } from "@/hooks/use-mobile";
import { getRouteColor, cn, formatDate } from "@/utils";

import { InitialLoadingState } from "./loading";
import ResultCertificate from "./results-certificate";
import ResultHeader from "./results-header";
import ResultsInfo from "./results-info";
import ResultStats from "./results-stats";
import ResultVisualizations from "./results-visualization";

import type { ParsedReviewQuestion } from "@/db/querys/resource-querys";
import type { Route, Stage, UserReviewProgress } from "@/db/schema";

interface ReviewResultsProps {
  userId: string;
  reviewId: string;
  reviewName: string;
  route: Route;
  stage: Stage;
  reviewProgress: UserReviewProgress;
  questions: (ParsedReviewQuestion & {
    selected: number | null;
    correct: boolean;
  })[];
  routeIndex: number;
}

const ReviewResults = ({
  userId,
  reviewId,
  reviewName,
  route,
  stage,
  reviewProgress,
  questions,
  routeIndex,
}: ReviewResultsProps) => {
  const router = useRouter();
  const isMobile = useIsMobile();
  const [loading, setLoading] = useState(true);
  const [showConfetti, setShowConfetti] = useState(false);
  const [percentage, setPercentage] = useState<number>(0);
  const [showCertificate, setShowCertificate] = useState(false);

  const correctCount = questions.filter((q) => q.correct).length;
  const incorrectCount = questions.length - correctCount;
  const totalQuestions = questions.length;

  const timeTaken =
    reviewProgress.startedAt && reviewProgress.completedAt
      ? Math.round(
          (new Date(reviewProgress.completedAt).getTime() -
            new Date(reviewProgress.startedAt).getTime()) /
            1000,
        )
      : 0;

  useEffect(() => {
    const timer = setTimeout(() => {
      setPercentage(reviewProgress.score!);
      setLoading(false);
    }, 3000);

    if (percentage >= 60 && !showConfetti) {
      setShowConfetti(true);
      confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6, x: 0.57 },
      });
    }
    return () => clearTimeout(timer);
  }, [percentage, showConfetti, reviewProgress.score]);

  const onResetProgress = async () => {
    try {
      await resetReviewProgress({
        userId,
        reviewId,
        routeSlug: route.slug,
        stageSlug: stage.slug,
      });
      window.location.reload();
    } catch (error) {
      console.error("Error al reiniciar el progreso de la revisión:", error);
    }
  };

  const feedbackTitle = useMemo(() => {
    if (percentage === 100) return "¡Resultados perfectos!";
    if (percentage >= 60) return "¡Muy buen trabajo!";
    if (percentage >= 40) return "¡Revisión completada!";
    return "¡Inténtalo de nuevo!";
  }, [percentage]);

  const feedbackDescription = getFeedbackDescription(percentage);

  const bgGradient = useMemo(
    () => getRouteColor(routeIndex, "gradient"),
    [routeIndex],
  );

  if (loading) {
    return <InitialLoadingState />;
  }

  return (
    <PageWrapper className="pt-6">
      <div className="flex flex-col items-center space-y-8">
        <div className="flex w-full justify-between">
          <ArrowLeftButton
            variant="ghost"
            size="sm"
            onClick={() => router.push(`/${route.slug}`)}
            className="-translate-x-3"
          >
            Regresar
          </ArrowLeftButton>

          <div className="flex items-center gap-4">
            {!isMobile && (
              <div>
                <p className="text-muted-foreground text-end text-xs">
                  Revisión práctica
                </p>
                <p className="text-sm">{reviewName}</p>
              </div>
            )}
            {percentage >= 60 && (
              <div className="border-l pl-4">
                <BetterTooltip content="Ver certificado">
                  <ScrollButton
                    variant="ghost"
                    size="icon"
                    onClick={() => setShowCertificate(true)}
                  >
                    <span className="sr-only">Ver certificado</span>
                  </ScrollButton>
                </BetterTooltip>
              </div>
            )}
          </div>
        </div>

        <ResultHeader
          title={feedbackTitle}
          route={route}
          stage={stage}
          reviewProgress={reviewProgress}
          score={percentage}
          time={formatTime(timeTaken)}
          routeIndex={routeIndex}
        />

        <ResultStats
          corrects={correctCount}
          incorrects={incorrectCount}
          time={formatTime(timeTaken)}
        />

        <ResultVisualizations
          route={route}
          stage={stage}
          percentage={percentage}
          feedback={feedbackDescription}
          routeIndex={routeIndex}
        />

        <ResultsInfo
          reviewProgress={reviewProgress}
          questions={questions}
          percentage={percentage}
          timeTaken={timeTaken}
          totalQuestions={totalQuestions}
        />

        <div className="flex w-full max-w-md flex-col gap-3 sm:flex-row">
          <RepeatButton
            variant="ghost"
            onClick={onResetProgress}
            className="rounded-full border"
          >
            Volver a intentar
          </RepeatButton>
          <HandHeartButton
            variant="gradient"
            onClick={() => router.push(`/${route.slug}`)}
            className={cn("rounded-full bg-linear-to-r/shorter", bgGradient)}
          >
            Seguir aprendiendo
          </HandHeartButton>
        </div>
        <ResultCertificate
          open={showCertificate}
          setOpen={setShowCertificate}
          reviewTitle={reviewName}
          reviewEndDate={formatDate(
            reviewProgress.completedAt as Date,
            "dd 'de' MMMM, yyyy",
          )}
          score={percentage}
        />
      </div>
    </PageWrapper>
  );
};

export default ReviewResults;
