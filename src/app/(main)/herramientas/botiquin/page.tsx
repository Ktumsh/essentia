import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Botiquín",
  alternates: {
    canonical: "/herramientas/botiquin",
  },
};

export default function KitPage() {
  return null;
}
