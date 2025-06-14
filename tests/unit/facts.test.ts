import { FUN_FACT_DATA } from "@/db/data/fun-fact-data";
import { getRandomFacts } from "@/utils";

describe("getRandomFacts", () => {
  it("devuelve la cantidad correcta de datos solicitados", () => {
    const result = getRandomFacts(3);
    expect(result).toHaveLength(3);
  });

  it("usa un pool personalizado si se pasa como argumento", () => {
    const customPool = [{ text: "dato 1" }, { text: "dato 2" }] as any;
    const result = getRandomFacts(1, customPool);
    expect(customPool).toContain(result[0]);
  });

  it("devuelve elementos del arreglo original", () => {
    const result = getRandomFacts(2);
    result.forEach((item) => {
      expect(FUN_FACT_DATA).toContain(item);
    });
  });
});
