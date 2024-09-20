import {
  getAccountDetails,
  getPaymentDetails,
  getUserById,
  updatePremiumStatus,
} from "@/db/actions";
import PaymentSuccessContent from "@/modules/payment/components/payment-success-content";
import { formatDate, verifyPaymentIntent } from "@/modules/payment/lib/utils";
import { Session } from "@/types/session";
import { auth } from "@@/auth";

interface PaymentSuccessPageProps {
  searchParams: {
    payment_intent?: string;
  };
}

const PaymentSuccessPage = async ({
  searchParams,
}: PaymentSuccessPageProps) => {
  const session = (await auth()) as Session;

  const accountDetails = await getAccountDetails(session.user.id);

  const renewalDate = formatDate(accountDetails.premiumExpiresAt, "dd/MM/yyyy");

  const paymentDate = formatDate(accountDetails.payments[0].date, "dd/MM/yyyy");

  const paymentIntentId = searchParams.payment_intent;

  if (!paymentIntentId) {
    return (
      <PaymentSuccessContent
        title="Error de pago"
        status="No se encontró el ID de pago."
        paymentDetails={null}
      />
    );
  }

  try {
    const paymentData = await verifyPaymentIntent(paymentIntentId);

    if (
      paymentData.success &&
      paymentData.amount &&
      paymentData.currency &&
      paymentData.userId
    ) {
      try {
        await updatePremiumStatus(
          paymentData.userId,
          paymentIntentId,
          paymentData.amount,
          paymentData.currency
        );
        return (
          <PaymentSuccessContent
            title="Pago exitoso"
            status="¡Pago realizado con éxito! Tu cuenta ha sido actualizada a Premium."
            message="¡Gracias por comprar el Premium de Essentia! Ahora tienes acceso a todas nuestras funcionalidades exclusivas."
            paymentDetails={{
              amount: paymentData.amount,
              currency: paymentData.currency,
              paymentDate: paymentDate as string,
            }}
            renewalDate={renewalDate as string}
          />
        );
      } catch (updateError: any) {
        console.error("Error al actualizar el estado premium:", updateError);
        if (updateError.message === "Este pago ya ha sido procesado.") {
          return (
            <PaymentSuccessContent
              title="Pago exitoso"
              status="Este pago ya ha sido procesado anteriormente. Ya tienes un plan Premium."
              message="¡Gracias por tu preferencia! Disfruta de tu membresía Premium."
              paymentDetails={{
                amount: paymentData.amount,
                currency: paymentData.currency,
                paymentDate: paymentDate as string,
              }}
              renewalDate={renewalDate as string}
            />
          );
        } else {
          return (
            <PaymentSuccessContent
              title="Pago fallido"
              status="Hubo un problema al procesar tu pago. Por favor, intenta nuevamente."
              paymentDetails={null}
            />
          );
        }
      }
    } else {
      return (
        <PaymentSuccessContent
          title="Pago fallido"
          status="Hubo un problema al procesar tu pago. Por favor, intenta nuevamente."
          paymentDetails={null}
        />
      );
    }
  } catch (error) {
    console.error("Error al verificar el PaymentIntent:", error);
    return (
      <PaymentSuccessContent
        title="Error desconocido"
        status="Hubo un error inesperado."
        paymentDetails={null}
      />
    );
  }
};

export default PaymentSuccessPage;
