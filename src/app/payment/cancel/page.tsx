import PaymentContent from "@/app/payment/_components/payment-content";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Compra cancelada",
  alternates: {
    canonical: "/payment/cancel",
  },
};

const CancelPage = async () => {
  return <PaymentContent title="Compra cancelada" />;
};

export default CancelPage;
