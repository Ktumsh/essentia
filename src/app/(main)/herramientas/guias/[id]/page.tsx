import { notFound } from "next/navigation";

import { GUIDE_DATA } from "@/db/data/guide-data";

import Guide from "../_components/guide";

import type { Metadata } from "next";

type GuidePageProps = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({
  params,
}: GuidePageProps): Promise<Metadata> {
  const { id } = await params;
  const guide = GUIDE_DATA.find((guide) => String(guide.id) === id);

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

export async function generateStaticParams() {
  return GUIDE_DATA.map((guide) => ({
    id: String(guide.id),
  }));
}

export default async function GuidePage({ params }: GuidePageProps) {
  const { id } = await params;

  const guide = GUIDE_DATA.find((guide) => String(guide.id) === id);

  if (!guide) {
    notFound();
  }

  return <Guide guide={guide} />;
}
