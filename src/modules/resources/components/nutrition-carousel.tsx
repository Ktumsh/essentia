"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import useWindowSize from "@/modules/core/hooks/use-window-size";
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
            <NutritionCarouselItem item={item} />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="absolute -bottom-14 left-5 top-auto" />
      <CarouselNext className="absolute -bottom-14 right-5 top-auto" />
    </Carousel>
  );
};

export default NutritionCarousel;
