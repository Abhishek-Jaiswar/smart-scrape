import { TaskParam, TaskParamsType } from '@/types/TaskType'
import React, { useCallback } from 'react'
import StringParam from './param/StringParam'
import { useReactFlow } from '@xyflow/react'
import { AppNode } from '@/types/appNode'
import BrowserInstanceParam from './BrowserInstanceParam'

const NodeParamField = ({ param, nodeId }: { param: TaskParam, nodeId: string }) => {
    const { updateNodeData, getNode } = useReactFlow();
    const node = getNode(nodeId) as AppNode;
    const value = node?.data.inputs?.[param.name];

    const updateNodeParamValue = useCallback((newValue: string) => {
        updateNodeData(nodeId, {
            inputs: {
                ...node?.data.inputs,
                [param.name]: newValue
            }
        })
    }, [nodeId, updateNodeData, param.name, node?.data.inputs])

    switch (param.type) {
        case TaskParamsType.STRING:
            return (
                <StringParam
                    param={param}
                    value={value}
                    updateNodeParamValue={updateNodeParamValue}
                />
            );

        case TaskParamsType.BROWSER_INSTANCE:
            return (
                <BrowserInstanceParam
                    param={param}
                    value={""}
                    updateNodeParamValue={updateNodeParamValue}
                />
            );

        default:
            return (
                <div className='w-full'>
                    <p className='text-xs text-muted-foreground'>Not implemented</p>
                </div>
            )
    }
}

export default NodeParamField