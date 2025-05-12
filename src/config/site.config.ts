export const siteConfig = {
  appId: "essentia-web",
  name: "Essentia",
  description:
    "Centraliza tu historial médico, recibe orientación personalizada con IA y accede a rutas de aprendizaje que fortalecen tu bienestar integral",
  url: "https://www.essentia.plus",
  keywords: [
    "essentia",
    "salud",
    "nutricion",
    "alimentacion",
    "bienestar",
    "ejercicios",
    "salud mental",
    "esencial",
    "salud rapida",
  ],
  links: {
    github: "https://github.com/Ktumsh/essentia",
    instagram: "https://www.instagram.com/ktumsh/",
    twitter: "hhttps://twitter.com",
  },
  stripePlanName: {
    premium: "Premium",
    premiumPlus: "Premium Plus",
  },
  plan: {
    free: "free",
    premium: "premium",
    premiumPlus: "premium-plus",
  },
  priceId: {
    free: "price_free",
    premium: "price_1RNvLyI2PMoTUNZe8IKyFEyS",
    premiumPlus: "price_1RNvMOI2PMoTUNZegGqYwx3X",
  },
};

export type SiteConfig = typeof siteConfig;
