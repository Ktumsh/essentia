import dynamic from "next/dynamic";
import { FC } from "react";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/modules/core/components/ui/carousels/carousel-sheet";
import useWindowSize from "@/modules/core/hooks/use-window-size";
import { ResourceCard } from "@/types/resource";

const NutritionCarouselItem = dynamic(
  () => import("./nutrition-carousel-item"),
  { ssr: false },
);

interface Props {
  data: Array<ResourceCard>;
  startIndex: number;
  totalItems: number;
}

const NutritionCarousel: FC<Props> = ({ data, startIndex, totalItems }) => {
  const windowSize = useWindowSize();
  const { width } = windowSize;

  const itemsGroup = data.slice(startIndex, startIndex + totalItems);

  const slidesToScroll = width > 1280 ? 4 : width > 1024 ? 3 : 1;

  return (
    <>
      <Carousel className="w-full" opts={{ slidesToScroll, loop: true }}>
        <CarouselContent className="-ml-6">
          {itemsGroup.map((item, index) => (
            <CarouselItem
              key={index}
              className="pl-6 sm:basis-1/2 lg:basis-1/3 xl:basis-1/4"
            >
              <NutritionCarouselItem item={item} index={index} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className={"absolute -bottom-10 left-10"} />
        <CarouselNext className={"absolute -bottom-10 right-7"} />
      </Carousel>
    </>
  );
};

export default NutritionCarousel;
