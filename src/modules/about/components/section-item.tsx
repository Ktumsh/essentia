import Image from "next/image";
import { RefObject, useState } from "react";

import { cn } from "@/utils/common";

type SectionItemProps = {
  index: number;
  section: string;
  title: string;
  description: string;
  img: string;
  video: string;
  slideLeftRef: RefObject<HTMLDivElement | null>;
  slideRightRef: RefObject<HTMLDivElement | null>;
};

const SectionItem = (props: SectionItemProps) => {
  const {
    index,
    section,
    title,
    description,
    img,
    video,
    slideLeftRef,
    slideRightRef,
  } = props;

  const [videoError, setVideoError] = useState(false);

  const isPar = index % 2 === 0;

  return (
    <div
      ref={slideLeftRef}
      className={cn(
        isPar ? "slideleft md:pr-14" : "slideright md:pl-14",
        "relative z-10 flex w-full flex-1 items-center justify-between rounded-7xl bg-bento-gradient px-4 pb-4 pt-8 shadow-bento-shadow backdrop-blur-2xl sm:pt-14 md:pt-4",
      )}
    >
      <div
        ref={slideRightRef}
        className={cn(
          isPar ? "md:flex-row-reverse" : "md:flex-row",
          "relative flex w-full flex-1 flex-col gap-10 gap-x-14 text-main",
        )}
      >
        <div className="relative mx-2 w-auto flex-[0_auto] self-center sm:mx-10 md:mx-0 md:w-full md:max-w-md">
          <div className="group relative mb-4 inline-flex self-start overflow-hidden rounded-full bg-light-gradient px-4 py-1 text-xs font-semibold uppercase text-white md:self-center md:text-sm">
            <span>{section}</span>
            <div className="absolute inset-0 top-[-20px] flex h-[calc(100%+40px)] w-full animate-shine-infinite justify-center blur-md">
              <div className="relative h-full w-8 bg-white/30"></div>
            </div>
          </div>
          <h2 className="mb-5 w-full font-grotesk text-3xl font-bold sm:text-5xl">
            {title}
          </h2>
          <p className="max-full mx-auto leading-normal text-main sm:text-2xl">
            {description}
          </p>
        </div>
        <div className="relative overflow-hidden rounded-6xl md:min-h-[600px] md:max-w-3xl">
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
