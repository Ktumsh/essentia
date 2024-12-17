import withPWAInit from "@ducanh2912/next-pwa";
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
    ],
  },
  transpilePackages: ["geist"],
  experimental: {
    ppr: true,
    serverActions: {
      allowedOrigins: [
        "localhost:3000",
        "https://3xfnptdk-3000.brs.devtunnels.ms",
      ],
    },
  },
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

const withPWA = withPWAInit({
  dest: "public",
  register: true,
  disable: process.env.NODE_ENV === "development",
});

export default withPWA({
  ...nextConfig,
});
