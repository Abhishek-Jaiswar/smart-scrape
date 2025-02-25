"use client"

import { useCallback, useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { CopyIcon, Layers2Icon, Loader2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import CustomHeader from "./CustomHeader"
import { duplicateWorkflowSchema, duplicateWorkflowSchemaType } from "@/schema/workflowSchema"
import { useMutation } from "@tanstack/react-query"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { DuplicateWorkflow } from "../../../../../actions/duplicatedWorkflows"
import { cn } from "@/lib/utils"

const DuplicateWorkflowDialog = ({ workflowId }: { workflowId: string }) => {
    const [open, setOpen] = useState(false)
    const router = useRouter()

    const form = useForm<duplicateWorkflowSchemaType>({
        resolver: zodResolver(duplicateWorkflowSchema),
        defaultValues: {
            workflowId
        },
    })

    const { mutate, isPending } = useMutation({
        mutationFn: DuplicateWorkflow,
        onSuccess: (result) => {
            toast.success("Duplicate is created", { id: "duplicate-workflow" });
            setOpen(prev => !prev)
            router.push(`/workflow/editor/${result.id}`)
        },
        onError: () => {
            toast.error("Failed to duplicate workflow", { id: "duplicate-workflow" })
        },
    })

    const onSubmit = useCallback((values: duplicateWorkflowSchemaType) => {
        toast.loading("Duplicating workflow....", { id: 'duplicate-workflow' });
        mutate(values)
    }, [mutate])

    return (
        <Dialog open={open} onOpenChange={(open) => {
            form.reset();
            setOpen(open)
        }}>
            <DialogTrigger asChild>
                <Button
                    variant={"ghost"}
                    size={"icon"}
                    className={cn("ml-2 transition-opacity duration-100 opacity-0 group-hover/card:opacity-100")}
                >
                    <CopyIcon className="cursor-pointer text-muted-foreground" />
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <CustomHeader icon={Layers2Icon} title="Create workflow" subTitle="Duplicate workflow" />
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

export default DuplicateWorkflowDialog

