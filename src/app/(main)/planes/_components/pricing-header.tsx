const PricingHeader = () => {
  return (
    <div className="z-10 mx-auto grid max-w-xl justify-items-center gap-4 py-12 md:gap-6 md:py-20">
      <h1 className="font-merriweather text-center text-2xl font-semibold tracking-tight md:text-4xl">
        Planes y precios
      </h1>
      <p className="text-foreground/80 text-center text-sm md:text-base">
        En Essentia, creemos que la salud debería estar al alcance de todos.
      </p>
      <p className="text-foreground/80 text-center text-sm md:text-base">
        Por eso, te ofrecemos planes flexibles que se adaptan a tus necesidades,
        desde herramientas básicas hasta una experiencia completa con
        inteligencia artificial y personalización total.
      </p>
    </div>
  );
};

export default PricingHeader;
