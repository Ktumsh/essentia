"use client";

import { usePathname } from "next/navigation";

const AdditionalsHeader = () => {
  const pathname = usePathname();

  const isGuidePage = pathname.includes("/herramientas/guias/");

  if (isGuidePage) return null;

  return (
    <div className="mx-auto max-w-7xl">
      <h1 className="font-merriweather py-4 text-2xl leading-none font-semibold sm:text-3xl md:pt-11 dark:text-white">
        Herramientas de Apoyo
      </h1>
    </div>
  );
};

export default AdditionalsHeader;
