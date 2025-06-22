import FunFactCard from "./fun-fact-card";

const MobileDailyTip = () => {
  return (
    <section className="w-full md:hidden">
      <h2 className="font-merriweather mb-2 ml-3 px-8 text-xl font-semibold tracking-tight normal-case">
        Dato curioso del día
      </h2>
      <section className="flex w-full flex-col px-6">
        <FunFactCard />
      </section>
    </section>
  );
};

export default MobileDailyTip;
