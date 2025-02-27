import { TaskParamsType, TaskType } from "@/types/task";
import { WorkflowTask } from "@/types/workflow";
import { FileJson2Icon } from "lucide-react";

export const ReadPropertyFromJsonTask = {
    type: TaskType.READ_PROPERTY_FROM_JSON,
    label: "Read property from json",
    icon: (props) => (
        <FileJson2Icon className="stroke-orange-400"  {...props} />
    ),
    isEntryPoint: false,
    credits: 1,
    inputs: [
        {
            name: "JSON",
            type: TaskParamsType.STRING,
            required: true,
        },
        {
            name: "Property name",
            type: TaskParamsType.STRING,
            required: true
        },
    ] as const,
    outputs: [
        {
            name: "Property value",
            type: TaskParamsType.STRING
        },
    ] as const,
} satisfies WorkflowTask;