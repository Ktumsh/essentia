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
    <div className="shadow-md border border-white dark:border-full-dark rounded-3xl">
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

              <div className="flex items-center w-fit md:rounded-3xl overflow-hidden h-52">
                <Image
                  priority={index < 2}
                  loading={index > 1 ? "lazy" : "eager"}
                  quality={90}
                  width={index === 1 ? 982 : index === 3 ? 1080 : 992}
                  height={index === 1 ? 561 : index === 3 ? 549 : 558}
                  src={img}
                  alt={title}
                  className="!h-auto object-cover object-center aspect-auto"
                />
              </div>
            </div>
          ))}
        </div>

        <PrevButton
          onPress={onPrevButtonClick}
          disabled={prevBtnDisabled}
          aria-label="Anterior"
        />
        <NextButton
          onPress={onNextButtonClick}
          disabled={nextBtnDisabled}
          aria-label="Siguiente"
        />

        <div className="absolute z-30 flex -translate-x-1/2 space-x-4 rtl:space-x-reverse bottom-5 left-1/2">
          {scrollSnaps.map((_, index) => (
            <DotButton
              key={index}
              onClick={() => onDotButtonClick(index)}
              aria-current={index === selectedIndex ? "true" : "false"}
              aria-label={`Deslizamiento ${index + 1}`}
              className={cn(
                "h-2 rounded-full shadow-sm shadow-black/30 transition-all",
                index === selectedIndex
                  ? "bg-white dark:bg-full-dark w-10"
                  : "bg-white/50 dark:bg-full-dark/50 w-5"
              )}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CarouselItem;
