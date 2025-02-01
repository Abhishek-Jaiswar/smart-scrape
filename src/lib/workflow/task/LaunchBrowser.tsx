import { TaskType } from "@/types/TaskType";
import { GlobeIcon, LucideProps } from "lucide-react";

export const LaunchBrowser = {
    type: TaskType.LAUNCH_BROWSER,
    label: "Launch browser",
    icon: (props: LucideProps) => (
        <GlobeIcon className="stroke-rose-400"  {...props} />
    ),
    isEntryPoint: true,
}