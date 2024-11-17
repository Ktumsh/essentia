import Image from "next/image";
import { RefObject } from "react";

import { cn } from "@/utils/common";

type SectionItemProps = {
  wrapper: string;
  inner: string;
  sectionName: string;
  title: string;
  description: string;
  img: string;
  imgAlt: string;
  slideLeftRef?: RefObject<HTMLDivElement | null>;
  slideRightRef?: RefObject<HTMLDivElement | null>;
};

const SectionItem = ({
  wrapper,
  inner,
  sectionName,
  title,
  description,
  img,
  imgAlt,
  slideLeftRef,
  slideRightRef,
}: SectionItemProps) => {
  return (
    <div
      ref={slideLeftRef}
      className={cn(
        wrapper,
        "relative flex",
        "items-center",
        "justify-between",
        "w-full px-4 pt-8 sm:pt-14",
        "bg-bento-gradient pb-4 lg:pt-4",
        "backdrop-blur-2xl",
        "shadow-bento-shadow",
        "z-10 rounded-[60px]",
      )}
    >
      <div className="pointer-events-none absolute inset-0 z-10 rounded-[60px] bg-noise bg-[length:100px] bg-repeat opacity-5"></div>
      <div
        ref={slideRightRef}
        className={cn(
          inner,
          "relative flex flex-col",
          "[flex-flow:column]",
          "w-full gap-10 gap-x-14",
          "text-main",
        )}
      >
        <div className="relative mx-2 w-auto flex-[0_auto] self-center sm:mx-10 lg:mx-0 lg:w-full lg:max-w-md">
          <div className="group relative mb-4 inline-flex self-start overflow-hidden rounded-full bg-light-gradient px-4 py-1 text-sm font-semibold uppercase text-white lg:self-center">
            <span>{sectionName}</span>
            <div className="absolute inset-0 top-[-20px] flex h-[calc(100%+40px)] w-full animate-shine-infinite justify-center blur-md">
              <div className="relative h-full w-8 bg-white/30"></div>
            </div>
          </div>
          <h2 className="mb-5 w-full font-grotesk text-3xl font-extrabold sm:text-5xl">
            {title}
          </h2>
          <p className="max-full mx-auto leading-normal text-main sm:text-2xl">
            {description}
          </p>
        </div>
        <div className="relative flex w-full flex-[0_auto] items-center justify-center rounded-[50px] shadow-xl">
          <div className="aspect-auto size-full overflow-hidden rounded-[50px] lg:min-h-[600px] lg:max-w-3xl">
            <Image
              width={704}
              height={600}
              className="h-full object-cover"
              loading="lazy"
              src={img}
              alt={imgAlt}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SectionItem;
