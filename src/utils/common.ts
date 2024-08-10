import { clsx, type ClassValue } from "clsx";
import { customAlphabet } from "nanoid";
import { twMerge } from "tailwind-merge";
import { capitalize } from "./format";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const nanoid = customAlphabet(
  "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",
  7
); // 7-character random string

export async function fetcher<JSON = any>(
  input: RequestInfo,
  init?: RequestInit
): Promise<JSON> {
  const res = await fetch(input, init);

  if (!res.ok) {
    const json = await res.json();
    if (json.error) {
      const error = new Error(json.error) as Error & {
        status: number;
      };
      error.status = res.status;
      throw error;
    } else {
      throw new Error("An unexpected error occurred");
    }
  }

  return res.json();
}

export const runAsyncFnWithoutBlocking = (
  fn: (...args: any) => Promise<any>
) => {
  fn();
};

export const sleep = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

export const getStringFromBuffer = (buffer: ArrayBuffer) =>
  Array.from(new Uint8Array(buffer))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");

export const getFirstNameAndLastName = (
  fullName: string | undefined | null
) => {
  if (!fullName) return "Usuario";
  const nameParts = fullName.toLowerCase().split(" ");
  if (nameParts.length < 3) return capitalize(fullName);
  return `${capitalize(nameParts[0])} ${capitalize(
    nameParts[nameParts.length - 2]
  )}`;
};

export const usernameOrEmail = (session: any) => {
  const username = session?.user?.username
    ? `@${session.user.username}`
    : session?.user?.email;

  return username;
};

export const containsAllLetters = (str: string, query: string) => {
  let strIndex = 0;
  for (const char of query) {
    strIndex = str.indexOf(char, strIndex);
    if (strIndex === -1) return false;
    strIndex++;
  }
  return true;
};

export const shuffleArray = <T>(array: T[]): T[] => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};
