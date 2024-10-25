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
import { ModalData } from "@/types/common";

const NutritionCarouselItem = dynamic(
  () => import("./nutrition-carousel-item"),
  { ssr: false }
);

interface Props {
  data: Array<ModalData>;
  startIndex: number;
  totalItems: number;
}

const NutritionCarousel: FC<Props> = ({ data, startIndex, totalItems }) => {
  const windowSize = useWindowSize();

  const itemsGroup = data.slice(startIndex, startIndex + totalItems);

  const slidesToScroll = windowSize.width < 1024 ? 1 : 3;

  return (
    <>
      <Carousel
        className="px-5 md:px-0 w-full"
        opts={{ slidesToScroll, loop: true }}
      >
        <CarouselContent className="-ml-5">
          {itemsGroup.map((item, index) => (
            <CarouselItem
              key={index}
              className="pl-8 sm:basis-1/2 lg:basis-1/3"
            >
              <NutritionCarouselItem
                modalTitle={item.modalTitle}
                modalImage={item.modalImage}
                modalBody={item.modalBody}
                index={index}
              />
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
