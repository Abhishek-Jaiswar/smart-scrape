"use server";

import prisma from "@/lib/prisma";
import { ExecuteWorkflow } from "@/lib/workflow/executeWorkflow";
import { FlowToExecutionPlan } from "@/lib/workflow/executionPlan";
import { TaskRegistry } from "@/lib/workflow/task/registry";
import {
  ExecutionPhaseStatus,
  WorkflowExecutionPlan,
  WorkflowExecutionStatus,
  WorkflowExecutionTrigger,
  WorkflowStatus,
} from "@/types/workflow";
import { auth } from "@clerk/nextjs/server";

export const RunWorkflow = async (form: {
  workflowId: string;
  flowDefinition?: string;
}) => {
  const { userId } = await auth();
  if (!userId) {
    throw new Error("Unauthenticated");
  }

  const { workflowId, flowDefinition } = form;
  if (!workflowId) {
    throw new Error("Workflow id not found");
  }

  const workflow = await prisma.workflow.findUnique({
    where: {
      userId,
      id: workflowId,
    },
  });

  if (!workflow) {
    throw new Error("Workflow not found");
  }

  let executionPlan: WorkflowExecutionPlan;
  if (workflow.status === WorkflowStatus.PUBLISHED) {
    if (!workflow.excutionPlan) {
      throw new Error("No execution plan found in published workflow");
    }
    executionPlan = JSON.parse(workflow.excutionPlan);
  } else {
    // workflow is draft
    if (!flowDefinition) {
      throw new Error("Flow definition is not defined");
    }

    const flow = JSON.parse(flowDefinition);
    const result = FlowToExecutionPlan(flow.nodes, flow.edges);
    if (result.error) {
      throw new Error("Flow definition is not valid");
    }

    if (!result.executionPlan) {
      throw new Error("No execution plan generated");
    }

    executionPlan = result.executionPlan;
    // console.log("@EXECUTION_PLAN: ", executionPlan);
  }

  const execution = await prisma.workflowExecution.create({
    data: {
      workflowId,
      userId,
      status: WorkflowExecutionStatus.PENDING,
      startedAt: new Date(),
      trigger: WorkflowExecutionTrigger.MANUAL,
      definition: flowDefinition,
      phases: {
        create: executionPlan.flatMap((phase) => {
          return phase.nodes.flatMap((node) => {
            return {
              userId,
              status: ExecutionPhaseStatus.CREATED,
              number: phase.phase,
              node: JSON.stringify(node),
              name: TaskRegistry[node.data.type].label,
            };
          });
        }),
      },
    },

    select: {
      id: true,
      phases: true,
    },
  });

  if (!execution) {
    throw new Error("Workflow execution not created");
  }

  ExecuteWorkflow(execution.id);

  return execution.id;
};
