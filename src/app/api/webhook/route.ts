import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

import {
  handlePaymentSucceeded,
  handleSubscriptionDeleted,
  handleSubscriptionUpdated,
  handleCustomerDeleted,
} from "@/modules/payment/pay/actions";
import stripe from "@/utils/stripe";

export const runtime = "nodejs";

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

  const invoice = event.data.object as Stripe.Invoice;
  const subscription = event.data.object as Stripe.Subscription;
  const updatedSubscription = event.data.object as Stripe.Subscription;

  switch (event.type) {
    case "invoice.payment_succeeded":
      await handlePaymentSucceeded(invoice);
      break;
    case "customer.subscription.updated":
      await handleSubscriptionUpdated(updatedSubscription);
      break;
    case "customer.subscription.deleted":
      await handleSubscriptionDeleted(subscription);
      break;
    case "customer.deleted":
      await handleCustomerDeleted(invoice);
      break;
    default:
      console.log(`Evento webhook no manejado ${event.type}`);
  }

  return NextResponse.json({ received: true }, { status: 200 });
}
