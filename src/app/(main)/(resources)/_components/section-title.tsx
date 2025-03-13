"use client";

import { LinkIcon } from "lucide-react";
import Link from "next/link";

import { cn } from "@/lib/utils";

interface SectionTitleProps {
  title: string;
  hash: string;
  className?: string;
  children?: React.ReactNode;
}

const SectionTitle = ({
  title,
  hash,
  className,
  children,
}: SectionTitleProps) => {
  return (
    <div
      className={cn(
        "relative mb-4 flex flex-col justify-between gap-2 md:flex-row md:items-center md:gap-4",
        className,
      )}
    >
      <h3>
        <Link
          id={hash}
          href={`#${hash}`}
          className="group font-merriweather inline-flex h-auto w-fit items-center gap-0 bg-transparent text-xl font-bold transition hover:opacity-80 md:text-2xl"
        >
          {title}
          <LinkIcon className="ml-1.5 hidden size-5 opacity-0 transition-opacity group-hover:opacity-100 md:block" />
        </Link>
      </h3>
      {children}
    </div>
  );
};

export default SectionTitle;
