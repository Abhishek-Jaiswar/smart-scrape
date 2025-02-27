import React, { Suspense } from 'react'
import PeriodSelector from './_components/PeriodSelector';
import { Period } from '@/types/analytics'
import { Skeleton } from '@/components/ui/skeleton';
import { GetStatsCardValues } from '../../../actions/analytics/getStatsCardValues';
import { GetPeriods } from '../../../actions/analytics/getPeriods';
import { CirclePlayIcon, CoinsIcon, WaypointsIcon } from 'lucide-react';
import StatsCard from './_components/StatsCard';

const Dashboard = async ({ searchParams }: { searchParams: { month?: string, year?: string } }) => {
    const currentDate = new Date();
    const { month, year } = await searchParams;
    const period: Period = {
        month: month ? parseInt(month) : currentDate.getMonth(),
        year: year ? parseInt(year) : currentDate.getFullYear()
    }
    return (
        <div className='flex flex-1 flex-col h-full'>
            <div className='flex justify-between'>
                <h1 className='text-3xl font-bold'>Home</h1>
                <Suspense fallback={
                    <Skeleton className='w-[180px] h-[40px]' />
                }>
                    <PeriodSelectorWrapper selectedPeriod={period} />
                </Suspense>
            </div>
            <div className='h-full py-6 flex flex-col gap-4'>
                <Suspense fallback={<StatsCardSkeleton />}>
                    <StatsCards selectedPeriod={period} />
                </Suspense>
            </div>

        </div>
    )
}


const PeriodSelectorWrapper = async ({ selectedPeriod }: { selectedPeriod: Period }) => {
    const periods = await GetPeriods();
    return (
        <PeriodSelector periods={periods} selectedPeriod={selectedPeriod} />
    )
}

const StatsCards = async ({ selectedPeriod }: { selectedPeriod: Period }) => {
    const data = await GetStatsCardValues(selectedPeriod);
    return (
        <div className=' grid grid-cols-1 gap-3 lg:gap-8 lg:grid-cols-3 min-h-[120px]'>
            <StatsCard
                title={"Workflow executions"}
                value={data.workflowExecution}
                icon={CirclePlayIcon}
            />
            <StatsCard
                title={"Phase executions"}
                value={data.phaseExecutions}
                icon={WaypointsIcon}
            />
            <StatsCard
                title={"Credits consumed"}
                value={data.creditsConsumed}
                icon={CoinsIcon}
            />
        </div>
    )
}

const StatsCardSkeleton = () => {
    return (
        <div className='grid gap-3 lg:gap-8 lg:grid-cols-3'>
            {[1, 2, 3].map((i) => (
                <Skeleton key={i} className='w-full min-h-[120px]' />
            ))}
        </div>
    )
}

export default Dashboard