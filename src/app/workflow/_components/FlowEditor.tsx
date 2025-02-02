"use client"

import { CreateFlowNode } from "@/lib/workflow/createFlowNode"
import { TaskType } from "@/types/TaskType"
import { workflow as PrismaWorkflow } from "@prisma/client"
import { Background, BackgroundVariant, Controls, ReactFlow, useEdgesState, useNodesState } from "@xyflow/react"

import '@xyflow/react/dist/style.css'
import NodeComponent from "./nodes/NodeComponent"

const nodeTypes = {
    SmartScrapeNode: NodeComponent
}

const FlowEditor = ({ workflow }: { workflow: PrismaWorkflow }) => {
    const [nodes, setNodes, onNodesChange] = useNodesState([
        CreateFlowNode(TaskType.LAUNCH_BROWSER)
    ])
    const [edges, setEdges, onEdgesChange] = useEdgesState([])

    const snapGrid: [number, number] = [50, 50];
    const fitViewOptions = {padding: 4}

    return (
        <main className=" w-full h-full">
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onEdgesChange={onEdgesChange}
                onNodesChange={onNodesChange}
                nodeTypes={nodeTypes}
                snapToGrid={true}
                snapGrid={snapGrid}
                fitViewOptions={fitViewOptions}
                fitView
            >
                <Controls position="top-left" className=" text-black" fitViewOptions={fitViewOptions} />
                <Background variant={BackgroundVariant.Dots} size={1} />
            </ReactFlow>
        </main>
    )
}

export default FlowEditor
