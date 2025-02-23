"use client"

import { CreateFlowNode } from "@/lib/workflow/createFlowNode"
import { TaskType } from "@/types/task"
import { workflow as PrismaWorkflow } from "@prisma/client"
import { addEdge, Background, BackgroundVariant, Connection, Controls, Edge, getOutgoers, ReactFlow, useEdgesState, useNodesState, useReactFlow } from "@xyflow/react"

import '@xyflow/react/dist/style.css'
import NodeComponent from "./nodes/NodeComponent"
import React, { useCallback, useEffect } from "react"
import { AppNode } from "@/types/appNode"
import DeletableEdge from "./edges/DeletableEdge"
import { TaskRegistry } from "@/lib/workflow/task/registry"

const nodeTypes = {
    SmartScrapeNode: NodeComponent
}

const edgeTypes = {
    default: DeletableEdge,

}

const FlowEditor = ({ workflow }: { workflow: PrismaWorkflow }) => {
    const [nodes, setNodes, onNodesChange] = useNodesState<AppNode>([])
    const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([])

    const { setViewport, screenToFlowPosition, updateNodeData } = useReactFlow();


    useEffect(() => {
        try {
            const flow = JSON.parse(workflow.definition);

            if (!flow) return;
            setNodes(flow.nodes || []);
            setEdges(flow.edges || []);

            if (!flow.viewport) return;
            const { x = 0, y = 0, zoom = 1 } = flow.viewport
            setViewport({ x, y, zoom })
        } catch (error) {
            console.log("error in flow editor");
        }
    }, [workflow.definition, setEdges, setNodes, setViewport])

    const snapGrid: [number, number] = [50, 50];
    const fitViewOptions = { padding: 4 }

    const onDragOver = useCallback((event: React.DragEvent) => {
        event.preventDefault()
        event.dataTransfer.dropEffect = "move";
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
        setNodes((nds) => nds.concat(newNode))
    }, [screenToFlowPosition, setNodes])

    const onConnect = useCallback((connection: Connection) => {
        setEdges(eds => addEdge({ ...connection, type: "default", animated: true }, eds));

        if (!connection.targetHandle) return;

        const node = nodes.find((nd) => nd.id === connection.target);

        if (!node) return;
        const nodeInputs = node.data.inputs;
        updateNodeData(node?.id, {
            inputs: {
                ...nodeInputs,
                [connection.targetHandle]: ""
            },
        })


    }, [setEdges, updateNodeData, nodes]);

    const isValidConnection = useCallback((connection: Edge | Connection) => {
        //No self connection
        if (connection.source === connection.target) {
            return false
        }

        // Same taskParam type connection
        const source = nodes.find((node) => node.id === connection.source);
        const target = nodes.find((node) => node.id === connection.target);

        if (!source || !target) {
            console.error("Invalid connection: source or target node not found");
            // toast.error("Invalid connection: source or target node not found", { id: "invalid-connection" })
            return false
        }

        const sourceTask = TaskRegistry[source.data.type];
        const targetTask = TaskRegistry[target.data.type];

        const output = sourceTask.outputs.find((out) => out.name === connection.sourceHandle);
        const input = targetTask.inputs.find((inp) => inp.name === connection.targetHandle);

        if (input?.type !== output?.type) {
            console.error("Invalid connection: type mismatch");
            return false
        }

        const hashCycle = (node: AppNode, visited = new Set()) => {
            if (visited.has(node.id)) return false;
            visited.add(node.id)

            for (const outgoer of getOutgoers(node, nodes, edges)) {
                if (outgoer.id === connection.source) return true;
                if (hashCycle(outgoer, visited)) return true;
            }
        }

        const detectedCycle = hashCycle(target)
        return !detectedCycle;
    }, [nodes, edges])

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
                isValidConnection={isValidConnection}
            >
                <Controls position="top-left" className=" text-black" fitViewOptions={fitViewOptions} />
                <Background variant={BackgroundVariant.Dots} size={1} />
            </ReactFlow>
        </main>
    )
}

export default FlowEditor
