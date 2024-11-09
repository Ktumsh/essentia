"use client";

import { useRef } from "react";

import { cn } from "@/utils/common";

import SectionItem from "./section-item";
import useAnimateOnScroll from "../hooks/use-animate-on-scroll";

type Props = {
  sectionId: string;
  classSection?: string;
  wrapper: string;
  inner: string;
  sectionName: string;
  title: string;
  description: string;
  img: string;
  imgAlt: string;
  children?: React.ReactNode;
};

const Section = ({
  sectionId,
  classSection,
  wrapper,
  inner,
  sectionName,
  title,
  description,
  img,
  imgAlt,
  children,
}: Props) => {
  const slideLeftRef = useRef<HTMLDivElement | null>(null);
  const slideRightRef = useRef<HTMLDivElement | null>(null);

  useAnimateOnScroll([slideLeftRef, slideRightRef]);

  return (
    <section id={sectionId} className="relative mx-auto flex w-full flex-col">
      {children}
      <div className={cn(classSection, "lg:max-h-[1030px]")}>
        <div className="px-5 sm:px-10">
          <div className="relative mx-auto w-full max-w-7xl">
            <SectionItem
              wrapper={wrapper}
              inner={inner}
              sectionName={sectionName}
              title={title}
              description={description}
              img={img}
              imgAlt={imgAlt}
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
