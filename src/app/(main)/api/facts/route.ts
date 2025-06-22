import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import { FUN_FACT_DATA, type FunFactType } from "@/db/data/fun-fact-data";
import { getRandomFacts } from "@/utils";

export async function GET() {
  const cookieStore = await cookies();
  const today = new Date().toISOString().split("T")[0];

  const COOKIE_NAME = "_usrData_hF";

  const savedData = cookieStore.get(COOKIE_NAME);

  let usedFacts: FunFactType[] = [];

  if (savedData) {
    const parsedData: {
      date: string;
      facts: FunFactType[];
      usedFacts: FunFactType[];
    } = JSON.parse(savedData.value);

    if (parsedData.date === today) {
      return NextResponse.json(parsedData.facts);
    }

    usedFacts = parsedData.usedFacts || [];
  }

  const remainingFacts = FUN_FACT_DATA.filter(
    (fact) => !usedFacts.some((usedFact) => usedFact.fact === fact.fact),
  );

  let newFacts: FunFactType[];

  if (remainingFacts.length === 0) {
    usedFacts = [];
    newFacts = getRandomFacts(1);
  } else {
    newFacts = getRandomFacts(1, remainingFacts);
  }

  usedFacts.push(...newFacts);

  const response = NextResponse.json(newFacts);
  response.cookies.set(
    COOKIE_NAME,
    JSON.stringify({ date: today, facts: newFacts, usedFacts }),
    {
      path: "/",
      httpOnly: true,
      secure: true,
      maxAge: 86400,
    },
  );

  return response;
}
