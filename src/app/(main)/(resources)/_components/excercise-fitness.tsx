"use client";

import "react-lite-youtube-embed/dist/LiteYouTubeEmbed.css";
import { Stars } from "lucide-react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useState } from "react";

import { SparklesButton } from "@/components/button-kit/sparkles-button";
import { Button } from "@/components/kit/button";
import PaymentModal from "@/components/ui/payment/payment-modal";
import { INITIAL_CHAT_MESSAGES } from "@/consts/initial-chat-messages";
import { useIsMobile } from "@/hooks/use-mobile";
import { useTrial } from "@/hooks/use-trial";

import CardList from "./card-list";
import CourseList from "./course-list";
import SectionTitle from "./section-title";

import type { Course } from "@/types/resource";

interface ExerciseFitnessProps extends Course {
  isPremium?: boolean | null;
}

const ExcerciseFitness = (props: ExerciseFitnessProps) => {
  const {
    userId,
    resource,
    modules,
    about,
    slug,
    completedLessons,
    moduleProgress,
    courseProgress,
    courseInitialized,
    isPremium,
  } = props;

  const router = useRouter();

  const { data: session } = useSession();

  const [isOpen, setIsOpen] = useState(false);

  const isMobile = useIsMobile();

  const { isTrialUsed } = useTrial();

  const searchTerm = INITIAL_CHAT_MESSAGES[1].action;

  const onCreateRoutine = () => {
    if (isPremium) {
      router.push(`/essentia-ai?search=${encodeURIComponent(searchTerm)}`);
    } else {
      setIsOpen(true);
    }
  };

  return (
    <>
      <CourseList
        userId={userId}
        resource={resource}
        modules={modules}
        about={about}
        slug={slug}
        completedLessons={completedLessons}
        moduleProgress={moduleProgress}
        courseProgress={courseProgress}
        courseInitialized={courseInitialized}
        isPremium={isPremium}
      />
      <section className="col-[1/2] lg:col-[1/3]">
        <SectionTitle
          title="Rutinas de Ejercicios"
          hash="rutinas-de-ejercicios"
        >
          {!isMobile && session?.user && (
            <SparklesButton onClick={onCreateRoutine}>
              Crear rutina
            </SparklesButton>
          )}
        </SectionTitle>
        {session?.user && (
          <Button
            fullWidth
            variant="premium"
            onClick={onCreateRoutine}
            className="mb-4 h-14 rounded-xl text-lg md:hidden"
          >
            <Stars className="size-5! **:fill-white md:size-4!" />
            <span>Crea tu rutina</span>
          </Button>
        )}
        <CardList type="routine" resource="ejercicios-y-fitness" />
      </section>
      {session?.user && (
        <PaymentModal
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          featureType="routine"
          mode={!isTrialUsed ? "trial" : "upgrade"}
        />
      )}
    </>
  );
};

export default ExcerciseFitness;
