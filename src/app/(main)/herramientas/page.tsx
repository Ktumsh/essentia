import { redirect } from "next/navigation";

import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Recursos Adicionales",
  alternates: {
    canonical: "/herramientas",
  },
};

export default function AdditionalsPage() {
  redirect("/herramientas/guias");
}
