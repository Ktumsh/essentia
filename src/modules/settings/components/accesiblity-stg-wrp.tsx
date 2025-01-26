"use client";

import { useIsMobile } from "@/components/hooks/use-mobile";

import AccesibilityStg from "./accesibility-stg";

const AccesibilityStgWrp = () => {
  const isMobile = useIsMobile();

  if (!isMobile) return null;

  return <AccesibilityStg isMobile={isMobile} />;
};

export default AccesibilityStgWrp;
