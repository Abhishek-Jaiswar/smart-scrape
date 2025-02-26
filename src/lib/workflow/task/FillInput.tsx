import { TaskParamsType, TaskType } from "@/types/task";
import { WorkflowTask } from "@/types/workflow";
import { CodeIcon, Edit3Icon, LucideProps } from "lucide-react";

export const FillInputTask = {
    type: TaskType.FILL_INPUT,
    label: "Fill input",
    icon: (props) => (
        <Edit3Icon className="stroke-orange-400"  {...props} />
    ),
    isEntryPoint: false,
    credits: 1,
    inputs: [
        {
            name: "Web page",
            type: TaskParamsType.BROWSER_INSTANCE,
            required: true
        },
        {
            name: "Selector",
            type: TaskParamsType.STRING,
            required: true
        },
        {
            name: "value",
            type: TaskParamsType.STRING,
            required: true
        },
    ] as const,
    outputs: [
        {
            name: "Web page",
            type: TaskParamsType.BROWSER_INSTANCE
        }
    ] as const
} satisfies WorkflowTask;