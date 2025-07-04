import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

import {
  handleCustomerDeleted,
  handlePaymentSucceeded,
  handleSubscriptionCreated,
  handleSubscriptionDeleted,
  handleSubscriptionUpdated,
} from "@/app/payment/actions";
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
  const customer = event.data.object as Stripe.Customer;

  switch (event.type) {
    case "customer.subscription.created":
      await handleSubscriptionCreated(subscription);
      console.log("Subscription created:", subscription.id);
      break;
    case "customer.subscription.updated":
      await handleSubscriptionUpdated(subscription);
      console.log("Subscription updated:", subscription.id);
      break;
    case "invoice.payment_succeeded":
      await handlePaymentSucceeded(invoice);
      console.log("Payment succeeded:", invoice.id);
      break;
    case "customer.subscription.deleted":
      await handleSubscriptionDeleted(subscription);
      console.log("Subscription deleted:", subscription.id);
      break;
    case "customer.deleted":
      await handleCustomerDeleted(customer);
      console.log("Customer deleted:", customer.id);
      break;
    default:
      console.log(`Evento webhook no manejado ${event.type}`);
  }

  return NextResponse.json({ received: true }, { status: 200 });
}
