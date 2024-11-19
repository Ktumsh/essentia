import dynamic from "next/dynamic";

import EmergencySteps from "./emergency-steps";
import Phones from "./phones";

const FirstAid = dynamic(() => import("./firts-aid"), {
  ssr: false,
});

const SexualityEmergencyCard = dynamic(
  () => import("./sexuality-emergency-card"),
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
      <article className="flex flex-col text-main-h dark:text-main-dark">
        <EmergencySteps />
        <Phones />
        <div className="flex flex-col md:flex-row md:gap-2">
          <FirstAid />
          <SexualityEmergencyCard />
        </div>
        <Medicines />
      </article>
    </>
  );
};

export default Emergencies;
