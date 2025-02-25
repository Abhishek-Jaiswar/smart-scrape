import { cn } from '@/lib/utils'
import { WorkflowExecutionStatus } from '@/types/workflow'
import React from 'react'


const indicatorColors: Record<WorkflowExecutionStatus, string> = {
    PENDING: "bg-neon-400",
    RUNNING: "bg-yellow-400",
    FAILED: "bg-red-400",
    COMPLETED: "bg-emerald-400"
}

const ExecutionStatusIndicator = ({ status }: { status: WorkflowExecutionStatus }) => {
    return (
        <div className={cn("w-2 h-2 rounded-full", indicatorColors[status])} />
    )
}


export default ExecutionStatusIndicator

const labelColors: Record<WorkflowExecutionStatus, string> = {
    PENDING: "text-neon-400",
    RUNNING: "text-yellow-400",
    FAILED: "text-red-400",
    COMPLETED: "text-emerald-400"
}

export function ExecutionStatusLabel({ status }: { status: WorkflowExecutionStatus }) {
    return (
        <span className={cn("lowercase", labelColors[status])}>{status}</span>
    )
}