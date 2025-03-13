const PricingHeader = () => {
  return (
    <div className="z-10 mx-auto grid max-w-lg justify-items-center gap-4 py-12 md:gap-6 md:py-20">
      <h1 className="font-merriweather text-center text-2xl font-semibold tracking-tight md:text-4xl">
        Planes y precios
      </h1>
      <p className="text-foreground/80 text-center text-sm md:max-w-[850px] md:text-base">
        Queremos brindarte una experiencia personalizada y ayudarte a alcanzar
        tus objetivos de bienestar, salud y fitness.
      </p>
      <p className="text-foreground/80 text-center text-sm md:max-w-[850px] md:text-base">
        Por lo que tenemos un plan para lograr todos tus objetivos con nuestros
        beneficios.
      </p>
    </div>
  );
};

export default PricingHeader;
