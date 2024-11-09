"use client";

import { Button } from "@nextui-org/react";
import { EmblaCarouselType } from "embla-carousel";
import { ComponentPropsWithRef, useCallback, useEffect, useState } from "react";

import { CarouselArrowIcon } from "@/modules/icons/navigation";

type UsePrevNextButtonsType = {
  prevBtnDisabled: boolean;
  nextBtnDisabled: boolean;
  onPrevButtonClick: () => void;
  onNextButtonClick: () => void;
};

export const usePrevNextButtons = (
  emblaApi: EmblaCarouselType | undefined,
  onButtonClick?: (emblaApi: EmblaCarouselType) => void,
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
    <div className="pointer-events-none absolute left-0 top-0 z-30 hidden h-full items-end justify-center p-2 sm:p-4 md:flex">
      <Button
        {...restProps}
        variant="flat"
        radius="full"
        className="pointer-events-auto inline-flex !size-12 max-h-[48px] min-w-0 max-w-[48px] items-center justify-center rounded-full bg-black/10 px-0 data-[hover=true]:bg-black/30 data-[pressed=true]:bg-black/30"
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
    <div className="pointer-events-none absolute right-0 top-0 z-30 hidden h-full items-end justify-center p-4 sm:p-4 md:flex">
      <Button
        {...restProps}
        variant="flat"
        radius="full"
        className="pointer-events-auto inline-flex !size-12 max-h-[48px] min-w-0 max-w-[48px] items-center justify-center rounded-full bg-black/10 px-0 data-[hover=true]:bg-black/30 data-[pressed=true]:bg-black/30"
      >
        <CarouselArrowIcon className="size-6 rotate-180 text-white" />
        {children}
      </Button>
    </div>
  );
};
