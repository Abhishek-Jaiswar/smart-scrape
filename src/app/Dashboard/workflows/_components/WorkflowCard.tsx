"use client"

import { Button, buttonVariants } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { WorkflowExecutionStatus, WorkflowStatus } from '@/types/workflow'
import { workflow } from '@prisma/client'
import { ChevronRightIcon, ClockIcon, CoinsIcon, CornerDownRightIcon, MoreVerticalIcon, MoveRightIcon, NotepadText, PlayIcon, ShuffleIcon, TrashIcon } from 'lucide-react'
import Link from 'next/link'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import ToolTipWrapper from '@/components/ToolTipWrapper'
import { useState } from 'react'
import DeleteWorkflowDialog from './DeleteWorkflowDialog'
import Runbutton from './Runbutton'
import SchedulerDialog from '@/app/workflow/_components/SchedulerDialog'
import { Badge } from '@/components/ui/badge'
import ExecutionStatusIndicator, { ExecutionStatusLabel } from '@/app/workflow/runs/[workflowId]/_components/ExecutionStatusIndicator'
import { format, formatDistanceToNow } from 'date-fns'
import { formatInTimeZone } from 'date-fns-tz'
import DuplicateWorkflowDialog from './DuplicateWorkflowDialog'

const statusColors = {
    [WorkflowStatus.DRAFT]: "bg-yellow-500 text-yellow-800",
    [WorkflowStatus.PUBLISHED]: "bg-primary"
}

const WorkflowCard = ({ workflow }: { workflow: workflow }) => {
    const isDraft = workflow.status === WorkflowStatus.DRAFT
    return (
        <Card className=' border border-separate shadow-sm rounded-sm overflow-hidden hover:shadow-md dark:shadow-primary/30 group/card'>
            <CardContent className=' p-4 flex items-center justify-between h-[100px]'>
                <div className='flex items-center justify-end'>

                    <div className={cn(' w-10 h-10 rounded-full flex items-center justify-center ', statusColors[workflow.status as WorkflowStatus])}>
                        {isDraft ? (
                            <NotepadText className='h-5 w-5' />
                        ) : (
                            <PlayIcon className='h-5 w-5 text-white' />
                        )}
                    </div>
                    <div className=" px-3 space-y-1">
                        <h1 className='text-base font-bold text-muted-foreground flex items-center'>
                            <ToolTipWrapper content={workflow.description}>

                                <Link href={`/workflow/editor/${workflow.id}`}
                                    className='flex items-center hover:underline'
                                >
                                    {workflow.name}
                                </Link>
                            </ToolTipWrapper>
                            {isDraft && (
                                <span className='ml-2 px-2 py-0.5 text-xs font-medium bg-yellow-100 text-yellow-800 rounded-full border border-yellow-500'>
                                    Draft
                                </span>
                            )}

                            <DuplicateWorkflowDialog workflowId={workflow.id} />
                        </h1>
                        <ScheduleSection
                            isDraft={isDraft}
                            creditsCost={workflow.creditsCost}
                            workflowId={workflow.id}
                            cron={workflow.cron}
                        />
                    </div>
                </div>
                <div className='flex items-center space-x-2 '>
                    {!isDraft && <Runbutton workflowId={workflow.id} />}
                    <Link href={`/workflow/editor/${workflow.id}`}
                        className={cn(buttonVariants({
                            variant: 'outline',
                            size: "sm"
                        }),
                            "flex items-center gap-2"
                        )}
                    >
                        <ShuffleIcon size={16} />
                        Edit
                    </Link>
                    <WorkflowActions
                        workflowId={workflow.id}
                        workflowName={workflow.name}
                    />

                </div>
            </CardContent>
            <LastRunDetails workflow={workflow} />
        </Card>
    )
}


const WorkflowActions = ({
    workflowName,
    workflowId
}: {
    workflowName: string,
    workflowId: string
}) => {
    const [showDeleteDialog, setDeleteDialog] = useState(false)

    return (
        <>
            <DeleteWorkflowDialog
                workflowId={workflowId}
                workflowName={workflowName}
                open={showDeleteDialog}
                setOpen={setDeleteDialog}
            />
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant={"outline"} size={'sm'}>
                        <ToolTipWrapper content={"More actions"}>
                            <div className='flex items-center justify-center w-full h-full'>
                                <MoreVerticalIcon size={18} />
                            </div>
                        </ToolTipWrapper>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align='end'>
                    <DropdownMenuLabel>
                        Actions
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onSelect={() => setDeleteDialog(true)}>
                        <TrashIcon size={16} className="mr-2" />
                        Delete
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    )
}

function ScheduleSection({ isDraft, creditsCost, workflowId, cron }: { isDraft: boolean, creditsCost: number, workflowId: string, cron: string | null }) {
    if (isDraft) return null
    return (
        <div className='flex items-center gap-2'>
            <CornerDownRightIcon className='text-muted-foreground h-4 w-4' />
            <SchedulerDialog workflowId={workflowId} cron={cron} key={`${cron}-${workflowId}`} />
            <MoveRightIcon className='text-muted-foreground h-4 w-4' />
            <ToolTipWrapper content="Credits consumption for full run">
                <div className='flex items-center gap-3'>
                    <Badge variant={"outline"} className='space-x-2 text-muted-foreground rounded-sm'>
                        <CoinsIcon className='h-4 w-4' />
                        <span className='text-sm'>{creditsCost}</span>
                    </Badge>
                </div>
            </ToolTipWrapper>

        </div>
    )
}


const LastRunDetails = ({ workflow }: { workflow: workflow }) => {
    const isDraft = workflow.status === WorkflowStatus.DRAFT;
    if (isDraft) {
        return null
    }
    const { lastRunAt, lastRunStatus, lastRunId, nextRunAt, status } = workflow
    const formatedStartedAt = lastRunAt && formatDistanceToNow(lastRunAt, { addSuffix: true })

    const nextSchedule = nextRunAt && format(nextRunAt, "yyyy-MM-dd HH:mm");
    const nextScheduleUtc = nextRunAt && formatInTimeZone(nextRunAt, "UTC", "HH:mm")
    return (
        <div className='bg-primary/5 px-4 py-1 flex justify-between items-center text-muted-foreground'>
            <div className='flex items-center text-sm gap-2'>
                {lastRunAt &&
                    (
                        <Link href={`/workflow/runs/${workflow.id}/${lastRunId}`} className='flex items-center text-sm gap-2 group'>
                            <span>Last run:</span>
                            <ExecutionStatusIndicator status={lastRunStatus as WorkflowExecutionStatus} />

                            <ExecutionStatusLabel status={lastRunStatus as WorkflowExecutionStatus} />

                            <span>{formatedStartedAt}</span>
                            <ChevronRightIcon size={14} className=' group-hover:translate-x-0 transition' />
                        </Link>
                    )}
                {!lastRunAt && <p>No runs yet</p>}
            </div>
            {nextRunAt && (
                <div className='flex items-center text-sm gap-2'>
                    <ClockIcon size={12} />
                    <span>Next run at: </span>
                    <span>{nextSchedule}</span>
                    <span className='text-xs font-semibold'>({nextScheduleUtc} UTC) </span>
                </div>
            )}
        </div>
    )
}

export default WorkflowCard