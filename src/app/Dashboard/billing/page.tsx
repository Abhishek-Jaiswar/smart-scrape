import React, { Suspense } from 'react'
import { GetAvailableBalance } from '../../../../actions/biling/getAvailableCredits'
import { Skeleton } from '@/components/ui/skeleton'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import ReactCountUpWrapper from '@/components/ReactCountUpWrapper'
import { CoinsIcon } from 'lucide-react'
import CreditsPurchase from './_components/CreditsPurchase'

const page = () => {
  return (
    <div className='mx-auto p-4 space-y-8'>
      <h1 className='text-3xl font-bold'>Billing</h1>

      <Suspense fallback={<Skeleton className='h-[166px] w-full' />}>
        <BalanceCard />
      </Suspense>

      <CreditsPurchase />
    </div>
  )
}

const BalanceCard = async () => {
  const userBalance = await GetAvailableBalance()
  return (
    <Card className='bg-gradient-to-br from-primary/10 via-primary/5 to-background border-primary/20 shadow-lg flex justify-between flex-col overflow-hidden'>
      <CardContent className='p-6 relative items-center'>
        <div className='flex items-center justify-between'>
          <div>
            <h3 className='text-lg font-semibold text-foreground'>Available Credits</h3>
            <p className='text-4xl font-bold text-primary'>
              <ReactCountUpWrapper value={userBalance} />
            </p>
          </div>
          <CoinsIcon size={150}
            className='text-primary opacity-20 absolute bottom-0 right-0' />
        </div>
      </CardContent>
      <CardFooter>
        When you credit balance reaches zero, Your workflows will stop working.
      </CardFooter>
    </Card>
  );
}


export default page