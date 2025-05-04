const PricingHeader = () => {
  return (
    <header
      className="bg-linear-to-tr/shorter from-indigo-500 to-purple-500 text-white"
      aria-labelledby="plan-heading"
    >
      <div className="mx-auto flex min-h-60 max-w-7xl items-center justify-center px-4 py-8">
        <div className="mx-auto max-w-2xl text-center">
          <h1
            id="plan-heading"
            className="font-merriweather mb-3 text-3xl font-bold"
          >
            Planes y precios
          </h1>
          <p className="mb-3 text-sm text-indigo-100 md:text-base">
            En Essentia, creemos que la salud debería estar al alcance de todos.
          </p>
          <p className="text-sm text-indigo-100 md:text-base">
            Ofrecemos planes pensados para acompañarte, desde opciones
            esenciales hasta una experiencia completa con inteligencia
            artificial.
          </p>
        </div>
      </div>
    </header>
  );
};

export default PricingHeader;
