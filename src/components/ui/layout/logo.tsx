import Image from "next/image";

import { cn } from "@/utils";

interface LogoProps {
  width?: number;
  height?: number;
  className?: string;
}

const Logo = ({ width, height, className }: LogoProps) => {
  return (
    <Image
      aria-label="Logo Essentia"
      src="/logo-essentia.webp"
      alt="Logo Essentia"
      width={width || 16}
      height={height || 16}
      className={cn("h-4 w-auto shrink-0", className)}
    />
  );
};

export default Logo;
