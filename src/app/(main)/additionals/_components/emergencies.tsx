import EmergencySteps from "./emergency-steps";
import FirstAid from "./firts-aid";
import Medicines from "./medicines";
import Phones from "./phones";
import SexualityEmergencyCard from "./sexuality-emergency-card";

const Emergencies = () => {
  return (
    <>
      <article className="text-foreground/80 flex flex-col">
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
