import Topbar from '@/app/workflow/_components/nodes/topbar/Topbar';
import { waitFor } from '@/lib/helper/waitfor';
import { auth } from '@clerk/nextjs/server';
import { Loader2 } from 'lucide-react';
import React, { Suspense } from 'react'
import { GetWorkflowExecutionWithPhase } from '../../../../../../actions/getWorkflowExecutionWithPhase';
import ExecutionViewer from './_components/ExecutionViewer';

const ExecutionViewerPage = async ({ params }: {
    params: {
        workflowId: string;
        executionId: string;
    }
}) => {
    const { executionId, workflowId } = await params
    return (
        <div className='flex flex-col h-screen w-full overflow-hidden'>
            <Topbar
                workflowId={workflowId}
                title='Workflow run details'
                subtitle={`Run Id: ${executionId}`}
                hideButton
            />
            <section className='flex h-full overflow-auto'>
                <Suspense fallback={
                    <div className='flex items-center justify-center w-full'>
                        <Loader2 className='h-10 w-10 animate-spin stroke-primary' />
                    </div>
                }>
                    <ExecutionViewerWrapper executionId={executionId} />
                </Suspense>
            </section>
        </div>
    )
}

export default ExecutionViewerPage

const ExecutionViewerWrapper = async ({ executionId }: { executionId: string }) => {
    const { userId } = await auth();

    const workflowExecution = await GetWorkflowExecutionWithPhase(executionId)

    return <ExecutionViewer initialData={workflowExecution} />
}

