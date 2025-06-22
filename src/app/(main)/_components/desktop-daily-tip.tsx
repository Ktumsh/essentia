import FunFactCard from "./fun-fact-card";

const DesktopDailyTip = () => {
  return (
    <div className="flex w-full flex-col">
      <h3 className="text-foreground mb-2 ml-3 px-5 text-base font-semibold lg:px-0 @7xl:pt-3">
        Dato curioso del día
      </h3>
      <article className="flex h-full flex-col">
        <FunFactCard />
      </article>
    </div>
  );
};

export default DesktopDailyTip;
