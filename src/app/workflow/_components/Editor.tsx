import { workflow } from '@prisma/client'
import React from 'react'
import { ReactFlowProvider } from '@xyflow/react'
import FlowEditor from './FlowEditor'
import Topbar from './topbar/Topbar'
import TaskMenu from './TaskMenu'
import { FlowValidationContextProvider } from '@/components/context/flowValidationContext'

const Editor = ({ workflow }: { workflow: workflow }) => {
    return (
        <FlowValidationContextProvider>
            <ReactFlowProvider>
                <div className='flex items-center flex-col h-full w-full overflow-hidden'>
                    <Topbar title="Workflow editor" workflowId={workflow.id} subtitle={workflow.name} />
                    <section className='h-screen w-screen overflow-auto flex'>
                        <TaskMenu />
                        <FlowEditor workflow={workflow} />
                    </section>
                </div>
            </ReactFlowProvider>
        </FlowValidationContextProvider>
    )
}

export default Editor