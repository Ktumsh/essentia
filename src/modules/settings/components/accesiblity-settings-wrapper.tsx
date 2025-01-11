"use client";

import { useIsMobile } from "@/components/hooks/use-mobile";

import AccesibilitySettings from "./accesibility-settings";

const AccesibilitySettingsWrapper = () => {
  const isMobile = useIsMobile();

  if (!isMobile) return null;

  return <AccesibilitySettings isMobile={isMobile} />;
};

export default AccesibilitySettingsWrapper;
