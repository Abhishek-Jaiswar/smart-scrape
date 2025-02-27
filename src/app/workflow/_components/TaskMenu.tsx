'use client'

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { TaskRegistry } from "@/lib/workflow/task/registry"
import { TaskType } from "@/types/task"
import { CoinsIcon } from "lucide-react"


const TaskMenu = () => {
    return (
        <aside className='w-[300px] min-w-[300px] max-w-[300px] border-r-2 border-separate h-full p-1 px-4 overflow-auto'>
            <Accordion type="multiple" className="w-full" defaultValue={["extraction", "interactions", "timing", "results", "storage"]}>

                <AccordionItem value="interactions" >
                    <AccordionTrigger className="font-bold">
                        User interaction
                    </AccordionTrigger>
                    <AccordionContent className="flex flex-col gap-1">
                        <TaskMenuBtn taskType={TaskType.NAVIGATE_URL} />
                        <TaskMenuBtn taskType={TaskType.FILL_INPUT} />
                        <TaskMenuBtn taskType={TaskType.CLICK_ELEMENT} />
                        <TaskMenuBtn taskType={TaskType.SCROLL_TO_ELEMENT} />
                    </AccordionContent>
                </AccordionItem>

                <AccordionItem value="extraction" >
                    <AccordionTrigger className="font-bold">
                        Data extraction
                    </AccordionTrigger>
                    <AccordionContent className="flex flex-col gap-1">
                        <TaskMenuBtn taskType={TaskType.PAGE_TO_HTML} />
                        <TaskMenuBtn taskType={TaskType.EXTRACT_TEXT_FROM_ELEMENT} />
                        <TaskMenuBtn taskType={TaskType.EXTRACT_DATA_WITH_AI} />
                    </AccordionContent>
                </AccordionItem>

                <AccordionItem value="storage" >
                    <AccordionTrigger className="font-bold">
                        Data storage
                    </AccordionTrigger>
                    <AccordionContent className="flex flex-col gap-1">
                        <TaskMenuBtn taskType={TaskType.READ_PROPERTY_FROM_JSON} />
                        <TaskMenuBtn taskType={TaskType.ADD_PROPERTY_TO_JSON} />
                    </AccordionContent>
                </AccordionItem>

                <AccordionItem value="timing" >
                    <AccordionTrigger className="font-bold">
                        Timing controls
                    </AccordionTrigger>
                    <AccordionContent className="flex flex-col gap-1">
                        <TaskMenuBtn taskType={TaskType.WAIT_FOR_ELEMENT} />
                        {/* <TaskMenuBtn taskType={TaskType.Delay} /> */}
                    </AccordionContent>
                </AccordionItem>

                <AccordionItem value="results" >
                    <AccordionTrigger className="font-bold">
                        Result delivery
                    </AccordionTrigger>
                    <AccordionContent className="flex flex-col gap-1">
                        <TaskMenuBtn taskType={TaskType.DELIVER_VIA_WEBHOOK} />
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </aside>
    )
}

const TaskMenuBtn = ({ taskType }: { taskType: TaskType }) => {
    const task = TaskRegistry[taskType]

    const onDragStart = (event: React.DragEvent, type: TaskType) => {
        event.dataTransfer.setData("application/reactflow", type);
        event.dataTransfer.effectAllowed = "move";
    }

    return (
        <Button variant={"secondary"} className="flex items-center justify-between gap-2 border w-full"
            draggable
            onDragStart={event => onDragStart(event, taskType)}>
            <div className="flex gap-2">
                <task.icon size={16} />
                <p className="text-xs">{task.label}</p>
            </div>
            <Badge className="gap-2 flex items-center" variant={"outline"}>
                <CoinsIcon size={16} />
                <p className="text-xs">{task.credits}</p>
            </Badge>
        </Button>
    )
}

export default TaskMenu;

