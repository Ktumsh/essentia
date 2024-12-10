"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import Logo from "@/modules/core/components/ui/utils/logo";

const AuthHeader = () => {
  const pathname = usePathname();
  const isRegister = pathname === "/signup";
  const isVerifyEmail = pathname.startsWith("/verify-email");

  if (isVerifyEmail) return null;

  return (
    <div role="banner" className="fixed top-0 z-[100] w-full">
      <div className="flex h-14 w-full items-center justify-between gap-5 px-6">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex size-8 shrink-0 items-center justify-center rounded-md bg-[#d5d8eb] md:size-10">
            <Logo className="h-4 md:h-5" />
          </div>
          <div className="grid flex-1 text-left text-sm leading-tight md:text-base">
            <span className="truncate font-semibold">Essentia</span>
          </div>
        </Link>
        <Link
          href={isRegister ? "/login" : "/signup"}
          className="inline-flex h-8 items-center rounded-md border-gray-200 bg-white px-4 text-sm text-main transition-colors hover:bg-gray-100 dark:border-dark dark:bg-full-dark dark:text-main-dark hover:dark:bg-dark md:h-10 md:border"
        >
          {isRegister ? "Inicia sesión" : "Regístrate"}
        </Link>
      </div>
    </div>
  );
};

export default AuthHeader;
