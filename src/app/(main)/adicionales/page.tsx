import { Metadata } from "next";
import AdditionalsTabs from "@/modules/additionals/components/tabs";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Adicionales",
};

const AdditionalsPage = () => {
  return redirect("/adicionales/guias");
};

export default AdditionalsPage;
