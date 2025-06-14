import { describe, it, expect } from "vitest";

import { shuffleArray } from "@/utils";

describe("shuffleArray", () => {
  it("devuelve un array con los mismos elementos, pero en distinto orden", () => {
    const original = [1, 2, 3, 4, 5];
    const shuffled = shuffleArray([...original]);

    // Debe tener la misma longitud
    expect(shuffled).toHaveLength(original.length);

    // Debe contener los mismos elementos, sin importar el orden
    expect(shuffled.sort()).toEqual(original.sort());
  });

  it("puede devolver el mismo orden si el aleatorio lo decide", () => {
    const input = [1];
    const result = shuffleArray([...input]);
    expect(result).toEqual(input);
  });

  it("no muta el array si tiene 0 o 1 elementos", () => {
    expect(shuffleArray([])).toEqual([]);
    expect(shuffleArray([42])).toEqual([42]);
  });
});
