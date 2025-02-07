'use client'

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { TaskRegistry } from "@/lib/workflow/task/registry"
import { TaskType } from "@/types/TaskType"


const TaskMenu = () => {
  return (
      <aside className='w-[250px] min-w-[250px] max-w-[250px] border-r-2 border-separate h-full p-1 px-4 overflow-auto'>
        <Accordion type="multiple" className="w-full" defaultValue={["extraction"]}>
            <AccordionItem value="extraction" >
                <AccordionTrigger className="font-bold">
                    Data extraction
                </AccordionTrigger>
                <AccordionContent className="flex flex-col gap-1">
                      <TaskMenuBtn taskType={TaskType.PAGE_TO_HTML}/>
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    </aside>
  )
}

const TaskMenuBtn = ({taskType}: {taskType: TaskType}) => {
    const task = TaskRegistry[taskType]

    const onDragStart = (event: React.DragEvent, type: TaskType) => {
        event.dataTransfer.setData("application/reactflow", type);
        event.dataTransfer.effectAllowed = "move";
    }

    return (
        <Button variant={"secondary"} className="flex items-center justify-center gap-2 border w-full" draggable onDragStart={event => onDragStart(event, taskType)}>
            <task.icon size={20} />
            {task.label}
        </Button>
    )
}

export default TaskMenu

