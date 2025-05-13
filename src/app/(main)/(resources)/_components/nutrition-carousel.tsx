"use client";

import { useWindowSize } from "usehooks-ts";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/kit/carousel";
import { ResourceCard } from "@/types/resource";

import NutritionCarouselItem from "./nutrition-carousel-item";

interface NutritionCarouselProps {
  data: Array<ResourceCard>;
  startIndex: number;
  totalItems: number;
}

const NutritionCarousel = ({
  data,
  startIndex,
  totalItems,
}: NutritionCarouselProps) => {
  const windowSize = useWindowSize();
  const { width } = windowSize;

  const itemsGroup = data.slice(startIndex, startIndex + totalItems);

  const slidesToScroll = width > 1280 ? 4 : width > 1024 ? 3 : 1;

  return (
    <Carousel className="w-full" opts={{ slidesToScroll, loop: true }}>
      <CarouselContent className="-ml-6">
        {itemsGroup.map((item, index) => (
          <CarouselItem
            key={index}
            className="pl-6 sm:basis-1/2 lg:basis-1/3 xl:basis-1/4"
          >
            <NutritionCarouselItem {...item} />
          </CarouselItem>
        ))}
      </CarouselContent>
      <div className="absolute right-0 -bottom-12 flex w-full items-center justify-between gap-4 px-5 md:w-auto">
        <CarouselPrevious className="static translate-y-0" />
        <CarouselNext className="static translate-y-0" />
      </div>
    </Carousel>
  );
};

export default NutritionCarousel;
