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
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Input } from "@/components/ui/input"
import { useMutation } from "@tanstack/react-query"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { XIcon } from "lucide-react"
import { DeleteCredentials } from "../../../../../actions/DeleteCredentials"

interface Props {
    name: string
}

const DeleteCredentialsDialog = ({ name }: Props) => {
    const [confirmName, setConfirmName] = useState("")
    const [open, setOpen] = useState(false)

    const deleteMutations = useMutation({
        mutationFn: DeleteCredentials,
        onSuccess: () => {
            toast.success("Credential deleted successfully", { id: name })
            setConfirmName("")
        },
        onError: () => {
            toast.error("Deletion failed, something went wrong...", { id: name })
        }
    })

    return (
        <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogTrigger asChild>
                <Button variant={"destructive"} size={"icon"}>
                    <XIcon size={18} />
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete the credential and remove all associated data. <br className="py-5" />
                    </AlertDialogDescription>
                    <AlertDialogDescription>
                        If you are sure about this, enter <span className="text-neutral-800 font-bold">{name}</span> to confirm deletion:
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
                        disabled={confirmName !== name || deleteMutations.isPending}
                        onClick={() => {
                            toast.loading("Credential workflow...", { id: name })
                            deleteMutations.mutate(name)
                        }}
                    >
                        Delete
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}

export default DeleteCredentialsDialog

