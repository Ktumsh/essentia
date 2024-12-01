import { EmblaOptionsType } from "embla-carousel";
import AutoPlay from "embla-carousel-autoplay";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { MAINCAP_RESOURCES } from "@/consts/recom-carousel";

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
        {MAINCAP_RESOURCES.filter(
          (item) => isPremium || !item.requiresPremium,
        ).map((item, index) => (
          <CarouselItem
            key={index}
            className="odd:flex-[0_0_60%] even:flex-[0_0_40%]"
          >
            <RecomendationsItem item={item} index={index} />
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
};

export default Recomendations;
