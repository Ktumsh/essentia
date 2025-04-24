import EmergencySteps from "./emergency-steps";
import FirstAid from "./firts-aid";
import Phones from "./phones";
import SexualityEmergencyCard from "./sexuality-emergency-card";

const Emergencies = () => {
  return (
    <>
      <article className="text-foreground/80 flex flex-col">
        <EmergencySteps />
        <Phones />
        <FirstAid />
        <SexualityEmergencyCard />
      </article>
    </>
  );
};

export default Emergencies;
