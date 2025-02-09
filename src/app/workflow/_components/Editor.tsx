import { workflow } from '@prisma/client'
import React from 'react'
import { ReactFlowProvider } from '@xyflow/react'
import FlowEditor from './FlowEditor'
import Topbar from './nodes/topbar/Topbar'
import TaskMenu from './TaskMenu'

const Editor = ({ workflow }: { workflow: workflow }) => {
    return (
        <ReactFlowProvider>
            <div className='flex items-center flex-col h-full w-full overflow-hidden'>
                <Topbar title="Workflow editor" workflowId={workflow.id} subtitle={workflow.name} />
                <section className='h-screen w-screen overflow-auto flex'>
                    <TaskMenu />
                    <FlowEditor workflow={workflow} />
                </section>
            </div>
        </ReactFlowProvider>
    )
}

export default Editor