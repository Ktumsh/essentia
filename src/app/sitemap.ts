import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://essentia-web.vercel.app",
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 1,
    },
    {
      url: "https://essentia-web.vercel.app/essentia-ai",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: "https://essentia-web.vercel.app/recursos/salud-y-bienestar",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: "https://essentia-web.vercel.app/recursos/ejercicios-y-fitness",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: "https://essentia-web.vercel.app/recursos/nutricion-y-alimentacion",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: "https://essentia-web.vercel.app/recursos/bienestar-emocional",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: "https://essentia-web.vercel.app/recursos/salud-y-educacion-sexual",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: "https://essentia-web.vercel.app/recursos/salud-en-todas-las-edades",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: "https://essentia-web.vercel.app/adicionales/guias",
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.8,
    },
    {
      url: "https://essentia-web.vercel.app/adicionales/emergencias",
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.8,
    },
    {
      url: "https://essentia-web.vercel.app/adicionales/enlaces",
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.1,
    },
    {
      url: "https://essentia-web.vercel.app/adicionales/recomendaciones",
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.1,
    },
    {
      url: "https://essentia-web.vercel.app/centros-de-salud",
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.8,
    },
  ];
}
