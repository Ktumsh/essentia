import { GenerateSW } from "workbox-webpack-plugin";

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.blogs.es",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "imagenes.muyinteresante.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "www.elcalbucano.cl",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "yt3.googleusercontent.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "cdn.elrancahuaso.cl",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "www.ovejeronoticias.cl",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "phantom-elmundo.unidadeditorial.es",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "encrypted-tbn0.gstatic.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "imgs.hipertextual.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "play-lh.googleusercontent.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "i.bytvi.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "platform-lookaside.fbsbx.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "pbs.twimg.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "i.ytimg.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
  experimental: {
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
  webpack(config, { isServer, dev }) {
    if (!isServer && !dev) {
      config.plugins.push(
        new GenerateSW({
          clientsClaim: true,
          skipWaiting: true,
          swDest: "public/sw.js",
          maximumFileSizeToCacheInBytes: 20 * 1024 * 1024,
          runtimeCaching: [
            {
              urlPattern: /\.(?:png|jpg|jpeg|svg|gif|webp)$/,
              handler: "CacheFirst",
              options: {
                cacheName: "images",
                expiration: {
                  maxEntries: 50,
                  maxAgeSeconds: 30 * 24 * 60 * 60,
                },
              },
            },
            {
              urlPattern: /\.(?:js|css)$/,
              handler: "StaleWhileRevalidate",
              options: {
                cacheName: "static-resources",
              },
            },
            {
              urlPattern: /\.(?:html)$/,
              handler: "NetworkFirst",
              options: {
                cacheName: "html-cache",
              },
            },
          ],
        })
      );
    }
    return config;
  },
};

export default nextConfig;
