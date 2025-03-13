import { Metadata } from "next";

import Centers from "./_components/centers";

export const metadata: Metadata = {
  title: "Centros de salud",
  alternates: {
    canonical: "/centros-de-salud",
  },
};

const HealthCentersPage = () => {
  return <Centers />;
};

export default HealthCentersPage;
