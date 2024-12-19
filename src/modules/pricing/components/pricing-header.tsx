import React from "react";

const PricingHeader = () => {
  return (
    <div className="z-10 grid justify-items-center gap-4 py-12 md:gap-6 md:py-20">
      <h1 className="text-center text-2xl font-semibold tracking-tight md:text-5xl">
        Planes y precios
      </h1>
      <p className="max-w-md text-center text-base text-main-h dark:text-main-dark-h md:max-w-[850px] md:text-lg">
        Queremos brindarte una experiencia personalizada y ayudarte a alcanzar
        tus objetivos de bienestar, salud y fitness. Por lo que tenemos un plan
        para lograr todos tus objetivos con nuestros beneficios.
      </p>
    </div>
  );
};

export default PricingHeader;
