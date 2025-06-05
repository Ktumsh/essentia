"use client";

import "react-lite-youtube-embed/dist/LiteYouTubeEmbed.css";
import { Stars } from "lucide-react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useState } from "react";

import PaymentModal from "@/app/payment/_components/payment-modal";
import { SparklesButton } from "@/components/button-kit/sparkles-button";
import { Button } from "@/components/ui/button";
import { SUGGESTED_ACTION_DATA } from "@/db/data/suggested-action-data";
import { useIsMobile } from "@/hooks/use-mobile";
import { useTrial } from "@/hooks/use-trial";
import { useUserProfile } from "@/hooks/use-user-profile";

import CardList from "./card-list";
import SectionTitle from "./section-title";

const ExcerciseFitness = () => {
  const router = useRouter();

  const { data: session } = useSession();
  const { user } = useUserProfile();

  const { isPremium } = user ?? {};

  const [isOpen, setIsOpen] = useState(false);

  const isMobile = useIsMobile();

  const { isTrialUsed } = useTrial();

  const searchTerm = SUGGESTED_ACTION_DATA[1].action;

  const onCreateRoutine = () => {
    if (isPremium) {
      router.push(`/aeris?search=${encodeURIComponent(searchTerm)}`);
    } else {
      setIsOpen(true);
    }
  };

  return (
    <>
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
