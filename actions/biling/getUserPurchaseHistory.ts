"use server";

import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

export const GetUserPurchaseHistory = async () => {
  const { userId } = await auth();
  if (!userId) {
    throw new Error("Unauthenticated");
  }

  return prisma.userPurchase.findMany({
    where: {
      userId,
    },
    orderBy: {
      date: "desc",
    },
  });
};
