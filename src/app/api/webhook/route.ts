import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

import {
  handlePaymentSucceeded,
  handleSubscriptionDeleted,
  handleSubscriptionUpdated,
  handleCustomerDeleted,
} from "@/modules/payment/pay/actions";
import stripe from "@/utils/stripe";

export const runtime = "edge";

/**
 * Maneja los eventos de Stripe Webhook.
 * @param request - Objeto NextRequest
 * @returns NextResponse
 */
export async function POST(request: NextRequest) {
  const sig = request.headers.get("stripe-signature") as string;
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET as string;

  const rawBody = Buffer.from(await request.arrayBuffer());

  let event: Stripe.Event;

  try {
    event = await stripe.webhooks.constructEventAsync(
      rawBody,
      sig,
      webhookSecret,
    );
  } catch (err: any) {
    console.error("Webhook signature verification failed.", err.message);
    return new NextResponse(`Webhook Error: ${err.message}`, { status: 400 });
  }

  switch (event.type) {
    case "invoice.payment_succeeded":
      const invoice = event.data.object as Stripe.Invoice;
      await handlePaymentSucceeded(invoice);
      break;
    case "customer.subscription.updated":
      const updatedSubscription = event.data.object as Stripe.Subscription;
      await handleSubscriptionUpdated(updatedSubscription);
      break;
    case "customer.subscription.deleted":
      const subscription = event.data.object as Stripe.Subscription;
      await handleSubscriptionDeleted(subscription);
      break;
    case "customer.deleted":
      const customer = event.data.object as Stripe.Customer;
      await handleCustomerDeleted(customer);
      break;
    default:
      console.log(`Evento webhook no manejado ${event.type}`);
  }

  return NextResponse.json({ received: true }, { status: 200 });
}
