import Image from "next/image";

import { cn } from "@/utils";

interface AerisLogoProps {
  src?: string;
  width?: number;
  height?: number;
  className?: string;
}

const AerisLogo = ({
  src = "/aeris-logo.svg",
  width = 16,
  height = 16,
  className,
}: AerisLogoProps) => {
  return (
    <Image
      aria-label="Logo Aeris"
      src={src}
      alt="Logo Aeris"
      width={width}
      height={height}
      className={cn("h-4 w-auto shrink-0", className)}
    />
  );
};

export default AerisLogo;
