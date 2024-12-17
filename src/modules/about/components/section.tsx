"use client";

import { useRef } from "react";

import { cn } from "@/utils/common";

import SectionItem from "./section-item";
import useAnimateOnScroll from "../hooks/use-animate-on-scroll";

type SectionProps = {
  index: number;
  slug: string;
  section: string;
  title: string;
  description: string;
  img: string;
  video: string;
  children?: React.ReactNode;
};

const Section = (props: SectionProps) => {
  const { index, slug, children } = props;
  const slideLeftRef = useRef<HTMLDivElement | null>(null);
  const slideRightRef = useRef<HTMLDivElement | null>(null);

  useAnimateOnScroll([slideLeftRef, slideRightRef]);

  return (
    <section id={slug} className="relative mx-auto flex w-full flex-col">
      {children}
      <div
        className={cn(
          "max-h-[1030px] py-28 md:py-40",
          index === 0 && "md:pt-56",
        )}
      >
        <div className="px-5 sm:px-10">
          <div className="relative mx-auto w-full max-w-7xl">
            <SectionItem
              {...props}
              slideLeftRef={slideLeftRef}
              slideRightRef={slideRightRef}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Section;
