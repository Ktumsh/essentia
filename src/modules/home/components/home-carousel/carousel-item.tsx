"use client";

import useEmblaCarousel from "embla-carousel-react";

import Image from "next/image";
import { MaincapResources } from "@/types/resource";
import { DotButton, useDotButton } from "./carousel-dot-buttons";
import Fade from "embla-carousel-fade";
import Autoplay from "embla-carousel-autoplay";
import {
  NextButton,
  PrevButton,
  usePrevNextButtons,
} from "./carousel-arrow-buttons";
import { EmblaOptionsType } from "embla-carousel";
import { cn } from "@/utils/common";
import Link from "next/link";
import { useCallback, useEffect } from "react";

interface CarouselProps {
  slides: MaincapResources[];
  options?: EmblaOptionsType;
}

const CarouselItem = (props: CarouselProps) => {
  const { slides, options } = props;
  const [emblaRef, emblaApi] = useEmblaCarousel(options, [
    Fade(),
    Autoplay({ delay: 8000 }),
  ]);

  const { selectedIndex, scrollSnaps, onDotButtonClick } =
    useDotButton(emblaApi);

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = usePrevNextButtons(emblaApi);

  const startAutoChange = useCallback(() => {
    emblaApi?.plugins().autoplay.play();
  }, [emblaApi]);

  const stopAutoChange = useCallback(() => {
    emblaApi?.plugins().autoplay.stop();
  }, [emblaApi]);

  useEffect(() => {
    startAutoChange();
    return () => stopAutoChange();
  }, [startAutoChange, stopAutoChange]);

  return (
    <div className="shadow-md border border-gray-200 dark:border-none rounded-3xl">
      <div
        className="relative overflow-hidden"
        ref={emblaRef}
        onMouseEnter={stopAutoChange}
        onMouseLeave={startAutoChange}
      >
        <div className="flex ml-[calc(1rem_*_-1)] touch-pan-y touch-pinch-zoom">
          {slides.map(({ img, title, url, description }, index) => (
            <div className="relative flex-[0_0_100%] pl-4" key={index}>
              <Link
                href={url}
                className="absolute inset-y-0 left-4 right-0 z-30 md:rounded-3xl overflow-hidden"
              >
                <div className="flex flex-col items-center sm:items-start justify-center size-full px-14 sm:px-24 sm:pr-56 text-start bg-[linear-gradient(to_right,rgba(0,0,0,0.5)_75%,rgba(0,0,0,0)_100%)]">
                  <h1 className="mb-4 text-center sm:text-start text-xl md:text-2xl lg:text-3xl font-sans font-medium tracking-tight leading-none text-white dark:text-white">
                    {title}
                  </h1>
                  <p className="hidden md:block mb-6 2xl:mb-8 text-base font-normal text-gray-200">
                    {description}
                  </p>
                </div>
              </Link>

              <Image
                priority
                quality={90}
                width={982}
                height={286}
                src={img}
                alt={title}
                className="w-full h-52 md:rounded-3xl object-cover object-center"
              />
            </div>
          ))}
        </div>

        <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
        <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />

        <div className="absolute z-30 flex -translate-x-1/2 space-x-3 rtl:space-x-reverse bottom-5 left-1/2">
          {scrollSnaps.map((_, index) => (
            <DotButton
              key={index}
              onClick={() => onDotButtonClick(index)}
              className={cn(
                "h-1.5 rounded-full shadow-sm shadow-black/30 transition-all",
                index === selectedIndex
                  ? "bg-white dark:bg-base-full-dark w-8"
                  : "bg-white/50 dark:bg-base-full-dark-50 w-4"
              )}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CarouselItem;
