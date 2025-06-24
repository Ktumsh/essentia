import { NextRequest, NextResponse } from "next/server";

import { auth } from "@/app/(auth)/auth";

const PUBLIC_AUTH_ROUTES = [
  "/login",
  "/signup",
  "/recover-password",
  "/verify-email",
  "/account-deleted",
];

const PROTECTED_ROUTES = [
  "/account",
  "/settings/subscriptions",
  "/settings/notifications",
  "/settings/account-profile",
  "/profiles",
  "/payment/success",
  "/payment/canceled",
];

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const session = await auth();
  const userId = session?.user?.id as string;

  // Redirigir si el usuario ya está autenticado y trata de ir a rutas públicas
  if (userId && PUBLIC_AUTH_ROUTES.includes(pathname)) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // Ruta protegida: admin
  if (pathname.startsWith("/admin/feedback") && !userId) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // Rutas protegidas por login
  const isProtected = PROTECTED_ROUTES.some((route) =>
    pathname.startsWith(route),
  );

  if (isProtected && !userId) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/(login|signup|recover-password|verify-email|account-deleted)",
    "/admin/feedback",
    "/account/:path*",
    "/settings/(subscriptions|notifications|account-profile)",
    "/profiles/:path*",
    "/payment/success",
    "/payment/canceled",
  ],
};
