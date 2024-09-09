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
};

export default nextConfig;
