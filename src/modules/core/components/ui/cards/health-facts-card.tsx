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
          className="relative overflow-hidden rounded-2xl bg-white dark:bg-full-dark md:h-52 md:rounded-xl"
        >
          <div className="flex items-center justify-between md:flex-col">
            <div className="h-20 md:h-24">
              <Image
                quality={70}
                width={270}
                height={96}
                src={fact.image}
                alt={fact.fact}
                className="aspect-auto h-full rounded-r-md object-cover object-center shadow-md md:rounded-none md:shadow-none"
              />
            </div>
            <div className="w-full p-6">
              <p className="text-xs text-main dark:text-main-dark md:text-sm">
                {fact.fact}
              </p>
            </div>
          </div>
        </article>
      ))}
    </>
  );
};

export default memo(HealthFactsCard);
