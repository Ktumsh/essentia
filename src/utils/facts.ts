import { FUN_FACT_DATA, type FunFactType } from "@/db/data/fun-fact-data";

export const getRandomFacts = (
  num: number,
  pool: FunFactType[] = FUN_FACT_DATA,
) => {
  const shuffled = pool.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, num);
};
