import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { session_id } = body;

    if (!session_id) {
      return NextResponse.json(
        { success: false, error: "Session ID es requerido" },
        { status: 400 },
      );
    }

    const session = await stripe.checkout.sessions.retrieve(session_id);

    const success = session.payment_status === "paid";

    return NextResponse.json({ success });
  } catch (error) {
    console.error("Error al verificar el pago:", error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
