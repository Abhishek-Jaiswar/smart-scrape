"use server";

import { PackageId } from "@/types/billing";
import { auth } from "@clerk/nextjs/server";

export const PurchaseCredits = async (packageId: PackageId) => {
  const { userId } = await auth();
  if (!userId) {
    throw new Error("Unauthenticated");
  }

  console.log("@@Package", packageId);
  

};
