"use client"

import useFlowValidation from '@/components/hooks/useFlowValidation'
import { cn } from '@/lib/utils'
import { useReactFlow } from '@xyflow/react'
import React, { ReactNode } from 'react'

const NodeCard = ({
    children,
    nodeId,
    isSelected
}: {
    children: ReactNode,
    nodeId: string,
    isSelected: boolean
}) => {
    const { getNode, setCenter } = useReactFlow()
    const { invalidInputs } = useFlowValidation();

    const hasInvalidInput = invalidInputs.some((node) => node.nodeId === nodeId)
    return (
        <div
            onDoubleClick={() => {
                const node = getNode(nodeId);
                if (!node) return;
                const { position, measured } = node;
                if (!position || !measured) return;
                const { width, height } = measured;
                const x = position.x + width! / 2;
                const y = position.y + height! / 2

                if (x === undefined || y === undefined) return;

                setCenter(x, y, {
                    zoom: 1,
                    duration: 500
                })

            }}
            className={cn('rounded-md cursor-pointer bg-background border-2 border-separate w-[440px] text-xs gap-1 flex flex-col flex-1', isSelected && "border-primary", hasInvalidInput && "border-destructive border-2")}

        >{children}</div>
    )
}

export default NodeCard