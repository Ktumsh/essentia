import { auth } from "@/app/(auth)/auth";
import { getPaymentDetails, getSubscription } from "@/db/querys/payment-querys";
import PaymentCallbackContent from "@/modules/payment/components/payment-callback-content";

const CancelPage = async () => {
  const session = await auth();
  const userId = session?.user?.id as string;
  const [paymentDetail] = await getPaymentDetails(userId);
  const [subscription] = await getSubscription(userId);
  return (
    <PaymentCallbackContent
      title="Compra cancelada"
      paymentDetails={paymentDetail}
      renewalDate={subscription.expiresAt}
    />
  );
};

export default CancelPage;