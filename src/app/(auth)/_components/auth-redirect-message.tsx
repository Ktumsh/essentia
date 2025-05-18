"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export const AuthRedirectMessage = () => {
  const pathname = usePathname();

  const isLogin = pathname.startsWith("/login");
  const isRecover = pathname.startsWith("/recover-password");

  const message = isRecover
    ? "¿Recordaste tu contraseña?"
    : isLogin
      ? "¿No tienes una cuenta?"
      : "¿Ya tienes una cuenta?";
  const linkLabel = isLogin && !isRecover ? "Regístrate" : "Inicia sesión";
  const linkHref = isLogin && !isRecover ? "/signup" : "/login";

  return (
    <div className="text-foreground/80 mt-5 flex items-center justify-center self-center text-center text-sm">
      <p>
        {message}{" "}
        <Link className="text-secondary font-medium" href={linkHref}>
          {linkLabel}
        </Link>
      </p>
    </div>
  );
};
