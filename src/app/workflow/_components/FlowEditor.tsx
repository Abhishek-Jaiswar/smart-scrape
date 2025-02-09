"use client"

import { CreateFlowNode } from "@/lib/workflow/createFlowNode"
import { TaskType } from "@/types/TaskType"
import { workflow as PrismaWorkflow } from "@prisma/client"
import { addEdge, Background, BackgroundVariant, Connection, Controls, Edge, ReactFlow, useEdgesState, useNodesState, useReactFlow } from "@xyflow/react"

import '@xyflow/react/dist/style.css'
import NodeComponent from "./nodes/NodeComponent"
import { useCallback, useEffect } from "react"
import { AppNode } from "@/types/appNode"
import DeletableEdge from "./edges/DeletableEdge"

const nodeTypes = {
    SmartScrapeNode: NodeComponent
}

const edgeTypes = {
    default: DeletableEdge
}

const FlowEditor = ({ workflow }: { workflow: PrismaWorkflow }) => {
    const [nodes, setNodes, onNodesChange] = useNodesState<AppNode>([])
    const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([])

    const { setViewport, screenToFlowPosition } = useReactFlow();


    useEffect(() => {
        try {
            const flow = JSON.parse(workflow.definition);
            console.log(flow);
            
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

    const onDragOver = useCallback((event: React.DragEvent) => {
        event.preventDefault()
        event.dataTransfer.effectAllowed = "move";
    }, [])

    const onDrop = useCallback((event: React.DragEvent) => {
        event.preventDefault();
        const taskType = event.dataTransfer.getData("application/reactflow")
        if (typeof taskType === undefined || !taskType) return;

        const position = screenToFlowPosition({
            x: event.clientX,
            y: event.clientY
        });

        const newNode = CreateFlowNode(taskType as TaskType, position)
        console.log(newNode);
        
        setNodes((nds) => nds.concat(newNode))
    }, [])

    const onConnect = useCallback((connection: Connection) => {
        setEdges(eds => addEdge({ ...connection, animated: true }, eds))
        console.log("@conn", connection);
        
    }, [])
    return (
        <main className=" w-full h-full">
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onEdgesChange={onEdgesChange}
                onNodesChange={onNodesChange}
                nodeTypes={nodeTypes}
                edgeTypes={edgeTypes}
                snapToGrid
                snapGrid={snapGrid}
                fitViewOptions={fitViewOptions}
                fitView
                onDragOver={onDragOver}
                onDrop={onDrop}
                onConnect={onConnect}
            >
                <Controls position="top-left" className=" text-black" fitViewOptions={fitViewOptions} />
                <Background variant={BackgroundVariant.Dots} size={1} />
            </ReactFlow>
        </main>
    )
}

export default FlowEditor
