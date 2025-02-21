'use client'

import useExecutionPlan from "@/components/hooks/useExecutionPlan"
import { Button } from "@/components/ui/button"
import { PlayIcon } from "lucide-react"

const ExecuteButton = ({ workflowId }: { workflowId: string }) => {
    const generate = useExecutionPlan()
    return (
        <Button
            variant={'outline'}
            className="flex items-center gap-2"
            onClick={() => {
                const plan = generate();
                console.log("====Plan====");
                console.table(plan)
            }}
        >
            <PlayIcon size={16} className="stroke-rose-500" />
            Execute
        </Button>
    )
}

export default ExecuteButton