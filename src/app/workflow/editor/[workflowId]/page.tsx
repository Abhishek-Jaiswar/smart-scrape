import prisma from '@/lib/prisma';
import { auth } from '@clerk/nextjs/server';
import React from 'react'

const page = async ({ params }: { params: { workflowId: string } }) => {
    const { workflowId } = params;
    const { userId } = await auth();

    if (!userId) {
        return <div>Unauthenticated</div>
    }

    const workflow = await prisma.workflow.findUnique({
        where: {
            id: workflowId,
            userId,
        }
    })

    return (
        <pre>{JSON.stringify(workflow, null, 4)}</pre>
    )


}

export default page