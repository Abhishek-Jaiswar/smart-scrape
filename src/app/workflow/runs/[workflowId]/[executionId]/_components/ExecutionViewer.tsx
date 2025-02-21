"use client"

import React, { ReactNode, useState } from 'react'
import { GetWorkflowExecutionWithPhase } from '../../../../../../../actions/getWorkflowExecutionWithPhase'
import { useQuery } from '@tanstack/react-query';
import { WorkflowExecutionStatus } from '@/types/workflow';
import { CalendarIcon, CircleDashedIcon, ClockIcon, CoinsIcon, Loader2, Loader2Icon, LucideIcon, LucideProps, WorkflowIcon } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns'
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { DatesToDurationString } from '@/lib/helper/dates';
import { GetTotalCostOfPhases } from '@/lib/helper/phases';
import { GetWorkflowPhaseDetails } from '../../../../../../../actions/getPhaseDetails';

type ExecutionData = Awaited<ReturnType<typeof GetWorkflowExecutionWithPhase>>;

const ExecutionViewer = ({ initialData }: { initialData: ExecutionData }) => {
    const [selectedPhase, setSelectedPhase] = useState<string | null>(null)
    const query = useQuery({
        queryKey: ["execution", initialData?.id],
        initialData,
        queryFn: () => GetWorkflowExecutionWithPhase(initialData!.id),
        refetchInterval: (q) => q.state.data?.status === WorkflowExecutionStatus.RUNNING ? 1000 : false
    })

    const phaseDetails = useQuery({
        queryKey: ["phaseDetails", selectedPhase],
        enabled: selectedPhase !== null,
        queryFn: () => GetWorkflowPhaseDetails(selectedPhase!)
    })

    const isRunning = query.data?.status === WorkflowExecutionStatus.RUNNING

    const duration = DatesToDurationString(query.data?.completedAt, query.data?.startedAt);

    const creditsConsumed = GetTotalCostOfPhases(query.data?.phases || []);

    return (
        <div className='flex w-full h-full'>
            <aside className='w-[320px] min-w-[320px] max-w-[320px] border-r-2 border-separate flex flex-grow flex-col overflow-hidden'>
                <div className="py-4 px-2">
                    {/* status label */}
                    <ExecutionLabel
                        icon={CircleDashedIcon}
                        label={"Status"}
                        value={query.data?.status}
                    />

                    {/* StartedAtLebel */}

                    <ExecutionLabel
                        icon={CalendarIcon}
                        label={"Started at"}
                        value={
                            <span className='lowercase'>
                                {
                                    query.data?.startedAt ? formatDistanceToNow(new Date(query.data?.startedAt), { addSuffix: true }) : "-"
                                }
                            </span>
                        }
                    />

                    <ExecutionLabel
                        icon={ClockIcon}
                        label={"Duration"}
                        value={duration ? duration : (
                            <Loader2Icon size={16} className='animate-spin' />
                        )}
                    />

                    <ExecutionLabel
                        icon={CoinsIcon}
                        label={"Credits consumed"}
                        value={creditsConsumed}
                    />
                </div>
                <Separator />
                <div className=" flex items-center justify-center py-2 px-4">
                    <div className="flex items-center gap-2 text-muted-foreground">
                        <WorkflowIcon size={16} className='stroke-muted-foreground/80' />
                        <span className='font-semibold'>Phases</span>
                    </div>
                </div>
                <Separator />
                <div className="overflow-auto h-full px-2 py-4">
                    {query.data?.phases.map((phase, index) => (
                        <Button
                            variant={selectedPhase === phase.id ? "secondary" : "ghost"}
                            key={phase.id}
                            className='w-full justify-between'
                            onClick={() => {
                                if (isRunning) return;
                                setSelectedPhase(phase.id)
                            }}
                        >
                            <div className='flex items-center gap-2'>
                                <Badge variant={'outline'}>
                                    {index + 1}
                                </Badge>
                                <p className='font-semibold'>{phase.name}</p>
                            </div>
                            <p className='text-muted-foreground text-xs'>{phase.status}</p>
                        </Button>
                    ))}
                </div>
            </aside>
            <div className='flex w-full h-full'>
                <pre>{JSON.stringify(phaseDetails, null, 4)}</pre>
            </div>
        </div>
    )
}

export default ExecutionViewer

const ExecutionLabel = ({ icon, label, value }: { icon: LucideIcon, label: ReactNode, value: ReactNode }) => {
    const Icon = icon
    return (
        <div className='flex justify-between items-center py-2 px-4 text-sm'>
            <div className='text-muted-foreground flex items-center gap-2'>
                <Icon size={20}
                    className='stroke-muted-foreground/80'
                />
                <span>{label}</span>
            </div>
            <div className='font-semibold capitalize flex gap-2 items-center'>
                {value}
            </div>
        </div>
    )
}


