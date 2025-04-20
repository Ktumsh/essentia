import { Metadata } from "next";
import { notFound } from "next/navigation";

import { GUIDES_DATA } from "@/consts/guide-data";

import Guide from "../_components/guide";

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const id = (await params).id;
  const guide = GUIDES_DATA.find((guide) => String(guide.id) === id);

  if (!guide) {
    return { title: "Guía no encontrada" };
  }

  return {
    title: guide.title,
    alternates: {
      canonical: `/${id}`,
    },
  };
}

export default async function GuidePage({ params }: Props) {
  const id = (await params).id;

  const guide = GUIDES_DATA.find((guide) => String(guide.id) === id);

  if (!guide) {
    notFound();
  }

  return <Guide guide={guide} />;
}
