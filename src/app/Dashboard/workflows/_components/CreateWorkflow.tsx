"use client"

import { Button } from '@/components/ui/button'
import { Layers2Icon } from 'lucide-react'
import { useState } from 'react'
import CustomHeader from './CustomHeader'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { DialogTrigger } from '@radix-ui/react-dialog'

const CreateWorkflow = ({triggerText}: {triggerText?: string}) => {
    const [open, setOpen] = useState(false)
  return (
    <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
            <Button>
                  {triggerText ?? "Create workflow"} 
            </Button>
        </DialogTrigger>
        <DialogContent className='px-0'>
            <CustomHeader
                icon={Layers2Icon}
                title="Create workflow"
                subTitle="Start building your workflow"
            />
        </DialogContent>
    </Dialog>
  )
}

export default CreateWorkflow

