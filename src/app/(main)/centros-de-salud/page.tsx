import { Metadata } from "next";

import Centers from "@/modules/health-centers/components/centers";

export const metadata: Metadata = {
  title: "Centros de salud",
};

const HealthCentersPage = () => {
  return <Centers />;
};

export default HealthCentersPage;
