"use server";

import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import parser from "cron-parser";
import { revalidatePath } from "next/cache";

export const UpdateWorkflowCron = async ({
  id,
  cron,
}: {
  id: string;
  cron: string;
}) => {
  const { userId } = await auth();
  if (!userId) {
    throw new Error("Unauthenticated");
  }

  try {
    const interval = parser.parseExpression(cron, { utc: true });
    await prisma.workflow.update({
      where: {
        id,
        userId,
      },
      data: {
        cron,
        nextRunAt: interval.next().toDate(),
      },
    });
  } catch (error: any) {
    console.log("Invalid cron: ", error.message);
    throw new Error("Invalid expression");
  }

  revalidatePath("/workflows");
};
