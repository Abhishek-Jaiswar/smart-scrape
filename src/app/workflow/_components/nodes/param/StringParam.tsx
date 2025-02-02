'use client'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ParamProps } from '@/types/appNode'
import React, { useId, useState } from 'react'


const StringParam = ({ param, value, updateNodeParamValue }: ParamProps) => {
    const id = useId()
    const [internalValue, setInernalvalue] = useState(value ?? "")
    return (
        <div className=' space-y-1 p-1 w-full'>
            <Label htmlFor={id} className='text-xs flex'>
                {param.name}
                {param.required && (
                    <p className='text-rose-500 px-2'>*</p>
                )}
            </Label>
            <Input
                id={id}
                className=' text-xs  border border-muted-foreground'
                placeholder='Enter value here...'
                value={internalValue}
                onChange={(e) => setInernalvalue(e.target.value)}
                onBlur={(e) => updateNodeParamValue(e.target.value)}
            />
            {param.helperText && (
                <p className='text-muted-foreground px-2'>{param.helperText}</p>
            )}
        </div>
    )
}

export default StringParam