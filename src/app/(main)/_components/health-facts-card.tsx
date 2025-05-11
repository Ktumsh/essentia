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
          className="bg-background border-border relative overflow-hidden rounded-2xl md:rounded-xl md:border @7xl:min-h-52"
        >
          <div className="flex items-center justify-between @7xl:flex-col">
            <div className="h-20 w-full py-1 md:py-0 @3xl:h-[188px] @7xl:h-24">
              <Image
                quality={60}
                width={272}
                height={96}
                src={fact.image}
                alt={fact.fact}
                className="animate-fade-in aspect-auto size-full rounded-r-md object-cover object-center shadow-md md:rounded-none md:shadow-none @3xl:h-[188px] @7xl:h-24"
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
