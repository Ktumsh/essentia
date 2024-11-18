import { Image as ImageUI } from "@nextui-org/react";
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
          className="relative mb-5 size-full max-h-[190px] overflow-hidden rounded-xl border border-white bg-white/50 bg-bento-gradient shadow-md backdrop-blur backdrop-saturate-150 dark:border-full-dark dark:bg-transparent dark:bg-none dark:backdrop-saturate-100"
        >
          <div className="relative flex h-full flex-col overflow-hidden">
            <div className="flex size-full flex-col items-center justify-between overflow-hidden">
              <ImageUI
                as={Image}
                width={270}
                height={190}
                removeWrapper
                src={fact.image}
                alt={fact.fact}
                className="absolute inset-0 z-0 rounded-xl object-cover transition [mask-image:linear-gradient(to_top,_rgba(0,_0,_0,_1)_0%,_transparent_100%)]"
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
