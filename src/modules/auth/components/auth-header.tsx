"use client";

import useWindowSize from "@/modules/core/hooks/use-window-size";
import Image from "next/image";
import Link from "next/link";

const AuthHeader = () => {
  const windowSize = useWindowSize();
  return windowSize.width > 768 ? (
    <div role="banner" className="z-[100] fixed top-0 w-full">
      <div className="flex items-center w-full px-6 h-14 gap-5">
        <div className="flex items-center gap-2">
          <Link
            className="relative size-8 active:scale-95 transition-transform rounded-full"
            href="/"
            aria-label="Página de inicio"
          >
            <Image
              className="h-8 w-auto aspect-auto transition-all ease-in-out"
              width={32}
              height={32}
              quality={100}
              src="/logo-essentia.webp"
              alt="Logo de Essentia"
              priority
            />
          </Link>
          <Link
            href="/"
            className="font-grotesk text-base-color dark:text-white/95"
          >
            Essentia®️
          </Link>
        </div>
      </div>
    </div>
  ) : (
    <div role="banner" className="z-[100] fixed top-10 w-full">
      <div className="flex items-center justify-center w-full px-6 h-14 gap-5">
        <div className="flex flex-col items-center gap-2">
          <Link
            className="relative size-20 active:scale-95 transition-transform rounded-full"
            href="/"
            aria-label="Página de inicio"
          >
            <Image
              className="h-20 w-auto aspect-auto transition-all ease-in-out"
              width={80}
              height={80}
              quality={100}
              src="/logo-essentia.webp"
              alt="Logo de Essentia"
              priority
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AuthHeader;
