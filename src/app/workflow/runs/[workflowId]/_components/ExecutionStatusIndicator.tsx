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
        <div className={cn("w-2 h-2 rounded-full", indicatorColors[status])}>

        </div>
    )
}

export default ExecutionStatusIndicator