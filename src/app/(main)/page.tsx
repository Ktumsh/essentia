import Home from "./_components/home";

import type { Metadata } from "next";


export const metadata: Metadata = {
  title: "Inicio",
};

export default async function HomePage() {
  return <Home />;
}
