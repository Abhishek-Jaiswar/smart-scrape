"use client"

import { DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { cn } from "@/lib/utils"
import type { LucideIcon } from "lucide-react"
import React from "react"

interface CustomHeaderProps {
    icon?: LucideIcon
    title?: string
    subTitle?: string
    iconClassName?: string
    titleClassName?: string
    subtitleClassName?: string
}

const CustomHeader = (props: CustomHeaderProps) => {
    const Icon = props.icon
    return (
        <DialogHeader className="text-center px-4">
            <DialogTitle>
                <div className="flex items-start justify-start gap-2 mb-2">
                    {Icon && <Icon size={30} className={cn('stroke-primary', props.iconClassName)} />}
                    <div>
                        {props && (
                            <p className={cn('text-xl text-primary', props.titleClassName)}>{props.title}</p>
                        )}
                        {props && (
                            <p className={cn('text-sm text-muted-foreground', props.subtitleClassName)}>{props.subTitle}</p>
                        )}
                    </div>
                </div>
            </DialogTitle>
        </DialogHeader>
    )
}

export default CustomHeader

