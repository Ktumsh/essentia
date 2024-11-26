"use client";

import { EmblaOptionsType } from "embla-carousel";
import Autoplay from "embla-carousel-autoplay";
import Fade from "embla-carousel-fade";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect } from "react";

import { MaincapResources } from "@/types/resource";
import { cn } from "@/utils/common";

import {
  NextButton,
  PrevButton,
  usePrevNextButtons,
} from "./carousel-arrow-buttons";
import { DotButton, useDotButton } from "./carousel-dot-buttons";

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
    <div className="rounded-3xl border border-white shadow-md dark:border-full-dark">
      <div
        className="relative overflow-hidden"
        ref={emblaRef}
        onMouseEnter={stopAutoChange}
        onMouseLeave={startAutoChange}
      >
        <div className="ml-[calc(1rem_*_-1)] flex touch-pan-y touch-pinch-zoom">
          {slides.map(({ img, title, url, description }, index) => (
            <div className="relative flex-[0_0_100%] pl-4" key={index}>
              <Link
                href={url}
                className="absolute inset-y-0 left-4 right-0 z-30 overflow-hidden md:rounded-3xl"
              >
                <div className="flex size-full flex-col items-center justify-center bg-[linear-gradient(to_right,rgba(0,0,0,0.5)_75%,rgba(0,0,0,0)_100%)] px-14 text-start sm:items-start sm:px-24 sm:pr-56">
                  <h1 className="mb-4 text-center font-sans text-xl font-medium leading-none tracking-tight text-white dark:text-white sm:text-start md:text-2xl lg:text-3xl">
                    {title}
                  </h1>
                  <p className="mb-6 hidden text-base font-normal text-gray-200 md:block 2xl:mb-8">
                    {description}
                  </p>
                </div>
              </Link>

              <div className="flex h-56 w-fit items-center overflow-hidden md:rounded-3xl">
                <Image
                  priority={index < 2}
                  loading={index > 1 ? "lazy" : "eager"}
                  quality={90}
                  width={1110}
                  height={index === 0 || index === 2 ? 624 : 635}
                  src={img}
                  alt={title}
                  className="aspect-auto !h-auto object-cover object-center"
                />
              </div>
            </div>
          ))}
        </div>

        <PrevButton
          onClick={onPrevButtonClick}
          disabled={prevBtnDisabled}
          aria-label="Anterior"
        />
        <NextButton
          onClick={onNextButtonClick}
          disabled={nextBtnDisabled}
          aria-label="Siguiente"
        />

        <div className="absolute bottom-5 left-1/2 z-30 flex -translate-x-1/2 space-x-4 rtl:space-x-reverse">
          {scrollSnaps.map((_, index) => (
            <DotButton
              key={index}
              onClick={() => onDotButtonClick(index)}
              aria-current={index === selectedIndex ? "true" : "false"}
              aria-label={`Deslizamiento ${index + 1}`}
              className={cn(
                "h-2 rounded-full shadow-sm shadow-black/30 transition-all",
                index === selectedIndex
                  ? "w-10 bg-white dark:bg-full-dark"
                  : "w-5 bg-white/50 dark:bg-full-dark/50",
              )}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CarouselItem;
