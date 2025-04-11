import { LinkIcon, TriangleAlert } from "lucide-react";
import Link from "next/link";

import { Badge } from "@/components/kit/badge";

interface SectionTitleWarningProps {
  title: string;
  hash: string;
}

const SectionTitleWarning = ({ title, hash }: SectionTitleWarningProps) => {
  return (
    <div className="mb-2 self-start">
      <Link
        id={hash}
        href={`#${hash}`}
        className="group flex h-auto w-fit items-center p-0 text-xl font-semibold transition active:scale-100"
      >
        <Badge variant="primary" className="gap-1 py-1">
          <TriangleAlert className="size-3.5" />
          <h3>{title}</h3>
        </Badge>
        <LinkIcon className="ml-1 size-5 opacity-0 transition-opacity group-hover:opacity-100" />
      </Link>
    </div>
  );
};

export default SectionTitleWarning;
