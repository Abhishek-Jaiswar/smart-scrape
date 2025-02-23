'use client'

import useExecutionPlan from "@/components/hooks/useExecutionPlan"
import { Button } from "@/components/ui/button"
import { useMutation } from "@tanstack/react-query"
import { Loader2Icon, UploadIcon } from "lucide-react"
import { toast } from "sonner"
import { useReactFlow } from "@xyflow/react"
import { PublishWorkflow } from "../../../../../actions/publishWorkflow"

const PublishButton = ({ workflowId }: { workflowId: string }) => {
    const generate = useExecutionPlan()
    const { toObject } = useReactFlow()

    const mutation = useMutation({
        mutationFn: PublishWorkflow,
        onSuccess: (executionId) => {
            toast.success("Workflow published", { id: workflowId })
        },
        onError: () => {
            toast.error("Something went wrong", { id: workflowId })
        },
    })

    return (
        <Button
            variant={'outline'}
            className="flex items-center gap-3"
            disabled={mutation.isPending}
            onClick={() => {
                const plan = generate();
                if (!plan) {
                    // client side validation
                    return;
                }

                const flowDefinition = JSON.stringify(toObject());
                // console.log("@FLOW_DEFINITION: ", flowDefinition);

                toast.loading("Publishing workflow...", { id: workflowId })
                mutation.mutate({
                    id: workflowId,
                    flowDefinition: flowDefinition
                })
            }}
        >

            {mutation.isPending ? (
                <span className="flex items-center gap-1">
                    <Loader2Icon className="animate-spin" />
                    Publishing...
                </span>
            ) : (
                <span className="flex items-center gap-1">
                    <UploadIcon size={16} className="stroke-green-500" />
                    Publish
                </span>
            )}
        </Button>
    )
}

export default PublishButton