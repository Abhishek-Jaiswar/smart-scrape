'use client'

import { Button } from "@/components/ui/button"
import { useMutation } from "@tanstack/react-query"
import { Loader2Icon, UploadIcon } from "lucide-react"
import { toast } from "sonner"
import { UnpublishWorkflow } from "../../../../../actions/unpublishWorkflow"

const UnpublishButton = ({ workflowId }: { workflowId: string }) => {

    const mutation = useMutation({
        mutationFn: UnpublishWorkflow,
        onSuccess: () => {
            toast.success("Workflow Unpublished", { id: workflowId })
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
                toast.loading("Unpublishing workflow...", { id: workflowId })
                mutation.mutate(workflowId,)
            }}
        >

            {mutation.isPending ? (
                <span className="flex items-center gap-1">
                    <Loader2Icon className="animate-spin" />
                    Unublishing...
                </span>
            ) : (
                <span className="flex items-center gap-1">
                    <UploadIcon size={16} className="stroke-orange-500" />
                    Unpublish
                </span>
            )}
        </Button>
    )
}

export default UnpublishButton