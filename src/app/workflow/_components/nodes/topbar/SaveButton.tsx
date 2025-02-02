"use client"

import { Button } from '@/components/ui/button'
import { CheckIcon } from 'lucide-react'
import React from 'react'

const SaveButton = () => {
  return (
    <Button variant={"outline"} 
    className='flex items-center gap-2'
    onClick={() => {
        alert("TODO")
    }}
    >
        <CheckIcon size={16} className=' stroke-rose-500' />
        Save
    </Button>
  )
}

export default SaveButton