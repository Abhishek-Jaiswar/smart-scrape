"use client"

import { Button, buttonVariants } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { WorkflowStatus } from '@/types/workflow'
import { workflow } from '@prisma/client'
import { MoreVerticalIcon, NotepadText, PlayIcon, ShuffleIcon, TrashIcon } from 'lucide-react'
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


const statusColors = {
    [WorkflowStatus.DRAFT]: "bg-yellow-500 text-yellow-800",
    [WorkflowStatus.PUBLISHED]: "bg-primary"
}

const WorkflowCard = ({ workflow }: { workflow: workflow }) => {
    const isDraft = workflow.status === WorkflowStatus.DRAFT
    return (
        <Card className='border border-separate shadow-sm rounded-sm overflow-hidden hover:shadow-md dark:shadow-primary/30'>
            <CardContent className=' p-4 flex items-center justify-between h-[100px]'>
                <div className='flex items-center justify-end'>

                    <div className={cn(' w-10 h-10 rounded-full flex items-center justify-center ', statusColors[workflow.status as WorkflowStatus])}>
                        {isDraft ? (
                            <NotepadText className='h-5 w-5' />
                        ) : (
                            <PlayIcon className='h-5 w-5 text-white' />
                        )}
                    </div>
                    <div className="">
                        <h1 className='text-base px-3 font-bold text-muted-foreground flex items-center'>
                            <Link href={`/workflow/editor/${workflow.id}`}
                                className='flex items-center hover:underline'
                            >
                                {workflow.name}
                            </Link>
                            {isDraft && (
                                <span className='ml-2 px-2 py-0.5 text-xs font-medium bg-yellow-100 text-yellow-800 rounded-full border border-yellow-500'>
                                    Draft
                                </span>
                            )}
                        </h1>
                    </div>
                </div>
                <div className='flex items-center space-x-2 '>
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

export default WorkflowCard