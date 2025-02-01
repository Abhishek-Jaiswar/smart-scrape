"use client"

import { useCallback, useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Layers2Icon, Loader2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import CustomHeader from "./CustomHeader"
import { createWorkflowSchemaType } from "@/schema/workflowSchema"
import { useMutation } from "@tanstack/react-query"
import { CreateWorkflow } from "../../../../../actions/createWorkflow"
import { toast } from "sonner"

const createWorkflowSchema = z.object({
    name: z.string().min(1, "Name is required"),
    description: z.string().max(500).optional(),
})

const CreateWorkflowDialog = ({ triggerText }: { triggerText?: string }) => {
    const [open, setOpen] = useState(false)

    const form = useForm<createWorkflowSchemaType>({
        resolver: zodResolver(createWorkflowSchema),
        defaultValues: {
            name: "",
            description: "",
        },
    })

    const { mutate, isPending } = useMutation({
        mutationFn: CreateWorkflow,
        onSuccess: () => {
            toast.success("Workflow is created", { id: "create-workflow" })
        },
        onError: () => {
            toast.error("Failed to create workflow", { id: "create-workflow" })
        },
    })

    const onSubmit = useCallback((values: createWorkflowSchemaType) => {
        toast.loading("Created your workflow template....", { id: 'create-workflow' });
        mutate(values)
    }, [mutate])

    return (
        <Dialog open={open} onOpenChange={(open) => {
            form.reset();
            setOpen(open)
        }}>
            <DialogTrigger asChild>
                <Button variant="default">{triggerText ?? "Create workflow"}</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <CustomHeader icon={Layers2Icon} title="Create workflow" subTitle="Start building your workflow" />
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>
                                        Name <span className="text-red-500">*</span>
                                    </FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter workflow name" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Description <span className="text-red-500 text-xs">(Optional)</span></FormLabel>
                                    <FormControl>
                                        <Textarea placeholder="Enter workflow description" className="resize-none" {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        Provide a brief description of what your workflow does. <br /> This is optional but can help you remember the workflow&apos;s purpose.
                                    </FormDescription>
                                </FormItem>
                            )}
                        />
                        <Button type="submit" className="w-full" disabled={isPending}>
                            {!isPending && "Proceed"}
                            {isPending && <Loader2 className="animate-spin" />}
                        </Button>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}

export default CreateWorkflowDialog

