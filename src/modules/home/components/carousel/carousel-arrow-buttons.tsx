"use client";

import { CarouselArrowIcon } from "@/modules/icons/navigation";
import { Button } from "@nextui-org/react";
import { EmblaCarouselType } from "embla-carousel";
import { ComponentPropsWithRef, useCallback, useEffect, useState } from "react";

type UsePrevNextButtonsType = {
  prevBtnDisabled: boolean;
  nextBtnDisabled: boolean;
  onPrevButtonClick: () => void;
  onNextButtonClick: () => void;
};

export const usePrevNextButtons = (
  emblaApi: EmblaCarouselType | undefined,
  onButtonClick?: (emblaApi: EmblaCarouselType) => void
): UsePrevNextButtonsType => {
  const [prevBtnDisabled, setPrevBtnDisabled] = useState(true);
  const [nextBtnDisabled, setNextBtnDisabled] = useState(true);

  const onPrevButtonClick = useCallback(() => {
    if (!emblaApi) return;
    emblaApi.scrollPrev();
    if (onButtonClick) onButtonClick(emblaApi);
  }, [emblaApi, onButtonClick]);

  const onNextButtonClick = useCallback(() => {
    if (!emblaApi) return;
    emblaApi.scrollNext();
    if (onButtonClick) onButtonClick(emblaApi);
  }, [emblaApi, onButtonClick]);

  const onSelect = useCallback((emblaApi: EmblaCarouselType) => {
    setPrevBtnDisabled(!emblaApi.canScrollPrev());
    setNextBtnDisabled(!emblaApi.canScrollNext());
  }, []);

  useEffect(() => {
    if (!emblaApi) return;

    onSelect(emblaApi);
    emblaApi.on("reInit", onSelect).on("select", onSelect);
  }, [emblaApi, onSelect]);

  return {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  };
};

type PropType = ComponentPropsWithRef<typeof Button>;

export const PrevButton: React.FC<PropType> = (props) => {
  const { children, ...restProps } = props;

  return (
    <div className="absolute top-0 left-0 z-30 hidden md:flex items-end justify-center h-full p-2 sm:p-4 pointer-events-none">
      <Button
        {...restProps}
        variant="flat"
        radius="full"
        className="inline-flex items-center justify-center px-0 min-w-0 max-w-[48px] max-h-[48px] !size-12 rounded-full bg-black/10 active:bg-black/30 pointer-events-auto"
      >
        <CarouselArrowIcon className="size-6 text-white" />
        {children}
      </Button>
    </div>
  );
};

export const NextButton: React.FC<PropType> = (props) => {
  const { children, ...restProps } = props;

  return (
    <div className="absolute top-0 right-0 z-30 hidden md:flex items-end justify-center h-full p-4 sm:p-4 pointer-events-none">
      <Button
        {...restProps}
        variant="flat"
        radius="full"
        className="inline-flex items-center justify-center px-0 min-w-0 max-w-[48px] max-h-[48px] !size-12 rounded-full bg-black/10 active:bg-black/30 pointer-events-auto"
      >
        <CarouselArrowIcon className="size-6 text-white rotate-180" />
        {children}
      </Button>
    </div>
  );
};
