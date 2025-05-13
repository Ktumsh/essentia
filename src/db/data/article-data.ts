import { HEALTH_ARTICLE_DATA } from "@/db/data/health-article-data";

import type { ArticleType } from "@/lib/types";

export const ARTICLES_BY_RESOURCE: Record<string, Array<ArticleType>> = {
  "salud-y-bienestar": HEALTH_ARTICLE_DATA,
};
