"use server";

import { cookies } from "next/headers";

export const getReusableCookie = (cookieName: string) => {
  const cookieStore = cookies();
  const reusableCookie = cookieStore.get(cookieName);

  if (reusableCookie) {
    return JSON.parse(reusableCookie.value);
  }

  return null;
};

export const setReusableCookie = async (
  cookieName: string,
  newData: Record<string, any>
) => {
  const currentData = getReusableCookie(cookieName) || {};

  const updatedData = { ...currentData, ...newData };

  cookies().set(cookieName, JSON.stringify(updatedData), {
    path: "/",
    httpOnly: true,
    secure: true,
    maxAge: 60 * 60 * 24 * 365,
  });
};

export const deleteFieldFromCookie = async (
  cookieName: string,
  field: string
) => {
  const currentData = getReusableCookie(cookieName) || {};

  if (field in currentData) {
    delete currentData[field];
    cookies().set(cookieName, JSON.stringify(currentData), {
      path: "/",
      httpOnly: true,
      secure: true,
      maxAge: 60 * 60 * 24 * 365,
    });
  }
};

export const deleteReusableCookie = async (cookieName: string) => {
  cookies().set(cookieName, "", {
    path: "/",
    httpOnly: true,
    secure: true,
    maxAge: 0,
  });
};
