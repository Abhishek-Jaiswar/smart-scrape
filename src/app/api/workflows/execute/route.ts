import prisma from "@/lib/prisma";
import { ExecuteWorkflow } from "@/lib/workflow/executeWorkflow";
import { TaskRegistry } from "@/lib/workflow/task/registry";
import {
  ExecutionPhaseStatus,
  WorkflowExecutionPlan,
  WorkflowExecutionStatus,
  WorkflowExecutionTrigger,
} from "@/types/workflow";
import { timingSafeEqual } from "crypto";
import parser from "cron-parser";

function isvalidSecret(secret: string) {
  const API_SECRET = process.env.API_SECRET;
  if (!API_SECRET || !secret) {
    return false;
  }

  const bufferSecret = Buffer.from(secret);
  const bufferAPISecret = Buffer.from(API_SECRET);

  if (bufferSecret.length !== bufferAPISecret.length) {
    return false;
  }

  return timingSafeEqual(bufferSecret, bufferAPISecret);
}

export const GET = async (request: Request) => {
  const authHeader = request.headers.get("authorization");

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const secret = authHeader.split(" ")[1];
  if (!isvalidSecret(secret)) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const workflowId = searchParams.get("workflowId") as string;

  if (!workflowId) {
    return Response.json({ error: "Bad request" }, { status: 400 });
  }

  const workflow = await prisma.workflow.findUnique({
    where: {
      id: workflowId,
    },
  });

  if (!workflow) {
    return Response.json({ error: "Bad request" }, { status: 400 });
  }

  const executionPlan = JSON.parse(
    workflow.excutionPlan!
  ) as WorkflowExecutionPlan;

  if (!executionPlan) {
    return Response.json({ error: "Bad request" }, { status: 400 });
  }

  try {
    const cron = parser.parseExpression(workflow.cron!, { utc: true });
    const nextRun = cron.next().toDate();

    const exection = await prisma.workflowExecution.create({
      data: {
        workflowId,
        userId: workflow.userId,
        definition: workflow.definition,
        status: WorkflowExecutionStatus.PENDING,
        startedAt: new Date(),
        trigger: WorkflowExecutionTrigger.CRON,
        phases: {
          create: executionPlan.flatMap((phase) => {
            return phase.nodes.flatMap((node) => {
              return {
                userId: workflow.userId,
                status: ExecutionPhaseStatus.CREATED,
                number: phase.phase,
                node: JSON.stringify(node),
                name: TaskRegistry[node.data.type].label,
              };
            });
          }),
        },
      },
    });

    await ExecuteWorkflow(exection.id, nextRun);
    return new Response(null, { status: 200 });
  } catch (error) {
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
};
