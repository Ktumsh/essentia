import withSerwistInit from "@serwist/next";
import { NextConfig } from "next";

import { isProductionEnvironment } from "@/lib/consts";

const nextConfig: NextConfig = {
  turbopack: {
    resolveExtensions: [".mdx", ".tsx", ".ts", ".jsx", ".js", ".mjs", ".json"],
    resolveAlias: {
      canvas: "./empty-module.ts",
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "vhr5hh5pbkumdnyu.public.blob.vercel-storage.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
  transpilePackages: ["geist"],
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: "/herramientas",
        destination: "/herramientas/guias",
        permanent: true,
      },
      {
        source: "/historial-medico/carpetas",
        destination: "/historial-medico",
        permanent: true,
      },
    ];
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
        ],
      },
      {
        source: "/public/sw.js",
        headers: [
          {
            key: "Content-Type",
            value: "application/javascript; charset=utf-8",
          },
          {
            key: "Cache-Control",
            value: "no-cache, no-store, must-revalidate",
          },
          {
            key: "Content-Security-Policy",
            value: "default-src 'self'; script-src 'self'",
          },
        ],
      },
    ];
  },
};

const withPWA = withSerwistInit({
  disable: !isProductionEnvironment,
  swSrc: "sw.ts",
  swDest: "public/sw.js",
});

export default withPWA({
  ...nextConfig,
});
