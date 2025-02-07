"use client"

import ToolTipWrapper from '@/components/ToolTipWrapper'
import { Button } from '@/components/ui/button'
import { ChevronLeftIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React from 'react'
import SaveButton from './SaveButton'

interface Props {
  title: string;
  subtitle?: string;
  workflowId: string;
}

const Topbar = ({ title, subtitle, workflowId }: Props) => {
  const router = useRouter()
  return (
    <header className='border-b p-2  border-separate flex justify-between w-full h-[60px] sticky top-0 z-10'>
      <div className="flex gap-1 flex-1">
        <ToolTipWrapper content="Back">
          <Button variant={"ghost"} size={"icon"} onClick={() => router.back()}>
            <ChevronLeftIcon size={20} />
          </Button>
        </ToolTipWrapper>
        <div>
          <p className='text-ellipsis truncate font-bold'>{title}</p>
          {subtitle && (
            <p className='text-xs text-muted-foreground truncate text-ellipsis'>{subtitle}</p>
          )}
        </div>
      </div>
      <div>
        <div className="flex gap-1 flex-1 justify-end">
          <SaveButton workflowId={workflowId} />
        </div>
      </div>
    </header>
  )
}

export default Topbar