import { TaskParamsType, TaskType } from "@/types/TaskType";
import { GlobeIcon, LucideProps } from "lucide-react";

export const LaunchBrowser = {
    type: TaskType.LAUNCH_BROWSER,
    label: "Launch browser",
    icon: (props: LucideProps) => (
        <GlobeIcon className="stroke-rose-400"  {...props} />
    ),
    isEntryPoint: true,
    inputs: [
        {
            name: "Website url",
            type: TaskParamsType.STRING,
            helperText: "eg: http://www.google.com",
            required: true,
            hideHandle: true
        },
    ],
    outputs: [
        {
            name: "Html",
            type: TaskParamsType.STRING,
        }
    ]
}