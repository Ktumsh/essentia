"use client";

import { EmblaOptionsType } from "embla-carousel";
import AutoPlay from "embla-carousel-autoplay";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { MAIN_HERO_DATA } from "@/db/data/main-hero-data";
import { useUserProfile } from "@/hooks/use-user-profile";

import RecomendationsItem from "./recomendations-item";

const OPTIONS: EmblaOptionsType = { loop: true, align: "start" };

const Recomendations = () => {
  const { user } = useUserProfile();

  const isPremium = user?.isPremium;

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
