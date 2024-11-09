import dynamic from "next/dynamic";

import EmergencySteps from "./emergency-steps";
import Phones from "./phones";

const FirstAid = dynamic(() => import("./firts-aid"), {
  ssr: false,
});

const SexualityEmergencyCard = dynamic(
  () => import("./sexuality-emegergency-card"),
  {
    ssr: false,
  },
);

const Medicines = dynamic(() => import("./medicines"), {
  ssr: false,
});

const Emergencies = () => {
  return (
    <>
      <article className="flex flex-col pb-5 text-main-h dark:text-main-dark md:p-0">
        <EmergencySteps />
        <Phones />
        <div className="flex flex-col gap-2 md:flex-row">
          <FirstAid />
          <SexualityEmergencyCard />
        </div>
        <Medicines />
      </article>
    </>
  );
};

export default Emergencies;
