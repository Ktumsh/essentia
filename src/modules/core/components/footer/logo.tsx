import Image from "next/image";
import Link from "next/link";

import { cn } from "@/utils/common";

interface LogoProps {
  width?: number;
  height?: number;
  className?: string;
}

const Logo = ({ width, height, className }: LogoProps) => {
  return (
    <Link href="/" aria-label="Logo Essentia">
      <Image
        src="/logo-essentia.webp"
        alt="Logo Essentia"
        width={width || 10.66}
        height={height || 16}
        className={cn("w-auto h-4", className)}
      />
    </Link>
  );
};

export default Logo;
