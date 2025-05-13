"use server";

import { cookies } from "next/headers";

import { FUN_FACT_DATA } from "@/db/data/fun-fact-data";
import { getRandomFacts } from "@/lib/utils";
import { HealthFact } from "@/types/common";

export const getReusableCookie = async (cookieName: string) => {
  const cookieStore = await cookies();
  const reusableCookie = cookieStore.get(cookieName);

  if (reusableCookie) {
    return JSON.parse(reusableCookie.value);
  }

  return null;
};

export const setReusableCookie = async (
  cookieName: string,
  newData: Record<string, any>,
) => {
  const currentData = getReusableCookie(cookieName) || {};

  const updatedData = { ...currentData, ...newData };

  (await cookies()).set(cookieName, JSON.stringify(updatedData), {
    path: "/",
    httpOnly: true,
    secure: true,
    maxAge: 60 * 60 * 24 * 365,
  });
};

export const deleteFieldFromCookie = async (
  cookieName: string,
  field: string,
) => {
  const currentData: Record<string, any> = getReusableCookie(cookieName) || {};

  if (field in currentData) {
    delete currentData[field];
    (await cookies()).set(cookieName, JSON.stringify(currentData), {
      path: "/",
      httpOnly: true,
      secure: true,
      maxAge: 60 * 60 * 24 * 365,
    });
  }
};

export const deleteReusableCookie = async (cookieName: string) => {
  (await cookies()).set(cookieName, "", {
    path: "/",
    httpOnly: true,
    secure: true,
    maxAge: 0,
  });
};

export const dailyFacts = async (): Promise<HealthFact[]> => {
  const cookieStore = await cookies();
  const today = new Date().toISOString().split("T")[0];

  const COOKIE_NAME = "_usrData_hF";

  const savedData = cookieStore.get(COOKIE_NAME);

  let usedFacts: HealthFact[] = [];
  if (savedData) {
    const parsedData: {
      date: string;
      facts: HealthFact[];
      usedFacts: HealthFact[];
    } = JSON.parse(savedData.value);
    if (parsedData.date === today) {
      return parsedData.facts;
    }
    usedFacts = parsedData.usedFacts || [];
  }

  const remainingFacts: HealthFact[] = FUN_FACT_DATA.filter(
    (fact) => !usedFacts.some((usedFact) => usedFact.fact === fact.fact),
  );

  let newFacts: HealthFact[];
  if (remainingFacts.length === 0) {
    usedFacts = [];
    newFacts = getRandomFacts(1);
  } else {
    newFacts = getRandomFacts(1, remainingFacts);
  }

  usedFacts.push(...newFacts);

  cookieStore.set(
    COOKIE_NAME,
    JSON.stringify({ date: today, facts: newFacts, usedFacts }),
    {
      path: "/",
      httpOnly: true,
      secure: true,
      maxAge: 86400,
    },
  );

  return newFacts;
};
