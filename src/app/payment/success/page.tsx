import { Metadata } from "next";
import { redirect } from "next/navigation";

import { auth } from "@/app/(auth)/auth";
import PaymentCallbackContent from "@/components/ui/payment/payment-callback-content";
import { getPaymentDetails, getSubscription } from "@/db/querys/payment-querys";

export const metadata: Metadata = {
  title: "Compra exitosa",
  alternates: {
    canonical: "/payment/success",
  },
};

const SuccessPage = async () => {
  const session = await auth();
  if (!session) return redirect("/");

  const userId = session?.user?.id as string;

  const [paymentDetail] = await getPaymentDetails(userId);
  const [subscription] = await getSubscription(userId);
  return (
    <PaymentCallbackContent
      title="¡Gracias por tu compra!"
      message="Ahora puedes comenzar a disfrutar de nuestras funciones premium."
      paymentDetails={paymentDetail}
      renewalDate={subscription.expiresAt}
    />
  );
};

export default SuccessPage;
