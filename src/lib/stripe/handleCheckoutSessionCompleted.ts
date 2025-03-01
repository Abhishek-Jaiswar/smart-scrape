import "server-only";
import { writeFile } from "fs";
import Stripe from "stripe";
import { getCreditsPackage, PackageId } from "@/types/billing";
import prisma from "../prisma";

export const HandleCheckoutSessionCompleted = async (
  event: Stripe.Checkout.Session
) => {
  if (!event.metadata) {
    throw new Error("Missing metadata");
  }
  const { userId, packageId } = event.metadata;
  if (!userId) {
    throw new Error("Missing user id");
  }

  if (!packageId) {
    throw new Error("Missing user id");
  }

  const purchasedPackage = getCreditsPackage(packageId as PackageId);
  if (!purchasedPackage) {
    throw new Error("Purchased pack not found");
  }

  await prisma.userBalance.upsert({
    where: {
      userId,
    },
    create: {
      userId,
      credits: purchasedPackage.credits,
    },
    update: {
      credits: {
        increment: purchasedPackage.credits,
      },
    },
  });

  await prisma.userPurchase.create({
    data: {
      userId,
      stripeId: event.id,
      description: `${purchasedPackage.name} - ${purchasedPackage.credits} credits`,
      amount: event.amount_total!,
      currency: event.currency!,
    },
  });
};
