"use client"

import { useState } from "react"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Input } from "@/components/ui/input"
import { useMutation } from "@tanstack/react-query"
import { deleteWorkflow } from "../../../../../actions/deleteWorkflow"
import { toast } from "sonner"

interface Props {
    open: boolean
    setOpen: (open: boolean) => void
    workflowName: string
    workflowId: string
}

const DeleteWorkflowDialog = ({ open, setOpen, workflowName, workflowId }: Props) => {
    const [confirmName, setConfirmName] = useState("")

    const deleteMutations = useMutation({
        mutationFn: deleteWorkflow,
        onSuccess: () => {
            toast.success("Workflow deleted successfully", { id: workflowId })
            setConfirmName("")
        },
        onError: () => {
            toast.error("Deletion failed, something went wrong...", { id: workflowId })
        }
    })

    return (
        <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete the workflow and remove all associated data. <br />
                        <span className=" mt-4">
                            If you are sure about this, enter <b>{workflowName}</b> to confirm deletion:
                        </span>
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <Input
                    value={confirmName}
                    onChange={(e) => setConfirmName(e.target.value)}
                    placeholder="Enter workflow name"
                    className="mt-2"
                />
                <AlertDialogFooter>
                    <AlertDialogCancel onClick={() => setConfirmName("")} >Cancel</AlertDialogCancel>
                    <AlertDialogAction
                        disabled={confirmName !== workflowName || deleteMutations.isPending}
                        onClick={() => {
                            toast.loading("Deleting workflow...", { id: workflowId })
                            deleteMutations.mutate(workflowId)
                        }}
                    >
                        Delete
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}

export default DeleteWorkflowDialog

