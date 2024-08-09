import { Metadata } from "next";
import AdditionalsTabs from "@/modules/additionals/components/tabs";

export const metadata: Metadata = {
  title: "Adicionales",
};

const AdditionalsPage = () => {
  return (
    <>
      <main className="flex flex-col min-h-[calc(100dvh-80px)] w-full md:min-w-[768px] max-w-5xl py-5 mt-14 lg:px-5 shrink items-stretch grow">
        <AdditionalsTabs />
      </main>
    </>
  );
};

export default AdditionalsPage;
