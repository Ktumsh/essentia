"use client";

import ReactDOM from "react-dom";

export function PreloadResources() {
  ReactDOM.preconnect("https://js.stripe.com", { crossOrigin: "anonymous" });
  ReactDOM.preconnect("https://vercel.live", { crossOrigin: "anonymous" });
  return null;
}
