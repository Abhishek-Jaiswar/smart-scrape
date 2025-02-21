"use client"

import React from 'react'
import { GetWorkflowExecutionWithPhase } from '../../../../../../../actions/getWorkflowExecutionWithPhase'
import { useQuery } from '@tanstack/react-query';
import { WorkflowExecutionStatus } from '@/types/workflow';

type ExecutionData = Awaited<ReturnType<typeof GetWorkflowExecutionWithPhase>>;

const ExecutionViewer = ({ initialData }: { initialData: ExecutionData }) => {
    const query = useQuery({
        queryKey: ["execution", initialData?.id],
        initialData,
        queryFn: () => GetWorkflowExecutionWithPhase(initialData!.id),
        refetchInterval: (q) => q.state.data?.status === WorkflowExecutionStatus.RUNNING ? 1000 : false
    })

    return (
        <div>ExecutionViewer</div>
    )
}

export default ExecutionViewer