import Link from "next/link";

import { cn } from "@/lib/utils";

import Logo from "./logo";

interface FullLogoProps {
  className?: string;
  withLabel?: boolean;
  collapsed?: boolean;
  href?: string;
}

const FullLogo = ({
  className,
  withLabel = false,
  collapsed = false,
  href = "/",
}: FullLogoProps) => {
  if (collapsed) {
    return (
      <div
        className={cn(
          "bg-logo mask mask-squircle grid aspect-square size-8 place-content-center",
          className,
        )}
      >
        <Logo />
      </div>
    );
  }

  if (withLabel) {
    return (
      <Link href={href} className="flex items-center gap-2">
        <div className="relative inline-flex align-middle">
          <div
            className={cn(
              "bg-logo mask mask-squircle grid aspect-square size-8 place-content-center",
              className,
            )}
          >
            <Logo />
          </div>
        </div>
        <div className="grid flex-1 text-left text-sm leading-tight">
          <span className="truncate font-semibold">Essentia</span>
        </div>
      </Link>
    );
  }

  return (
    <div className="relative inline-flex align-middle">
      <div
        className={cn(
          "bg-logo mask mask-squircle grid aspect-square size-8 place-content-center",
          className,
        )}
      >
        <Logo />
      </div>
    </div>
  );
};

export default FullLogo;
