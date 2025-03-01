"use server";

import { getAppUrl } from "@/lib/helper/appUrl";
import { stripe } from "@/lib/stripe/stripe";
import { getCreditsPackage, PackageId } from "@/types/billing";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export const PurchaseCredits = async (packageId: PackageId) => {
  const { userId } = await auth();
  if (!userId) {
    throw new Error("Unauthenticated");
  }

  console.log("@@Package", packageId);

  const selectedPackage = getCreditsPackage(packageId);
  if (!selectedPackage) {
    throw new Error("Invalid package");
  }

  const priceId = selectedPackage?.priceId;

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    invoice_creation: {
      enabled: true,
    },
    success_url: getAppUrl("/dashboard/billing"),
    cancel_url: getAppUrl("/dashboard/billing"),
    metadata: {
      userId,
      packageId,
    },
    line_items: [
      {
        quantity: 1,
        price: selectedPackage.priceId,
      },
    ],
  });

  if (!session.url) {
    throw new Error("Cannot create stripe session");
  }

  redirect(session.url);
};
