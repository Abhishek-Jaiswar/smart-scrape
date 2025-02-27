import { TaskParamsType, TaskType } from "@/types/task";
import { WorkflowTask } from "@/types/workflow";
import { Link2Icon, MousePointerClickIcon} from "lucide-react";

export const NavigateUrlTask = {
    type: TaskType.NAVIGATE_URL,
    label: "Navigate url",
    icon: (props) => (
        <Link2Icon className="stroke-orange-400"  {...props} />
    ),
    isEntryPoint: false,
    credits: 2,
    inputs: [
        {
            name: "Web page",
            type: TaskParamsType.BROWSER_INSTANCE,
            required: true,
        },
        {
            name: "Url",
            type: TaskParamsType.STRING,
            required: true
        },
    ] as const,
    outputs: [
        {
            name: "Web page",
            type: TaskParamsType.BROWSER_INSTANCE
        },
    ] as const,
} satisfies WorkflowTask;