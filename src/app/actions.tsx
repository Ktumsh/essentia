"use server";

import { cookies } from "next/headers";

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
