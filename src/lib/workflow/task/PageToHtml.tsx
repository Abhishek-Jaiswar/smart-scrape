import { TaskParamsType, TaskType } from "@/types/TaskType";
import { CodeIcon, LucideProps } from "lucide-react";

export const PageToHtmlTask = {
    type: TaskType.PAGE_TO_HTML,
    label: "Get html from web page",
    icon: (props: LucideProps) => (
        <CodeIcon className="stroke-rose-400"  {...props} />
    ),
    isEntryPoint: false,
    inputs: [
        {
            name: "Web page",
            type: TaskParamsType.BROWSER_INSTANCE,
            required: true
        },
    ],
    outputs: [
        {
            name: "Html",
            type: TaskParamsType.STRING
        },
        {
            name: "Web page",
            type: TaskParamsType.BROWSER_INSTANCE
        }
    ]
};