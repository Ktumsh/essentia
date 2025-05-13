export const CLOUDINARY_BASE_URL =
  "https://res.cloudinary.com/dcub4itgg/image/upload/f_auto,q_auto/v1/essentia";

export const isProductionEnvironment = process.env.NODE_ENV === "production";
export const isDevelopmentEnvironment = process.env.NODE_ENV === "development";
export const isTestEnvironment = process.env.NODE_ENV === "test";

export const MATCH_KEYS = [
  "hierarchy.lvl1",
  "hierarchy.lvl2",
  "hierarchy.lvl3",
  "content",
];
export const RECENT_SEARCHES_KEY = "recent-searches";
export const MAX_RECENT_SEARCHES = 10;
export const MAX_RESULTS = 20;
