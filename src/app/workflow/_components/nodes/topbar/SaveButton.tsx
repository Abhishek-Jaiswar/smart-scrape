"use client"

import { Button } from '@/components/ui/button'
import { useMutation } from '@tanstack/react-query'
import { useReactFlow } from '@xyflow/react'
import { CheckIcon } from 'lucide-react'
import React from 'react'
import { updateWorflow } from '../../../../../../actions/updateWorkflow'
import { toast } from 'sonner'

const SaveButton = ({ workflowId }: { workflowId: string }) => {
  const { toObject } = useReactFlow();

  const saveMutations = useMutation({
    mutationFn: updateWorflow,
    onSuccess: () => {
      toast.success("Flow saved successfully", { id: "save-workflow" })
    },
    onError: () => {
      toast.error("Something went wrong while saing", { id: "save-workflow" })
    }
  })

  return (
    <Button variant={"outline"}
      disabled={saveMutations.isPending}
      className='flex items-center gap-2'
      onClick={() => {
        const workflowDefinition = JSON.stringify(toObject())
        toast.loading("Saving workflow", { id: "save-workflow" });
        saveMutations.mutate({
          id: workflowId,
          definition: workflowDefinition
        })
      }}
    >
      <CheckIcon size={16} className=' stroke-rose-500' />
      Save
    </Button>
  )
}

export default SaveButton