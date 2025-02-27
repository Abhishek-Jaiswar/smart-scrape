"use client"

import { useCallback, useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Loader2, ShieldEllipsis } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { useMutation } from "@tanstack/react-query"
import { toast } from "sonner"
import { createCredentialsSchema, createCredentialsSchemaType } from "@/schema/credentails"
import { CreateCredential } from "../../../../../actions/credentials/createCredential"
import CustomHeader from "../../workflows/_components/CustomHeader"

const CreateCredentialsDialog = ({ triggerText }: { triggerText?: string }) => {
    const [open, setOpen] = useState(false)

    const form = useForm<createCredentialsSchemaType>({
        resolver: zodResolver(createCredentialsSchema),
        defaultValues: { name: "", value: "" }
    })

    const { mutate, isPending } = useMutation({
        mutationFn: CreateCredential,
        onSuccess: () => {
            toast.success("Credential created successfully!", { id: "create-credential" })
            form.reset()
            setOpen(false)
        },
        onError: () => {
            toast.error("Failed to create credential", { id: "create-credential" })
        },
    })

    const onSubmit = useCallback(
        (values: createCredentialsSchemaType) => {
            toast.loading("Creating credentials...", { id: "create-credential" })
            mutate(values)
        },
        [mutate]
    )

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="default">{triggerText ?? "Create Credential"}</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <CustomHeader icon={ShieldEllipsis} title="Create Credential" />
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
                                        <Input placeholder="Enter credential name" {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        Provide a unique name for your credentials to easily identify them later.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="value"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>
                                        Value <span className="text-red-500">*</span>
                                    </FormLabel>
                                    <FormControl>
                                        <Textarea placeholder="Enter credential value" className="resize-none" {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        Enter the sensitive information associated with this credential (e.g., password, API token).
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit" className="w-full" disabled={isPending}>
                            {isPending ? <Loader2 className="animate-spin" /> : "Proceed"}
                        </Button>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}

export default CreateCredentialsDialog
