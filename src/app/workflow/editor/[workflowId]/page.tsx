import prisma from "@/lib/prisma"
import { auth } from "@clerk/nextjs/server"
import { Suspense } from "react"
import Editor from "../../_components/Editor"

interface PageProps {
    params: {
        workflowId: string
    }
}

async function WorkflowEditorContent({ workflowId }: { workflowId: string }) {
    const { userId } = await auth()

    if (!userId) {
        return <div>Unauthenticated</div>
    }

    const workflow = await prisma.workflow.findUnique({
        where: {
            id: workflowId,
            userId,
        },
    })

    if (!workflow) {
        return <div>Workflow not found</div>
    }

    return <Editor workflow={workflow} />
}

export default async function Page({ params }: PageProps) {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <WorkflowEditorContent workflowId={params.workflowId} />
        </Suspense>
    )
}

