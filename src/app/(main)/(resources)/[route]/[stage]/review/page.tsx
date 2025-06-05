import { notFound, redirect } from "next/navigation";

import { auth } from "@/app/(auth)/auth";
import {
  areAllLessonsInStageCompleted,
  checkReviewCompletion,
  getUserReviewAnswers,
} from "@/db/querys/progress-querys";
import {
  getRouteBySlug,
  getStageBySlug,
  getReviewByStage,
  getQuestionsByReview,
  ParsedReviewQuestion,
} from "@/db/querys/resource-querys";
import { getRouteIndex } from "@/utils";

import { PracticalReview } from "./_components/practical-review";
import ReviewResults from "./_components/review-results";

type ReviewPageProps = {
  params: Promise<{
    route: string;
    stage: string;
  }>;
};

export default async function ReviewPage(props: ReviewPageProps) {
  const params = await props.params;
  const session = await auth();
  const userId = session?.user?.id as string;

  if (!userId) return notFound();

  const route = await getRouteBySlug(params.route);
  if (!route) return notFound();

  const stageData = await getStageBySlug(params.stage);
  const stage = stageData?.stage;
  if (!stage) return redirect(`/${route.slug}`);

  const [review, allLessonsDone] = await Promise.all([
    getReviewByStage(stage.id),
    areAllLessonsInStageCompleted(userId, stage.id),
  ]);

  if (!review || !allLessonsDone) return redirect(`/${route.slug}`);

  const [rawQuestions, answers, reviewProgress] = await Promise.all([
    getQuestionsByReview(review.id),
    getUserReviewAnswers({ userId, reviewId: review.id }),
    checkReviewCompletion({ userId, reviewId: review.id }),
  ]);

  if (!reviewProgress) return redirect(`/${route.slug}`);

  const questions: ParsedReviewQuestion[] = rawQuestions.map((q) => ({
    ...q,
    options: Array.isArray(q.options)
      ? q.options
      : JSON.parse(q.options as unknown as string),
  }));

  const decoratedQuestions: (ParsedReviewQuestion & {
    selected: number | null;
    correct: boolean;
  })[] = questions.map((q) => {
    const userAnswer = answers.find((a) => a.questionId === q.id);
    const selected = userAnswer?.selected ?? null;
    return {
      ...q,
      selected,
      correct: selected === q.answer,
    };
  });

  const routeIndex = getRouteIndex(route.name);

  return (
    <>
      {reviewProgress.completed ? (
        <ReviewResults
          userId={userId}
          reviewId={review.id}
          reviewName={review.title}
          route={route}
          stage={stage}
          reviewProgress={reviewProgress}
          questions={decoratedQuestions}
          routeIndex={routeIndex}
        />
      ) : (
        <PracticalReview
          userId={userId}
          reviewId={review.id}
          route={route}
          stage={stage}
          title={review.title}
          description={review.instructions}
          questions={questions}
          routeIndex={routeIndex}
        />
      )}
    </>
  );
}
