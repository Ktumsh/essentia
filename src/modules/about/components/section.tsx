"use client";

import { useEffect } from "react";

import { cn } from "@/utils/common";

import SectionItem from "./section-item";

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
  useEffect(() => {
    const line2 = document.getElementById("line-1");

    if (line2) {
      setTimeout(() => {
        line2.classList.add("build-in-animate-line");
      }, 1500);
    }

    const slideLeftElements = document.querySelectorAll(".slideleft");
    const slideRightElements = document.querySelectorAll(".slideright");

    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.3,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]): void => {
      entries.forEach((entry) => {
        if (entry.intersectionRatio >= 0.3) {
          entry.target.classList.add("build-in-animate");
        }
      });
    };

    const observer = new IntersectionObserver(
      observerCallback,
      observerOptions
    );

    slideLeftElements.forEach((element) => observer.observe(element));
    slideRightElements.forEach((element) => observer.observe(element));

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <section id={sectionId} className="relative flex flex-col mx-auto w-full">
      {children}
      <div className={cn(classSection, "lg:max-h-[1030px]")}>
        <div className="px-5 sm:px-10">
          <div className="relative w-full mx-auto max-w-[1250px]">
            {/* SectionItem */}
            <SectionItem
              wrapper={wrapper}
              inner={inner}
              sectionName={sectionName}
              title={title}
              description={description}
              img={img}
              imgAlt={imgAlt}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Section;
