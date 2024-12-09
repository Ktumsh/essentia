import { auth } from "@/app/(auth)/auth";
import { getPaymentDetails, getSubscription } from "@/db/querys/payment-querys";
import PaymentCallbackContent from "@/modules/payment/components/payment-callback-content";

const SuccessPage = async () => {
  const session = await auth();
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
