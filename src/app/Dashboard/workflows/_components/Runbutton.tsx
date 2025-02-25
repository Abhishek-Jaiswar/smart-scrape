'use client'

import { useMutation } from '@tanstack/react-query'
import React from 'react'
import { RunWorkflow } from '../../../../../actions/runWorkflow'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { PlayIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'


const Runbutton = ({ workflowId }: { workflowId: string }) => {
    const router = useRouter()
    const mutation = useMutation({
        mutationFn: RunWorkflow!,
        onSuccess: (executionId) => {
            toast.success("Workflow started", { id: workflowId });
            router.push(`/workflow/runs/${workflowId}/${executionId}`)
        },
        onError: () => {
            toast.error("Something went wrong", { id: workflowId });
        }
    })
    return (
        <Button
            className='flex items-center gap-2'
            variant={"outline"}
            size={'sm'}
            disabled={mutation.isPending}
            onClick={() => {
                toast.loading("Scheduling run...", { id: workflowId })
                mutation.mutate({
                    workflowId,
                })
            }}
        >
            <PlayIcon size={16} />
            Run
        </Button>
    )
}

export default Runbutton