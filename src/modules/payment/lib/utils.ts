import { format, parse } from "date-fns";
import { es } from "date-fns/locale";

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

interface VerifyPaymentIntentResponse {
  success: boolean;
  amount?: number;
  currency?: string;
  userId?: string;
  error?: string;
}

export async function verifyPaymentIntent(
  paymentIntentId: string
): Promise<VerifyPaymentIntentResponse> {
  try {
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

    if (paymentIntent.status === "succeeded") {
      const amount = paymentIntent.amount;
      const currency = paymentIntent.currency;
      const userId = paymentIntent.metadata.userId as string;

      if (!userId) {
        return { success: false, error: "userId no encontrado en metadata." };
      }

      return { success: true, amount, currency, userId };
    } else {
      return { success: false, error: "Pago no completado." };
    }
  } catch (error: any) {
    console.error("Error al verificar PaymentIntent:", error);
    return { success: false, error: error.message };
  }
}

export function formatDate(
  dateInput: string | Date | null | undefined,
  dateFormat: string = "dd MMMM yyyy"
): string | null {
  if (!dateInput) return null;

  const date =
    typeof dateInput === "string"
      ? parse(dateInput, "dd-MM-yyyy", new Date())
      : dateInput;

  if (isNaN(date.getTime())) {
    console.error("Fecha inválida:", dateInput);
    return null;
  }

  return format(date, dateFormat, { locale: es });
}
