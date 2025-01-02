import withSerwistInit from "@serwist/next";
import { NextConfig } from "next";

const nextConfig: NextConfig = {
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
        source: "/adicionales",
        destination: "/adicionales/guias",
        permanent: true,
      },
    ];
  },
};

const withPWA = withSerwistInit({
  disable: process.env.NODE_ENV === "development",
  swSrc: "sw.ts",
  swDest: "public/sw.js",
});

export default withPWA({
  ...nextConfig,
});
