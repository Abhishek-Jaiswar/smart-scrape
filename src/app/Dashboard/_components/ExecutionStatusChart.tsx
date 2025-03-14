"use client";

import React from "react";
import { GetWorkflowExecutionStats } from "../../../../actions/analytics/getWorkflowExecutionStats";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AreaChart, Area } from "recharts";
import { ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { CartesianGrid, XAxis, YAxis } from "recharts";
import { Layers2Icon } from "lucide-react";

type ChartData = Awaited<ReturnType<typeof GetWorkflowExecutionStats>>;

const ExecutionStatusChart = ({ data }: { data: ChartData }) => {
    const chartConfig = {
        success: {
            label: "Success",
            color: "hsl(var(--chart-2))",
        },
        failed: {
            label: "Failed",
            color: "hsl(var(--chart-1))",
        },
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-2xl font-bold flex items-center gap-2">
                    <Layers2Icon className="w-6 h-6 text-primary" />
                    Workflow Execution Status
                </CardTitle>
                <CardDescription>Daily number of successful and failed executions.</CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig} className="max-h-[300px] w-full">

                    <AreaChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis
                            dataKey="date"
                            tick={{ fill: "#8884d8" }}
                            tickMargin={8}
                            minTickGap={32}
                            tickFormatter={value => {
                                const date = new Date(value)
                                return date.toLocaleString("en-US", {
                                    month: "short",
                                    day: "numeric"
                                })
                            }}
                        />
                        <YAxis />
                        <ChartLegend content={<ChartLegendContent />} />
                        <ChartTooltip content={<ChartTooltipContent className="w-[250px]" />} />

                        <Area
                            min={0}
                            type="bump"
                            dataKey="success"
                            fillOpacity={0.6}
                            stroke={chartConfig.success.color}
                            fill={chartConfig.success.color}
                            stackId={'a'}
                        />

                        <Area
                            type="bump"
                            dataKey="failed"
                            stroke={chartConfig.failed.color}
                            fill={chartConfig.failed.color}
                            fillOpacity={0.6}
                            stackId={'a'}

                        />
                    </AreaChart>
                </ChartContainer>
            </CardContent>
        </Card>
    );
};

export default ExecutionStatusChart;
