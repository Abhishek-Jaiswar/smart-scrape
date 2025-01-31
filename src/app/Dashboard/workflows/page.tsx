import { Skeleton } from '@/components/ui/skeleton'
import React, { Suspense } from 'react'
import { GetUserWorkflows } from '../../../../actions/workflowsForUser'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { AlertCircle } from 'lucide-react'
import Image from 'next/image'
import CreateWorkflow from './_components/CreateWorkflowDialog'

const page = () => {
  return (
    <div className="flex-1 flex flex-col h-full">
      <div className="flex justify-between items-center mb-6">
        <div className="flex flex-col">
          <h1 className="text-4xl font-bold text-neutral-900 dark:text-neutral-100">Workflows</h1>
          <p className="text-sm text-neutral-500 dark:text-neutral-400 font-medium">Manage your workflows</p>
        </div>
        <CreateWorkflow />
      </div>
      <div className="flex-1">
        <Suspense fallback={<UserWorkflowSkeleton />}>
          <UserWorkflows />
        </Suspense>
      </div>
    </div>
  )
}


function UserWorkflowSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {[1, 2, 3, 4].map((i) => (
        <Skeleton key={i} className="h-40 w-full" />
      ))}
    </div>
  )
}

async function UserWorkflows() {
  const workflows = await GetUserWorkflows()

  if (!workflows) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>Something went wrong. Please try again later.</AlertDescription>
      </Alert>
    )
  }

  if (workflows.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 h-full">
        <div className="mt-7">
          <Image src="/no-workflow.svg" alt="No workflows" width={400} height={400} className="max-w-full h-auto" />
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold font-sans text-neutral-700 dark:text-neutral-300">No workflow created yet</p>
          <p className="text-neutral-500 dark:text-neutral-400">Click the button below to create a workflow</p>
        </div>
        <CreateWorkflow triggerText="Create your first workflow" />
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {workflows.map((workflow) => (
        <div key={workflow.id} className="border rounded-lg p-4">
          {/* Add workflow card content here */}
          <h3 className="text-lg font-semibold">{workflow.name}</h3>
          {/* Add more workflow details */}
        </div>
      ))}
    </div>
  )
}

export default page