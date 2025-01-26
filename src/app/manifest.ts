import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    id: "essentia-web",
    name: "Essentia",
    short_name: "Essentia",
    description:
      "Essentia es una plataforma educativa de información sobre salud que proporciona recursos y herramientas para mejorar tu bienestar.",
    theme_color: "#000",
    background_color: "#fff",
    start_url: "/",
    display: "standalone",
    orientation: "portrait",
    protocol_handlers: [
      {
        protocol: "web+essentia",
        url: "/?protocol=%s",
      },
    ],
    icons: [
      {
        sizes: "192x192",
        src: "web-app-manifest-192x192.png",
        type: "image/png",
        purpose: "maskable",
      },
      {
        sizes: "512x512",
        src: "web-app-manifest-512x512.png",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/screenshots/screenshot-wide.png",
        sizes: "1920x911",
        type: "image/png",
      },
      {
        src: "/screenshots/screenshot-narrow.png",
        sizes: "377x817",
        type: "image/png",
      },
    ],
  };
}
