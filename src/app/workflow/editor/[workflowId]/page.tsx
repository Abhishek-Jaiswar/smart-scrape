import prisma from '@/lib/prisma';
import { auth } from '@clerk/nextjs/server';
import React from 'react';
import Editor from '../../_components/Editor';

type PageProps = {
    params: {
        workflowId: string
    }
}

async function Page({ params }: PageProps) {
    const { userId } = await auth()

    if (!userId) {
        return <div>Unauthenticated</div>;
    }

    const workflow = await prisma.workflow.findUnique({
        where: {
            id: params.workflowId,
            userId,
        }
    });

    if (!workflow) {
        return <div>Workflow not found</div>;
    }

    return <Editor workflow={workflow} />;
};

export default Page;
