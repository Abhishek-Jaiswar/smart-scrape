"use client";

import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AreaChart, Area, BarChart, Bar } from "recharts";
import { ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { CartesianGrid, XAxis, YAxis } from "recharts";
import { ChartColumnStackedIcon, Layers2Icon } from "lucide-react";
import { GetCreditsUsageInPeriod } from "../../../../../actions/analytics/getCreditsUsageInPeriod";

type ChartData = Awaited<ReturnType<typeof GetCreditsUsageInPeriod>>;

const CreditsUsageChart = ({ title, description, data }: { title: string, description: string, data: ChartData }) => {
    const chartConfig = {
        success: {
            label: "Successfull Phases Credits",
            color: "hsl(var(--chart-2))",
        },
        failed: {
            label: "Failed Phases Credits",
            color: "hsl(var(--chart-1))",
        },
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-2xl font-bold flex items-center gap-2">
                    <ChartColumnStackedIcon className="w-6 h-6 text-primary" />
                    {title}
                </CardTitle>
                <CardDescription>{description}</CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig} className="max-h-[300px] w-full">

                    <BarChart data={data}>
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

                        <Bar
                            dataKey="success"
                            fillOpacity={0.8}
                            stroke={chartConfig.success.color}
                            fill={chartConfig.success.color}
                            stackId={'a'}
                            radius={[0, 0, 4, 4]}
                        />

                        <Bar
                            dataKey="failed"
                            stroke={chartConfig.failed.color}
                            fill={chartConfig.failed.color}
                            fillOpacity={0.8}
                            stackId={'a'}
                            radius={[4, 4, 0, 0]}

                        />
                    </BarChart>
                </ChartContainer>
            </CardContent>
        </Card>
    );
};

export default CreditsUsageChart;
