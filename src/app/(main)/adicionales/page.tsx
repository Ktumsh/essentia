import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Recursos Adicionales",
  alternates: {
    canonical: "/adicionales",
  },
};

const AdditionalsPage = () => {
  return redirect("/adicionales/guias");
};

export default AdditionalsPage;
