"use client"

import ToolTipWrapper from '@/components/ToolTipWrapper'
import { Button } from '@/components/ui/button'
import { ChevronLeftIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React from 'react'
import SaveButton from './SaveButton'
import ExecuteButton from './ExecuteButton'
import NavigationTabs from './NavigationTabs'

interface Props {
  title: string;
  subtitle?: string;
  workflowId: string;
  hideButton?: boolean
}

const Topbar = ({ title, subtitle, workflowId, hideButton = false }: Props) => {
  const router = useRouter()
  return (
    <header className='border-b p-2 border-separate flex items-center justify-between w-full h-[60px] sticky top-0 z-10 bg-white'>
      <div className="flex gap-1 ">
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
      <NavigationTabs workflowId={workflowId} />
      <div>
        <div className="flex gap-1 flex-1 justify-end">
          {hideButton === false && (
            <>
              <SaveButton workflowId={workflowId} />
              <ExecuteButton workflowId={workflowId} />
            </>
          )}
        </div>
      </div>
    </header>
  )
}

export default Topbar