import { HandleCheckoutSessionCompleted } from "@/lib/stripe/handleCheckoutSessionCompleted";
import { stripe } from "@/lib/stripe/stripe";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  const body = await req.text();
  const signature = req.headers.get("stripe-signature") as string;

  try {
    const event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );

    switch (event.type) {
      case "checkout.session.completed":
        await HandleCheckoutSessionCompleted(event.data.object); // ✅ Await function
        break;
      default:
        console.log(`Unhandled event type: ${event.type}`);
        break;
    }

    return new NextResponse(null, { status: 200 });
  } catch (error) {
    console.error("Stripe webhook error:", error);
    return new NextResponse("Webhook error", { status: 400 });
  }
};
