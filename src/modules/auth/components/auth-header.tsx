"use client";

import { Button } from "@nextui-org/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const AuthHeader = () => {
  const pathname = usePathname();
  const isRegister = pathname === "/signup";
  const isVerifyEmail = pathname.startsWith("/verify-email");
  if (isVerifyEmail) {
    return null;
  }
  return (
    <div role="banner" className="fixed top-0 z-[100] w-full">
      <div className="flex h-14 w-full items-center justify-between gap-5 px-6">
        <div className="flex items-center gap-2">
          <Link
            className="relative size-8 rounded-full transition-transform active:scale-95"
            href="/"
            aria-label="Página de inicio"
          >
            <Image
              className="aspect-auto h-8 w-auto transition-all ease-in-out"
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
            className="hidden font-grotesk text-main dark:text-white/95 md:block"
          >
            Essentia®️
          </Link>
        </div>
        <Button
          as={Link}
          href={isRegister ? "/login" : "/signup"}
          variant="light"
          radius="sm"
          className="border-gray-200 bg-white text-main data-[hover=true]:bg-gray-100 dark:border-dark dark:bg-full-dark dark:text-main-dark data-[hover=true]:dark:bg-dark md:border"
        >
          {isRegister ? "Inicia sesión" : "Regístrate"}
        </Button>
      </div>
    </div>
  );
};

export default AuthHeader;
