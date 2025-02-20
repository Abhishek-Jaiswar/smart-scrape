import { cn } from '@/lib/utils'
import { TaskParam } from '@/types/task'
import { Handle, Position, useEdges } from '@xyflow/react'
import React, { ReactNode } from 'react'
import NodeParamField from './NodeParamField'
import { ColorForHandle } from './common'

export const NodeInputs = ({ children }: { children: ReactNode }) => {
    return (
        <div className='flex flex-col divide-y gap-2'>
            {children}
        </div>
    )
}

export const NodeInput = ({ input, nodeId }: { input: TaskParam, nodeId: string; }) => {
    const edges = useEdges();
    const isConnected = edges.some((edge) => edge.target === nodeId && edge.targetHandle === input.name);
    
    return (
        <div className='flex justify-start p-3 bg-secondary w-full relative'>
            <NodeParamField param={input} nodeId={nodeId} disabled={isConnected} />
            {!input.hideHandle && (
                <Handle
                    id={input.name}
                    isConnectable={!isConnected}
                    type='target'
                    position={Position.Left}
                    className={cn("!bg-muted-foreground !border !border-background !-left-2 !w-4 !h-4", ColorForHandle[input.type])}
                />
            )}
        </div>
    )
}