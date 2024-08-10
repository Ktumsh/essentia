import NextAuth from "next-auth";
import { authConfig } from "./auth.config";

export default NextAuth(authConfig).auth;

export const config = {
  matcher: [
    "/",
    "/salud-y-bienestar/:path*",
    "/ejercicios-y-fitness/:path*",
    "/nutricion-y-alimentacion/:path*",
    "/bienestar-emocional/:path*",
    "/salud-y-educacion-sexual/:path*",
    "/salud-para-todas-las-edades/:path*",
    "/noticias",
    "/essentia-ai",
    "/adicionales/:path*",
    "/comunidad/:path*",
    "/profile",
    "/((?!api|_next/static|_next/image|.*\\.png$).*)",
  ],
};
