"use client"

import { Button } from '@/components/ui/button'
import { Layers2Icon } from 'lucide-react'
import { useState } from 'react'
import CustomHeader from './CustomHeader'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { DialogTrigger } from '@radix-ui/react-dialog'
import { useForm } from 'react-hook-form'
import { createWorkflowSchema } from '@/schema/workflowSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from "zod";  // ✅ Import Zod

const CreateWorkflow = ({ triggerText }: { triggerText?: string }) => {
    const [open, setOpen] = useState(false);

    const form = useForm<z.infer<typeof createWorkflowSchema>>({
        resolver: zodResolver(createWorkflowSchema),
        defaultValues: {
            name: "",  // ✅ Add initial value if required
        },
    });

    const onSubmit = (data: z.infer<typeof createWorkflowSchema>) => {
        console.log("Form Data:", data);
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button>
                    {triggerText ?? "Create workflow"}
                </Button>
            </DialogTrigger>
            <DialogContent className='px-0'>
                <CustomHeader
                    icon={Layers2Icon}
                    title="Create workflow"
                    subTitle="Start building your workflow"
                />
                <div className='p-6'>
                    <form onSubmit={form.handleSubmit(onSubmit)}>  {/* ✅ Use form.handleSubmit */}
                        <div>
                            <label htmlFor="name">Name</label>
                            <input
                                type="text"
                                {...form.register("name")}  // ✅ Register input field
                                className="border border-neutral-700 p-2 w-full rounded-md text-sm ring-1 ring-rose-400 outline-rose-300"
                            />
                        </div>
                        <Button type="submit" className="mt-4">Submit</Button>
                    </form>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default CreateWorkflow
