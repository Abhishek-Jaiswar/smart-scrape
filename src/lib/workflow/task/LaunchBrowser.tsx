import { TaskParamsType, TaskType } from "@/types/task";
import { WorkflowTask } from "@/types/workflow";
import { GlobeIcon, LucideProps } from "lucide-react";

export const LaunchBrowser = {
    type: TaskType.LAUNCH_BROWSER,
    label: "Launch browser",
    icon: (props: LucideProps) => (
        <GlobeIcon className="stroke-rose-400"  {...props} />
    ),
    isEntryPoint: true,
    credits: 5,
    inputs: [
        {
            name: "Website url",
            type: TaskParamsType.STRING,
            helperText: "eg: http://www.google.com",
            required: true,
            hideHandle: true
        },
    ] as const,
    outputs: [
        {
            name: "Web page",
            type: TaskParamsType.BROWSER_INSTANCE,
        }
    ] as const,
} satisfies WorkflowTask;