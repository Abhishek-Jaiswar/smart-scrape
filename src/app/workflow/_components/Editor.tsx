import { workflow } from '@prisma/client'
import React from 'react'
import { ReactFlowProvider } from '@xyflow/react'
import FlowEditor from './FlowEditor'

const Editor = ({ workflow }: { workflow: workflow }) => {
    return (
        <ReactFlowProvider>
            <div className='flex items-center flex-col h-full w-full overflow-hidden'>
                <section className='h-screen w-screen overflow-auto'>
                    <FlowEditor workflow={workflow} />
                </section>
            </div>
        </ReactFlowProvider>
    )
}

export default Editor