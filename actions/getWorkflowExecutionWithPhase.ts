"use server";

import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

export const GetWorkflowExecutionWithPhase = async (executionId: string) => {
  const { userId } = await auth();
  if (!userId) {
    throw new Error("Unauthenticated");
  }

  return prisma.workflowExecution.findUnique({
    where: {
      id: executionId,
      userId,
    },
    include: {
      phases: {
        orderBy: {
          number: "asc",
        },
      },
    },
  });
};
