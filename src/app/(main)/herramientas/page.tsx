import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Recursos Adicionales",
  alternates: {
    canonical: "/herramientas",
  },
};

const AdditionalsPage = () => {
  return redirect("/herramientas/guias");
};

export default AdditionalsPage;
