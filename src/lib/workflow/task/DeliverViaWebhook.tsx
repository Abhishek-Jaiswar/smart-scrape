import { TaskParamsType, TaskType } from "@/types/task";
import { WorkflowTask } from "@/types/workflow";
import { LucideProps, MousePointerClickIcon, SendIcon, TextIcon } from "lucide-react";

export const DeliverViaWebhookTask = {
    type: TaskType.DELIVER_VIA_WEBHOOK,
    label: "Deliver via webhook",
    icon: (props) => (
        <SendIcon className="stroke-blue-400"  {...props} />
    ),
    isEntryPoint: false,
    credits: 1,
    inputs: [
        {
            name: "Target URL",
            type: TaskParamsType.STRING,
            required: true,
        },
        {
            name: "Body",
            type: TaskParamsType.STRING,
            required: true
        },
    ] as const,
    outputs: [] as const,
} satisfies WorkflowTask;