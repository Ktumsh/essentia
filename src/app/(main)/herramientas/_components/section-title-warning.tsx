import { Hash } from "lucide-react";
import Link from "next/link";

import { cn } from "@/utils";

interface SectionTitleWarningProps {
  title: string;
  hash: string;
  color?: string;
  icon?: React.ReactNode;
}

const SectionTitleWarning = ({
  title,
  hash,
  color,
  icon,
}: SectionTitleWarningProps) => {
  return (
    <h2 className="mb-2 self-start">
      <Link
        id={hash}
        href={`#${hash}`}
        className={cn(
          "group/title font-merriweather flex items-center gap-2 text-lg font-semibold transition active:scale-100",
          color,
        )}
      >
        {icon}
        {title}
        <Hash className="size-4 opacity-0 transition-opacity group-hover/title:opacity-100" />
      </Link>
    </h2>
  );
};

export default SectionTitleWarning;
