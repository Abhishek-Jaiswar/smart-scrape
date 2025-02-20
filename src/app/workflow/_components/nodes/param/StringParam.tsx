'use client'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { ParamProps } from '@/types/appNode'
import React, { useEffect, useId, useState } from 'react'


const StringParam = ({ param, value, updateNodeParamValue, disabled }: ParamProps) => {
    const id = useId();
    const [internalValue, setInternalValue] = useState(value);
    
    useEffect(() => {
        setInternalValue(internalValue);
    }, [value]);

    let Component: any = Input;
    if (param.variant === "textarea") {
        Component = Textarea
    }

    return (
        <div className=' space-y-1 p-1 w-full'>
            <Label htmlFor={id} className='text-xs flex'>
                {param.name}
                {param.required && <p className='text-rose-500 px-2'>*</p>}
            </Label>
            <Component
                id={id}
                disabled={disabled}
                className=' text-xs border border-muted-foreground bg-white'
                placeholder='Enter value here...'
                value={internalValue}
                onChange={(e: any) => setInternalValue(e.target.value)}
                onBlur={() => updateNodeParamValue(internalValue)}
            />
            {param.helperText && (
                <p className='text-muted-foreground px-2'>{param.helperText}</p>
            )}
        </div>
    );
};


export default StringParam