"use client";

import { cn } from "@/lib/utils";

import SectionItem from "./section-item";

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
            <SectionItem {...props} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Section;
