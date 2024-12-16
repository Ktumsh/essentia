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
  const { slug, children } = props;
  const slideLeftRef = useRef<HTMLDivElement | null>(null);
  const slideRightRef = useRef<HTMLDivElement | null>(null);

  useAnimateOnScroll([slideLeftRef, slideRightRef]);

  return (
    <section
      id={slug}
      className={cn(
        "relative mx-auto flex w-full flex-col",
        slug === "nuestro_metodo" && "mt-24",
      )}
    >
      {children}
      <div className={cn("py-24 md:max-h-[1030px] md:py-40")}>
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
