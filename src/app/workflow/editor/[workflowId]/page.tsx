import prisma from '@/lib/prisma';
import { auth } from '@clerk/nextjs/server';
import React from 'react';
import Editor from '../../_components/Editor';

interface PageProps {
    params: Awaited<{ workflowId: string }>; // Ensures it's not a Promise
}

async function Page({ params }: PageProps) {
    const workflowId = params.workflowId; // No need for await

    const authResult = await auth();
    const userId = authResult?.userId;

    if (!userId) {
        return <div>Unauthenticated</div>;
    }

    const workflow = await prisma.workflow.findUnique({
        where: {
            id: workflowId,
            userId,
        }
    });

    if (!workflow) {
        return <div>Workflow not found</div>;
    }

    return <Editor workflow={workflow} />;
}

export default Page;
