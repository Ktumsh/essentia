const TailwindIndicator = () => {
  if (process.env.NODE_ENV === "production") return null;

  return (
    <div className="pointer-events-none fixed bottom-1 right-1 z-50 flex size-6 select-none items-center justify-center rounded-full bg-black/30 p-3 font-sans text-xs text-white dark:bg-white/30">
      <div className="block sm:hidden">xs</div>
      <div className="hidden sm:block md:hidden">sm</div>
      <div className="hidden md:block lg:hidden">md</div>
      <div className="hidden lg:block xl:hidden">lg</div>
      <div className="hidden xl:block 2xl:hidden">xl</div>
      <div className="hidden 2xl:block">2xl</div>
    </div>
  );
};

export default TailwindIndicator;
