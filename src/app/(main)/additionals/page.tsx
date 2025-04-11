import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Adicionales",
  alternates: {
    canonical: "/additionals",
  },
};

const AdditionalsPage = () => {
  return redirect("/additionals/guides");
};

export default AdditionalsPage;
