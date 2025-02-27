import { TaskParamsType, TaskType } from "@/types/task";
import { WorkflowTask } from "@/types/workflow";
import { DatabaseIcon } from "lucide-react";

export const AddPropertyToJsonTask = {
    type: TaskType.ADD_PROPERTY_TO_JSON,
    label: "Add property to json",
    icon: (props) => (
        <DatabaseIcon className="stroke-orange-400"  {...props} />
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
        {
            name: "Property value",
            type: TaskParamsType.STRING,
            required: true
        },
    ] as const,
    outputs: [
        {
            name: "Updated JSON",
            type: TaskParamsType.STRING
        },
    ] as const,
} satisfies WorkflowTask;