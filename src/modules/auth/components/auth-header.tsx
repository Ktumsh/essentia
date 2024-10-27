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
    <div role="banner" className="z-[100] fixed top-0 w-full">
      <div className="flex items-center justify-between w-full px-6 h-14 gap-5">
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
            className="hidden md:block font-grotesk text-main dark:text-white/95"
          >
            Essentia®️
          </Link>
        </div>
        <Button
          as={Link}
          href={isRegister ? "/login" : "/signup"}
          variant="light"
          radius="sm"
          className="bg-white dark:bg-full-dark data-[hover=true]:bg-gray-100 data-[hover=true]:dark:bg-dark md:border border-gray-200 dark:border-dark text-main dark:text-main-dark"
        >
          {isRegister ? "Inicia sesión" : "Regístrate"}
        </Button>
      </div>
    </div>
  );
};

export default AuthHeader;
