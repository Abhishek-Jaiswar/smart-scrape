'use client'

import useExecutionPlan from "@/components/hooks/useExecutionPlan"
import { Button } from "@/components/ui/button"
import { useMutation } from "@tanstack/react-query"
import { Loader2Icon, PlayIcon } from "lucide-react"
import { RunWorkflow } from "../../../../../actions/runWorkflow"
import { toast } from "sonner"
import { useReactFlow } from "@xyflow/react"
import { useRouter } from "next/navigation"

const ExecuteButton = ({ workflowId }: { workflowId: string }) => {
    const generate = useExecutionPlan()
    const { toObject } = useReactFlow()

    const router = useRouter()

    const mutation = useMutation({
        mutationFn: RunWorkflow,
        onSuccess: (executionId) => {
            toast.success("Execution started", { id: 'flow-execution' })
            router.push(`/workflow/runs/${workflowId}/${executionId}`)
        },
        onError: (error) => {
            toast.error("Something went wrong", { id: 'flow-execution' })
        },
    })

    return (
        <Button
            variant={'outline'}
            className="flex items-center gap-2"
            disabled={mutation.isPending}
            onClick={() => {
                const plan = generate();
                if (!plan) {
                    // client side validation
                    return;
                }

                const flowDefinition = JSON.stringify(toObject());
                // console.log("@FLOW_DEFINITION: ", flowDefinition);

                mutation.mutate({
                    workflowId: workflowId,
                    flowDefinition: flowDefinition
                })
            }}
        >

            {mutation.isPending ? (
                <span className="flex items-center gap-1">
                    <Loader2Icon className="animate-spin" />
                    Executing...
                </span>
            ) : (
                <span className="flex items-center gap-1">
                    <PlayIcon size={16} className="stroke-rose-500" />
                    Execute
                </span>
            )}
        </Button>
    )
}

export default ExecuteButton