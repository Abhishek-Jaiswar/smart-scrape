
import { cn } from '@/lib/utils'
import Link from 'next/link'
import React from 'react'
import { SiScratch } from 'react-icons/si'

const Logo = ({
    fontSize = 'text-2xl',
    // iconSize = 20
}: {
    fontSize?: string,
    iconSize?: number
}) => {
    return (
        <Link href='/' className={cn("text-2xl font-bold items-center gap-2", fontSize)}>
            <div className="flex items-center">
                <SiScratch className="text-4xl ml-1 font-bold text-rose-500" aria-hidden="true" />
                <span className="bg-gradient-to-r font-bold from-rose-500 to-rose-600 bg-clip-text text-transparent">Smart</span>
                <span className='text-neutral-900'>Scrape</span>
            </div>
        </Link>
    )
}

export default Logo