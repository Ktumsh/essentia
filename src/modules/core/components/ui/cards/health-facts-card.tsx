import Image from "next/image";
import { memo } from "react";

import { HealthFact } from "@/types/common";

interface HealthFactsCardProps {
  facts: HealthFact[] | null;
}

const HealthFactsCard = ({ facts }: HealthFactsCardProps) => {
  return (
    <>
      {facts?.map((fact, index) => (
        <article
          key={index}
          className="relative h-44 overflow-hidden rounded-xl border border-white bg-white/50 bg-bento-gradient shadow-md backdrop-blur backdrop-saturate-150 dark:border-full-dark dark:bg-transparent dark:bg-none dark:backdrop-saturate-100 md:mb-5 md:size-full md:max-h-[190px]"
        >
          <div className="relative flex h-full flex-col overflow-hidden">
            <div className="flex size-full flex-col items-center justify-between overflow-hidden">
              <Image
                width={270}
                height={190}
                src={fact.image}
                alt={fact.fact}
                className="absolute inset-0 z-0 aspect-auto w-full rounded-xl object-cover transition md:[mask-image:linear-gradient(to_top,_rgba(0,_0,_0,_1)_0%,_transparent_100%)]"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 z-10 bg-gradient-to-b from-black/60 to-transparent md:hidden md:to-70%"
              />
              <div className="z-10 flex w-full flex-col content-center p-5">
                <h4 className="text-sm font-bold text-main-h drop-shadow-sm dark:text-white">
                  <q>{fact.fact}</q>
                </h4>
              </div>
            </div>
          </div>
        </article>
      ))}
    </>
  );
};

export default memo(HealthFactsCard);
