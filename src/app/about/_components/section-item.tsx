"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useIntersectionObserver } from "usehooks-ts";

import { cn } from "@/lib/utils";

type SectionItemProps = {
  index: number;
  section: string;
  title: string;
  description: string;
  img: string;
  video: string;
};

const SectionItem = (props: SectionItemProps) => {
  const { index, section, title, description, img, video } = props;

  const [videoError, setVideoError] = useState(false);
  const [hasIntersected, setHasIntersected] = useState(false);

  const { isIntersecting, ref } = useIntersectionObserver({
    threshold: 0.3,
    root: null,
    rootMargin: "0px",
  });

  useEffect(() => {
    if (isIntersecting && !hasIntersected) {
      setHasIntersected(true);
    }
  }, [isIntersecting, hasIntersected]);

  const isPar = index % 2 === 0;

  return (
    <div
      ref={ref}
      className={cn(
        hasIntersected &&
          (isPar
            ? "animate-slide-left md:pr-14"
            : "animate-slide-right md:pl-14"),
        !hasIntersected && "opacity-0",
        "rounded-7xl shadow-bento relative z-10 flex w-full flex-1 items-center justify-between [background-image:var(--bento-gradient)] px-4 pt-8 pb-4 backdrop-blur-2xl sm:pt-14 md:pt-4",
      )}
    >
      <div
        className={cn(
          isPar ? "md:flex-row-reverse" : "md:flex-row",
          "text-foreground relative flex w-full flex-1 flex-col gap-10 gap-x-14",
        )}
      >
        <div className="relative mx-2 w-auto flex-[0_auto] self-center sm:mx-10 md:mx-0 md:w-full md:max-w-md">
          <div className="group relative mb-4 inline-flex self-start overflow-hidden rounded-full [background-image:var(--alternative-gradient)] px-4 py-1 text-xs font-semibold text-white uppercase md:self-center md:text-sm">
            <span>{section}</span>
            <div className="animate-shine-infinite absolute inset-0 top-[-20px] flex h-[calc(100%+40px)] w-full justify-center blur-md">
              <div className="relative h-full w-8 bg-white/30"></div>
            </div>
          </div>
          <h2 className="font-grotesk text-foreground/80 mb-5 w-full text-3xl font-bold sm:text-5xl">
            {title}
          </h2>
          <p className="max-full text-foreground mx-auto leading-normal sm:text-2xl">
            {description}
          </p>
        </div>
        <div className="rounded-6xl relative overflow-hidden md:min-h-[600px] md:max-w-3xl">
          {!videoError ? (
            <video
              preload="metadata"
              poster={img}
              src={video}
              autoPlay
              loop
              muted
              onError={() => setVideoError(true)}
              className="aspect-auto object-cover md:h-[600px]"
            ></video>
          ) : (
            <Image
              src={img}
              width={728}
              height={600}
              alt={section}
              className="aspect-auto object-cover md:h-[600px]"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default SectionItem;
