"use client"

import React, { ReactNode, useEffect, useState } from 'react'
import { GetWorkflowExecutionWithPhase } from '../../../../../../../actions/getWorkflowExecutionWithPhase'
import { useQuery } from '@tanstack/react-query';
import { ExecutionPhaseStatus, WorkflowExecutionStatus } from '@/types/workflow';
import { CalendarIcon, CircleDashedIcon, ClockIcon, CoinsIcon, Loader2, Loader2Icon, LucideIcon, LucideProps, WorkflowIcon } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns'
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { DatesToDurationString } from '@/lib/helper/dates';
import { GetTotalCostOfPhases } from '@/lib/helper/phases';
import { GetWorkflowPhaseDetails } from '../../../../../../../actions/getPhaseDetails';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from '@/components/ui/input';
import { ExecutionLog } from '@prisma/client';

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { cn } from '@/lib/utils';
import { LogLevel } from '@/types/log';
import PhaseStatusBadge from './PhaseStatusBadge';



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

    const isRunning = query.data?.status === WorkflowExecutionStatus.RUNNING;

    useEffect(() => {
        const phases = query.data?.phases || []

        if (isRunning) {
            const phaseToSelect = phases.toSorted(
                (a, b) => a.startedAt! > b.startedAt! ? -1 : 1)[0];

            setSelectedPhase(phaseToSelect.id)
            return;
        }

        const phaseToSelect = phases.toSorted(
            (a, b) => a.completedAt! > b.completedAt! ? -1 : 1)[0];

        setSelectedPhase(phaseToSelect.id)

    }, [query.data?.phases, isRunning, setSelectedPhase])

    const duration = DatesToDurationString(query.data?.completedAt, query.data?.startedAt);

    const creditsConsumed = GetTotalCostOfPhases(query.data?.phases || []);

    return (
        <div className='flex w-full h-full'>
            <aside className='w-[340px] min-w-[340px] max-w-[340px] border-r-2 border-separate flex flex-grow flex-col overflow-hidden'>
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
                            <span className='flex gap-1 items-center text-xs'>
                                <Loader2Icon size={16} className='animate-spin' />
                                Calculating...
                            </span>
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
                            <PhaseStatusBadge status={phase.status as ExecutionPhaseStatus} />
                        </Button>
                    ))}
                </div>
            </aside>
            <div className='flex w-full h-full'>
                {isRunning && (
                    <div className='flex items-center flex-col gap-2 justify-center h-full w-full'>
                        <p className='font-bold'>Run is in progress, please wait.</p>
                    </div>
                )}
                {!isRunning && !selectedPhase && (
                    <div className='flex items-center flex-col gap-2 justify-center h-full w-full'>
                        <div className="flex flex-col gap-1 text-center">
                            <p className='font-bold text-neutral-800 text-2xl'>No phase is selected</p>
                            <p className='text-sm text-muted-foreground'>Select a phase to view details</p>
                        </div>
                    </div>
                )}
                {!isRunning && selectedPhase && phaseDetails.data && (
                    <div className='flex flex-col py-4 px-4 container gap-4 overflow-auto'>
                        <div className='flex gap-2 items-center'>
                            <Badge variant={"outline"} className='space-x-4'>
                                <div className='flex items-center gap-2'>
                                    <CoinsIcon size={18} className='stroke-muted-foreground' />
                                    <span>Credits</span>
                                    <span>TODO</span>
                                </div>
                            </Badge>
                            <Badge variant={"outline"} className='space-x-4'>
                                <div className='flex items-center gap-2'>
                                    <CoinsIcon size={18} className='stroke-muted-foreground' />
                                    <span>Duration</span>
                                    <span>{DatesToDurationString(phaseDetails.data.completedAt, phaseDetails.data.startedAt) || "-"}</span>
                                </div>
                            </Badge>
                        </div>
                        <ParameterViewer
                            title="Inputs"
                            subtitle="Inputs used for this phase"
                            paramsJSON={phaseDetails.data.inputs}
                        />
                        <ParameterViewer
                            title="Outputs"
                            subtitle="Outputs generated by this phase"
                            paramsJSON={phaseDetails.data.outputs}
                        />

                        <LogViewer
                            logs={phaseDetails.data.logs}
                        />
                    </div>
                )}
            </div>
        </div>
    )
}

export default ExecutionViewer

const ParameterViewer = ({
    title,
    subtitle,
    paramsJSON
}: { title: string, subtitle: string, paramsJSON: string | null }) => {
    const params = paramsJSON ? JSON.parse(paramsJSON) : undefined;
    return (
        <Card>
            <CardHeader className='rounded-lg rounded-b-none border-b py-4 bg-gray-50 dark:bg-background'>
                <CardTitle className='text-base'>
                    {title}
                </CardTitle>
                <CardDescription className='text-muted-foreground text-sm'>
                    {subtitle}
                </CardDescription>
            </CardHeader>
            <CardContent className='py-4'>
                <div className='flex flex-col gap-2'>
                    {(!params || Object.keys(params).length === 0) && (
                        <p className='text-sm'>No parameters generated by this phase</p>
                    )}
                    {params && Object.entries(params).map(([key, value]) => (
                        <div key={key} className=' flex justify-between items-center'>
                            <p className='text-sm text-muted-foreground flex-1 basis-1/3'>
                                {key}
                            </p>
                            <Input readOnly className='flex-1 basis-2/3' value={value as string} />
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    )
}

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


const LogViewer = ({ logs }: { logs: ExecutionLog[] | undefined }) => {
    if (!logs || logs.length === 0) return null;
    return (
        <Card className='w-full'>
            <CardHeader className='rounded-lg rounded-b-none border-b py-4 bg-gray-50 dark:bg-background'>
                <CardTitle className='text-base'>
                    Logs
                </CardTitle>
                <CardDescription className='text-muted-foreground text-sm'>
                    Logs generated by this phase
                </CardDescription>
            </CardHeader>
            <CardContent className='p-0'>
                <Table>
                    <TableHeader className='text-muted-foreground text-sm'>
                        <TableRow >
                            <TableHead className='px-4'>Time</TableHead>
                            <TableHead className='px-4'>Level</TableHead>
                            <TableHead className='px-4'>Message</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {logs.map((log) => (
                            <TableRow key={log.id} className='text-muted-foreground'>
                                <TableCell width={190} className='text-xs text-muted-foreground p-[2px] pl-4'>
                                    {log.timestamp.toISOString()}
                                </TableCell>
                                <TableCell
                                    width={80}
                                    className={cn("uppercase text-xs from-bold p-[3px] font-medium pl-4",
                                        (log.logLevel as LogLevel) === "error" && "text-destructive",
                                        (log.logLevel as LogLevel) === "info" && "text-green-500"
                                    )}>
                                    {log.logLevel}
                                </TableCell>
                                <TableCell
                                    className='text-sm flex-1 p-[3px] pl-4'
                                >{log.message}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    )
}

