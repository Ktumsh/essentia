import { EmblaOptionsType } from "embla-carousel";
import AutoPlay from "embla-carousel-autoplay";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/kit/carousel";
import { MAIN_HERO_DATA } from "@/db/data/main-hero-data";

import RecomendationsItem from "./recomendations-item";

const OPTIONS: EmblaOptionsType = { loop: true, align: "start" };

interface RecomendationsProps {
  isPremium?: boolean;
}

const Recomendations = ({ isPremium }: RecomendationsProps) => {
  return (
    <Carousel
      className="w-full"
      opts={OPTIONS}
      plugins={[AutoPlay({ delay: 8000 })]}
    >
      <CarouselContent>
        {MAIN_HERO_DATA.filter(
          (item) => isPremium || !item.requiresPremium,
        ).map((item, index) => (
          <CarouselItem
            key={index}
            className="lg:odd:flex-[0_0_60%] lg:even:flex-[0_0_40%]"
          >
            <RecomendationsItem item={item} index={index} />
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
};

export default Recomendations;
