import FirstAid from "./firts-aid";
import SexualityEmergencyCard from "./sexuality-emegergency-card";
import Medicines from "./medicines";
import Phones from "./phones";
import EmergencySteps from "./emergency-steps";

const Emergencies = () => {
  return (
    <>
      <article className="flex flex-col pb-5 md:py-0 mt-12 mb-14 md:my-0 px-2 md:px-0 text-base-color-h dark:text-base-color-dark">
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
