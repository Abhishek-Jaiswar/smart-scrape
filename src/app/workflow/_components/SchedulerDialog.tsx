'use client'

import { Button } from '@/components/ui/button'
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import { useMutation } from '@tanstack/react-query'
import { Calendar1Icon, ClockIcon, TriangleAlertIcon } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { UpdateWorkflowCron } from '../../../../actions/updateWorkflowCron'
import { toast } from 'sonner'
import cronstrue from 'cronstrue'
import parser from 'cron-parser'
import { RemoveWorkflowSchedule } from '../../../../actions/removeWorkflowSchedule'

const SchedulerDialog = (props: { workflowId: string, cron: string | null }) => {
    const [cron, setCron] = useState(props.cron || "")
    const [validCron, setValidCron] = useState(false)
    const [readableCron, setReadableCron] = useState("")


    const mutation = useMutation({
        mutationFn: UpdateWorkflowCron,
        onSuccess: () => {
            toast.success("Schedule updated successfully", { id: "cron" })
        },
        onError: () => {
            toast.error("Something went wrong", { id: "cron" })

        }
    })

    const removeScheduleMutation = useMutation({
        mutationFn: RemoveWorkflowSchedule,
        onSuccess: () => {
            toast.success("Schedule updated successfully", { id: "cron" })
        },
        onError: () => {
            toast.error("Something went wrong", { id: "cron" })

        }
    })

    useEffect(() => {
        try {
            parser.parseExpression(cron);
            const humanCronString = cronstrue.toString(cron)
            setValidCron(true)
            setReadableCron(humanCronString)
        } catch (error) {
            setValidCron(false)
        }
    }, [cron])

    const workflowHasValidCron = props.cron && props.cron.length > 0;
    const readableSavedCron = workflowHasValidCron && cronstrue.toString(props.cron!)

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant={"link"} size={'sm'} className={cn("text-sm p-0 h-auto text-orange-500", workflowHasValidCron && "text-green-400")}>

                    {workflowHasValidCron && (
                        <div className='flex items-center gap-2'>
                            <ClockIcon />
                            {readableSavedCron}
                        </div>
                    )}
                    {!workflowHasValidCron && (
                        <div className='flex items-center gap-1'>
                            <TriangleAlertIcon className='h-3 w-3 mr-1' />
                            Set schedule
                        </div>
                    )}
                </Button>
            </DialogTrigger>
            <DialogContent aria-describedby={undefined} className='px-0'>
                <DialogHeader className='flex items-center gap-2'>
                    <DialogTitle className=' text-2xl font-bold text-primary'>Schedule workflow execution</DialogTitle>
                    <Calendar1Icon className='text-2xl text-primary' />
                </DialogHeader>
                <div className='p-6 space-y-4'>
                    <p className='text-muted-foreground text-sm'>Specify a cron expression to schedule periodic workflow execution</p>
                    <Input
                        value={cron}
                        onChange={(e) => setCron(e.target.value)}
                        placeholder='E.g. * * * * *' />
                    <div className={cn(" bg-accent rounded-md p-4 border text-sm border-destructive text-destructive",
                        validCron && "border-green-400 text-green-500"

                    )}>
                        {validCron ? readableCron : "Not a valid cron expression"}
                    </div>
                    {workflowHasValidCron && <DialogClose asChild>
                        <div className=''>
                            <Button
                                className='w-full text-destructive border-destructive hover:text-destructive'
                                variant={"outline"}
                                disabled={
                                    mutation.isPending || removeScheduleMutation.isPending
                                }
                                onClick={() => {
                                    toast.loading("Removing schedule...", { id: "cron" })

                                    removeScheduleMutation.mutate(props.workflowId)
                                }}
                            >
                                Remove current schedule
                            </Button>

                        </div>
                    </DialogClose>}
                </div>
                <DialogFooter className='px-6 gap-2'>
                    <DialogClose asChild>
                        <Button
                            className='w-full'
                            variant="secondary">
                            Cancel
                        </Button>
                    </DialogClose>
                    <DialogClose>
                        <Button
                            disabled={mutation.isPending || !validCron}
                            onClick={() => {
                                toast.loading("Saving...", { id: "cron" })
                                mutation.mutate({
                                    id: props.workflowId,
                                    cron
                                })
                            }}
                            className='w-full'>
                            Save
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default SchedulerDialog