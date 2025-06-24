import { redirect } from "next/navigation";

import { auth } from "@/app/(auth)/auth";
import PaymentContent from "@/app/payment/_components/payment-content";
import { getPaymentDetails, getSubscription } from "@/db/querys/payment-querys";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Compra exitosa",
  alternates: {
    canonical: "/payment/success",
  },
};

const SuccessPage = async () => {
  const session = await auth();

  const userId = session?.user?.id;

  if (!userId) return redirect("/");

  const [paymentDetail] = userId ? await getPaymentDetails(userId) : [];
  const [subscription] = userId ? await getSubscription(userId) : [];
  return (
    <PaymentContent
      title="¡Gracias por tu compra!"
      message="Ahora puedes comenzar a disfrutar de las funcionalidades premium."
      paymentDetails={paymentDetail}
      renewalDate={subscription.expiresAt}
    />
  );
};

export default SuccessPage;
