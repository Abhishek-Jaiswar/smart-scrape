

import React, { Suspense } from 'react'
import Topbar from '../../_components/topbar/Topbar'
import { GetWorkflowExecutions } from '../../../../../actions/getWorkflowExecution'
import { InboxIcon, Loader2Icon } from 'lucide-react'
import { waitFor } from '@/lib/helper/waitfor'
import ExecutionsTable from './_components/ExecutionsTable'

const ExecutionsPage = async ({ params }: { params: { workflowId: string } }) => {
    const { workflowId } = await params
    return (
        <div className='h-full w-full overflow-auto'>
            <Topbar
                workflowId={workflowId}
                title="All previous runs"
                subtitle='List of all your workflow runs'
                hideButton
            />

            <Suspense fallback={
                <div className='flex h-full w-full items-center justify-center'>
                    <Loader2Icon size={25} className='animate-spin stroke-primary' />
                </div>
            }>
                <ExecutionsTableWrapper
                    workflowId={workflowId}
                />
            </Suspense>

        </div>
    )
}

export default ExecutionsPage

export const ExecutionsTableWrapper = async ({ workflowId }: { workflowId: string }) => {
    await waitFor(4000)
    const executions = await GetWorkflowExecutions(workflowId);
    if (!executions) {
        return (
            <div className='flex items-center justify-center w-full h-full'>
                <p className='text-sm font-bold text-neutral-800'>No data</p>
            </div>
        )
    }

    if (executions.length === 0) {
        return (
            <div className='container w-full py-6'>
                <div className='flex items-center flex-col gap-2 justify-center h-full w-full'>
                    <div className='rounded-full bg-accent w-20 h-20 flex items-center justify-center'>
                        <InboxIcon size={50} className='stroke-primary' />
                    </div>
                    <div className='flex flex-col gap-1 text-center'>
                        <p className=' font-bold'>No runs have been triggered yet for this workflow.</p>
                        <p className='text-sm text-muted-foreground'>You can trigger a new run in the editor tab.</p>
                    </div>
                </div>

            </div>
        )
    }
    return (
        <div className=' container py-6 w-full'>
            <ExecutionsTable workflowId={workflowId} initialData={executions} />
        </div>
    )
}