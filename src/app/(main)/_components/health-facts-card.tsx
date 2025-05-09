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
        <section
          key={index}
          className="bg-background border-border relative overflow-hidden rounded-2xl md:min-h-52 md:rounded-xl md:border"
        >
          <div className="flex items-center justify-between md:flex-col">
            <div className="h-20 py-1 md:h-24 md:py-0">
              <Image
                quality={60}
                width={272}
                height={96}
                src={fact.image}
                alt={fact.fact}
                className="animate-fade-in aspect-auto h-full rounded-r-md object-cover object-center shadow-md md:h-24 md:rounded-none md:shadow-none"
              />
            </div>
            <div className="w-full p-6">
              <p className="text-foreground text-xs md:text-sm">{fact.fact}</p>
            </div>
          </div>
        </section>
      ))}
    </>
  );
};

export default memo(HealthFactsCard);
