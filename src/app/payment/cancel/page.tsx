import { Metadata } from "next";

import PaymentCallbackContent from "@/app/payment/_components/payment-callback-content";

export const metadata: Metadata = {
  title: "Compra cancelada",
  alternates: {
    canonical: "/payment/cancel",
  },
};

const CancelPage = async () => {
  return <PaymentCallbackContent title="Compra cancelada" />;
};

export default CancelPage;
