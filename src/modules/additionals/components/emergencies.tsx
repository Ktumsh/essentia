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
  }
);

const Medicines = dynamic(() => import("./medicines"), {
  ssr: false,
});

const Emergencies = () => {
  return (
    <>
      <article className="flex flex-col pb-5 md:p-0 mt-12 md:my-0 px-2 text-main-h dark:text-main-dark">
        <EmergencySteps />
        <Phones />
        <div className="flex flex-col md:flex-row gap-2">
          <FirstAid />
          <SexualityEmergencyCard />
        </div>
        <Medicines />
      </article>
    </>
  );
};

export default Emergencies;
