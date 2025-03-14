"use server";

import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export const DeleteCredentials = async (name: string) => {
  const { userId } = await auth();
  if (!userId) {
    throw new Error("Unauthenticated");
  }

  await prisma.credential.delete({
    where: {
      userId_name: {
        userId,
        name,
      },
    },
  });

  revalidatePath("/credentials");
};
