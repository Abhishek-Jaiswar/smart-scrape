import { Skeleton } from '@/components/ui/skeleton'
import { waitFor } from '@/lib/helper/waitfor'
import React, { Suspense } from 'react'

const page = () => {
  return (
    <div className='flex-1 flex flex-col h-full'>
      <div className="flex justify-between">
        <div className="flex flex-col">
          <h1 className='text-4xl font-bold text-neutral-900 dark:text-neutral-500'>Workflows</h1>
          <p className='text-sm text-neutral-400 font-medium'>Manage your workflows</p>
        </div>

        <div className='h-full py-6'>
          <Suspense fallback={<UserWorkflowSkeleton />}>
            <UserWorkflows />
          </Suspense>
        </div>
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
  await waitFor(3000)
  return <div>
  </div>
}

export default page