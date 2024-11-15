"use client";

import "react-lite-youtube-embed/dist/LiteYouTubeEmbed.css";
import { Button } from "@nextui-org/react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { INITIAL_CHAT_MESSAGES } from "@/consts/initial-chat-messages";
import useWindowSize from "@/modules/core/hooks/use-window-size";
import { HashIcon, StarsIcon } from "@/modules/icons/common";

import CardList from "./card-list";

interface ExerciseFitnessProps {
  isPremium?: boolean | null;
}

const ExcerciseFitness = ({ isPremium }: ExerciseFitnessProps) => {
  const router = useRouter();

  const searchTerm = INITIAL_CHAT_MESSAGES[1].action;

  const windowSize = useWindowSize();

  const { width } = windowSize;

  const onCreateRoutine = () => {
    if (isPremium) {
      router.push(`/essentia-ai?search=${encodeURIComponent(searchTerm)}`);
    } else {
      router.push("/premium");
    }
  };

  return (
    <section className="px-6 py-4 lg:p-0">
      <div className="relative flex w-full select-none justify-between">
        <h3 className="mb-2 ml-3 text-main-h dark:text-main-dark">
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
            className="h-auto w-fit gap-0 bg-transparent p-0 px-2 text-xl font-semibold tracking-tight data-[pressed=true]:scale-100 data-[hover=true]:opacity-80 lg:px-0"
          >
            Rutinas de Ejercicios
          </Button>
        </h3>
        {width > 768 && (
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
        )}
      </div>

      <Button
        fullWidth
        onPress={onCreateRoutine}
        startContent={
          <StarsIcon
            aria-hidden="true"
            className="stars-icon size-5 focus:outline-none"
          />
        }
        className="mb-4 h-14 rounded-2xl bg-light-gradient-v2 !transition before:absolute before:inset-[2px] before:z-[-1] before:rounded-[14px] before:bg-white before:content-[''] data-[pressed=true]:shadow-lg data-[pressed=true]:saturate-200 dark:bg-dark-gradient-v2 before:dark:bg-full-dark md:hidden"
      >
        <span className="bg-light-gradient-v2 bg-clip-text text-lg font-extrabold text-transparent dark:bg-dark-gradient-v2">
          Crea tu rutina
        </span>
      </Button>
      <CardList type="routine" resource="ejercicios-y-fitness" />
    </section>
  );
};

export default ExcerciseFitness;
