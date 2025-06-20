import { Metadata } from "next";

import AccesibilityStgWrp from "./_components/accesiblity-stg-wrp";

export const metadata: Metadata = {
  title: "Configuración / Accesibilidad y pantalla",
  alternates: {
    canonical: "/settings/accesibility",
  },
};

const AccesibilityStgPage = () => {
  return <AccesibilityStgWrp />;
};

export default AccesibilityStgPage;
