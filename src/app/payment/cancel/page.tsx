import PaymentCallbackContent from "@/app/payment/_components/payment-callback-content";

import type { Metadata } from "next";


export const dynamic = "force-static";

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
