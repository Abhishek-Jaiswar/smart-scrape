import { Skeleton } from '@/components/ui/skeleton'
import { waitFor } from '@/lib/helper/waitfor'
import React, { Suspense } from 'react'
import { GetUserWorkflows } from '../../../../actions/workflowsForUser'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { AlertCircle } from 'lucide-react'
import Image from 'next/image'

const page = () => {
  return (
    <div className='flex-1 flex flex-col h-full'>
      <div className="flex justify-between">
        <div className="flex flex-col">
          <h1 className='text-4xl font-bold text-neutral-900 dark:text-neutral-500'>Workflows</h1>
          <p className='text-sm text-neutral-400 font-medium'>Manage your workflows</p>
        </div>
      </div>
      <div className='h-full py-6'>
        <Suspense fallback={<UserWorkflowSkeleton />}>
          <UserWorkflows />
        </Suspense>
      </div>
    </div>
  )
}


const UserWorkflowSkeleton = () => {
  return <div>
    {[1, 2, 3, 4].map((i) => (
      <Skeleton key={i} className='w-34 h-34 ' />
    ))}
  </div>
}

const UserWorkflows = async () => {
  const workflows = await GetUserWorkflows()
  if (!workflows) {
    return (
      <Alert variant={"destructive"}>
        <AlertCircle className='w-4 h-4' />
        <AlertTitle> Error </AlertTitle>
        <AlertDescription>Something went wrong. Please try again later</AlertDescription>
      </Alert>
    )
  }

  if (workflows.length === 0) {
    return <div className='flex flex-col items-center justify-center gap-4 h-full'>
      <div className=" mt-7">
        <Image
         src="/no-workflow.svg"
         alt='nodatayet'
         width={400}
         height={400}
         className=''
         />
      </div>
      <div className='text-center'>
        <p className='text-2xl font-bold font-sans text-neutral-700 dark:text-neutral-300'>No workflow created yet</p>
        <p className=' text-neutral-500 dark:text-neutral-400'>Click the button below to create the workflow</p>
      </div>
    </div>
  }
  return <div>
  </div>
}

export default page