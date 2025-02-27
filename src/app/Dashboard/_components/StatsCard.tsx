import ReactCountUpWrapper from '@/components/ReactCountUpWrapper'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { LucideIcon } from 'lucide-react'
import React from 'react'

interface Props {
    title: string,
    value: number,
    icon: LucideIcon
}

const StatsCard = (props: Props) => {
    return (
        <Card className=' relative overflow-hidden h-full'>
            <CardHeader className='flex pb-2'>
                <CardTitle>{props.title}</CardTitle>
                <props.icon size={90} className='text-muted-foreground absolute -bottom-4 -right-6 stroke-primary opacity-10' />
            </CardHeader>
            <CardContent>
                <div className='text-xl font-bold text-primary'>
                    <ReactCountUpWrapper value={props.value} />
                </div>
            </CardContent>
        </Card>
    )
}

export default StatsCard