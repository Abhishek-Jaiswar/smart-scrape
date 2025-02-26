import { TaskParamsType, TaskType } from "@/types/task";
import { WorkflowTask } from "@/types/workflow";
import { EyeIcon, LucideProps, MousePointerClickIcon, TextIcon } from "lucide-react";

export const WaitForElementTask = {
    type: TaskType.WAIT_FOR_ELEMENT,
    label: "Wait for element",
    icon: (props) => (
        <EyeIcon className="stroke-amber-400"  {...props} />
    ),
    isEntryPoint: false,
    credits: 1,
    inputs: [
        {
            name: "Web page",
            type: TaskParamsType.BROWSER_INSTANCE,
            required: true,
        },
        {
            name: "Selector",
            type: TaskParamsType.STRING,
            required: true
        },
        {
            name: "Visibility",
            type: TaskParamsType.SELECT,
            required: true,
            hideHandle: true,
            options: [
                { label: "Visible", value: "visible" },
                { label: "Hidden", value: "hidden" },
            ]
        },
    ] as const,
    outputs: [
        {
            name: "Web page",
            type: TaskParamsType.BROWSER_INSTANCE
        },
    ] as const,
} satisfies WorkflowTask;