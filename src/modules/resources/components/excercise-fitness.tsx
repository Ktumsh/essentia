"use client";

import "react-lite-youtube-embed/dist/LiteYouTubeEmbed.css";
import { Button } from "@nextui-org/react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { INITIAL_CHAT_MESSAGES } from "@/consts/initial-chat-messages";
import { HashIcon, StarsIcon } from "@/modules/icons/common";

import CardList from "./card-list";
import { UserProfileData } from "@/types/session";

interface ExerciseFitnessProps {
  profileData?: UserProfileData | null;
}

const ExcerciseFitness = ({ profileData }: ExerciseFitnessProps) => {
  const router = useRouter();

  const { is_premium } = profileData || {};

  const searchTerm = INITIAL_CHAT_MESSAGES[1].action;

  const onCreateRoutine = () => {
    if (is_premium) {
      router.push(`/essentia-ai?search=${encodeURIComponent(searchTerm)}`);
    } else {
      router.push("/premium");
    }
  };

  return (
    <section className="px-6 py-4 md:p-0">
      <div className="relative flex w-full select-none justify-between">
        <h3 className="text-main-h dark:text-main-dark">
          <Button
            as={Link}
            id="rutinas-de-ejercicios"
            data-id="rutinas-de-ejercicios"
            data-name="Rutinas de Ejercicios"
            href="#rutinas-de-ejercicios"
            disableRipple
            radius="none"
            variant="flat"
            endContent={
              <HashIcon className="ml-1 size-5 opacity-0 transition-opacity group-data-[hover=true]:opacity-100" />
            }
            className="mb-2 ml-3 h-auto w-fit gap-0 bg-transparent p-0 px-2 text-2xl font-medium normal-case tracking-tight data-[pressed=true]:scale-100 data-[hover=true]:opacity-80 md:text-sm md:font-bold md:uppercase lg:px-0"
          >
            Rutinas de Ejercicios
          </Button>
        </h3>
        <Button
          radius="full"
          size="sm"
          onPress={onCreateRoutine}
          startContent={
            <StarsIcon
              aria-hidden="true"
              className="stars-icon size-3.5 focus:outline-none"
            />
          }
          className="absolute -top-3 right-0 shrink-0 bg-light-gradient-v2 !transition before:absolute before:inset-[2px] before:z-[-1] before:rounded-full before:bg-white before:content-[''] data-[hover=true]:shadow-lg data-[hover=true]:saturate-200 dark:bg-dark-gradient-v2 before:dark:bg-full-dark"
        >
          <span className="bg-light-gradient-v2 bg-clip-text font-sans font-extrabold text-transparent dark:bg-dark-gradient-v2">
            Crea tu rutina
          </span>
        </Button>
      </div>
      <CardList type="routine" resource="ejercicios-y-fitness" />
    </section>
  );
};

export default ExcerciseFitness;
