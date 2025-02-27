import { TaskParamsType, TaskType } from "@/types/task";
import { WorkflowTask } from "@/types/workflow";
import { BrainIcon } from "lucide-react";

export const ExtractDataWithAiTask = {
    type: TaskType.EXTRACT_DATA_WITH_AI,
    label: "Extract data with AI",
    icon: (props) => (
        <BrainIcon className="stroke-orange-400"  {...props} />
    ),
    isEntryPoint: false,
    credits: 5,
    inputs: [
        {
            name: "Content",
            type: TaskParamsType.STRING,
            required: true,
        },
        {
            name: "Credentials",
            type: TaskParamsType.CREDENTIAL,
            required: true
        },
        {
            name: "Prompt",
            type: TaskParamsType.STRING,
            required: true,
            variant: "textarea"
        },
    ] as const,
    outputs: [
        {
            name: "Extracted data",
            type: TaskParamsType.STRING
        },
    ] as const,
} satisfies WorkflowTask;