import { HEALTH_FACTS } from "@/consts/health-facts";
import { HealthFact } from "@/types/common";

export const getRandomFacts = (num: number): HealthFact[] => {
  const shuffled = HEALTH_FACTS.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, num);
};
