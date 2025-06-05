"use client";

import { usePathname } from "next/navigation";

import PageTitle from "@/components/layout/page-title";

const AdditionalsHeader = () => {
  const pathname = usePathname();

  const isGuidePage = pathname.includes("/herramientas/guias/");

  if (isGuidePage) return null;

  return <PageTitle>Herramientas de Apoyo</PageTitle>;
};

export default AdditionalsHeader;
