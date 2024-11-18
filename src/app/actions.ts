"use server";

import { cookies } from "next/headers";

import { getRandomFacts } from "@/modules/core/lib/utils";

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

export const dailyFacts = async () => {
  const cookieStore = await cookies();
  const today = new Date().toISOString().split("T")[0];

  const savedData = cookieStore.get("dailyHealthFacts");

  if (!savedData || JSON.parse(savedData.value).date !== today) {
    const newFacts = getRandomFacts(4);

    cookieStore.set(
      "dailyHealthFacts",
      JSON.stringify({ date: today, facts: newFacts }),
      {
        path: "/",
        httpOnly: true,
        secure: true,
        maxAge: 86400,
      },
    );

    return newFacts;
  }

  return JSON.parse(savedData.value).facts;
};
