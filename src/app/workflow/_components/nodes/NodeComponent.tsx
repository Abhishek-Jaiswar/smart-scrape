import { NodeProps } from "@xyflow/react";
import { memo } from "react";
import NodeCard from "./NodeCard";
import NodeHeader from "./NodeHeader";
import { AppNodeData } from "@/types/appNode";
import { TaskRegistry } from "@/lib/workflow/task/registry";
import { NodeInput, NodeInputs } from "./NodeInputs";
import NodeOutputs, { NodeOutput } from "./NodeOutputs";

const NodeComponent = memo((props: NodeProps) => {
    const nodeData = props.data as AppNodeData;
    const task = TaskRegistry[nodeData.type]

    return (
        <NodeCard isSelected={!!props.selected} nodeId={props.id}>
            <NodeHeader taskType={nodeData.type} />
            <NodeInputs>
                {task.inputs.map((inps) => (
                    <NodeInput input={inps} key={inps.name} nodeId={props.id} />
                ))}
            </NodeInputs>
            <NodeOutputs>
                {task.outputs.map((outputs) => (
                    <NodeOutput output={outputs} key={outputs.name} />
                ))}
            </NodeOutputs>
        </NodeCard>
    )
})

export default NodeComponent;