"use client";

import { FC, useEffect } from "react";
import { HealthFact } from "@/types/common";
import { Image as UIImage } from "@nextui-org/react";
import { getRandomFacts } from "../../lib/utils";

interface HealthFactsCardProps {
  facts: HealthFact[];
  setFacts: (facts: HealthFact[]) => void;
}

const HealthFactsCard: FC<HealthFactsCardProps> = ({ facts, setFacts }) => {
  useEffect(() => {
    setFacts(getRandomFacts(2));
  }, [setFacts]);

  return (
    <>
      {facts.map((fact, index) => (
        <article
          key={index}
          className="relative size-full mb-5 bg-white/50 bg-bento-gradient dark:bg-none border border-gray-200 dark:border-none backdrop-blur backdrop-saturate-150 dark:backdrop-saturate-100 dark:bg-transparent rounded-xl shadow-md overflow-hidden"
        >
          <div className="relative flex flex-col h-full overflow-hidden">
            <div className="flex flex-col items-center justify-between size-full overflow-hidden">
              <UIImage
                removeWrapper
                src={fact.image}
                alt={fact.fact}
                className="z-0 absolute inset-0 size-full object-cover [mask-image:linear-gradient(to_top,_rgba(0,_0,_0,_1)_0%,_transparent_100%)] rounded-xl transition"
              />
              <div className="flex flex-col w-full content-center p-5 z-10">
                <h4 className="font-bold text-sm text-base-color-h dark:text-white drop-shadow-sm">
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

export default HealthFactsCard;
