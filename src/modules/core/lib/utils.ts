import { HEALTH_FACTS } from "@/consts/health-facts";
import { HealthFact } from "@/types/common";

export const getRandomFacts = (num: number): HealthFact[] => {
  const shuffled = HEALTH_FACTS.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, num);
};

export function calculateAge(dob: string) {
  const birthDate = new Date(dob);
  const today = new Date();

  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDifference = today.getMonth() - birthDate.getMonth();

  if (
    monthDifference < 0 ||
    (monthDifference === 0 && today.getDate() < birthDate.getDate())
  ) {
    age--;
  }

  return age;
}
