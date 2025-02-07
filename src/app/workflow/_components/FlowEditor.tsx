"use client"

import { CreateFlowNode } from "@/lib/workflow/createFlowNode"
import { TaskType } from "@/types/TaskType"
import { workflow as PrismaWorkflow } from "@prisma/client"
import { Background, BackgroundVariant, Controls, ReactFlow, useEdgesState, useNodesState, useReactFlow } from "@xyflow/react"

import '@xyflow/react/dist/style.css'
import NodeComponent from "./nodes/NodeComponent"
import { useEffect } from "react"

const nodeTypes = {
    SmartScrapeNode: NodeComponent
}

const FlowEditor = ({ workflow }: { workflow: PrismaWorkflow }) => {
    const [nodes, setNodes, onNodesChange] = useNodesState([])
    const [edges, setEdges, onEdgesChange] = useEdgesState([])

    const { setViewport } = useReactFlow();


    useEffect(() => {
        try {
            const flow = JSON.parse(workflow.definition);
            if (!flow) return;
            setNodes(flow.nodes || []);
            setEdges(flow.nodes || [])

            if (!flow.viewport) return;
            const { x = 0, y = 0, zoom = 1 } = flow.viewport
            setViewport({ x, y, zoom })
        } catch (error) {

        }
    }, [workflow, setEdges, setNodes])

    const snapGrid: [number, number] = [50, 50];
    const fitViewOptions = { padding: 4 }

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
