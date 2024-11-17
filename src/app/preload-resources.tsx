"use client";

import { preconnect } from "react-dom";

export function PreloadResources() {
  preconnect("https://js.stripe.com", { crossOrigin: "anonymous" });
  preconnect("https://vercel.live", { crossOrigin: "anonymous" });
  return null;
}
