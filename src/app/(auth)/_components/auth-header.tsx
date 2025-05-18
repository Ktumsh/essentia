"use client";

import { usePathname, useRouter } from "next/navigation";

import { Button } from "@/components/kit/button";
import FullLogo from "@/components/ui/layout/full-logo";

const AuthHeader = () => {
  const router = useRouter();
  const pathname = usePathname();
  const isLogin = pathname === "/login";
  const isRegister = pathname === "/signup";
  const isVerifyEmail = pathname.startsWith("/verify-email");

  if (isVerifyEmail) return null;

  return (
    <div role="banner" className="fixed top-0 z-50 w-full backdrop-blur-md">
      <div className="flex h-14 w-full items-center justify-between gap-5 px-6">
        <FullLogo withLabel />
        <Button
          variant="accent"
          size="sm"
          onClick={() =>
            router.push(isRegister ? "/login" : isLogin ? "/signup" : "/login")
          }
          className="md:bg-accent bg-background"
        >
          {isRegister
            ? "Inicia sesión"
            : isLogin
              ? "Regístrate"
              : "Inicia sesión"}
        </Button>
      </div>
    </div>
  );
};

export default AuthHeader;
