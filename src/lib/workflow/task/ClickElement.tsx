import { TaskParamsType, TaskType } from "@/types/task";
import { WorkflowTask } from "@/types/workflow";
import { MousePointerClickIcon} from "lucide-react";

export const ClickElementTask = {
    type: TaskType.CLICK_ELEMENT,
    label: "Click element",
    icon: (props) => (
        <MousePointerClickIcon className="stroke-orange-400"  {...props} />
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
    ] as const,
    outputs: [
        {
            name: "Web page",
            type: TaskParamsType.BROWSER_INSTANCE
        },
    ] as const,
} satisfies WorkflowTask;