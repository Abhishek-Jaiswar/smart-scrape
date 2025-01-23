import React from 'react'
import { SiScratch } from 'react-icons/si'
import Link from 'next/link'
import HelpCenter from '../_components/HelpCenter'

const page = () => {
    const links = [
        {
            id: 1,
            path: "/",
            name: "Notifications",
        },
        {
            id: 2,
            path: "/",
            name: "Reviews & Ratings",
        },
        {
            id: 3,
            path: "/",
            name: "Feedbacks",
        },
    ]
    return (
        <div className='flex h-screen'>
            <div className='w-[15%] h-screen min-h-full border-r border-neutral-200'>
                <div className=' p-4'>
                    <Link href="/">
                        <div className=' flex items-center justify-center gap-1'>
                            <SiScratch className="text-5xl font-bold mt-2 text-rose-500" aria-hidden="true" />
                            <div className=' items-center'>
                                <h1 className='text-xl font-mono text-rose-400 font-bold'>SmartScrape </h1>
                                <span className='text-rose-600 text-xs font-medium px-2 py-1 bg-rose-100 border border-rose-500 rounded-md'>Help center</span>
                            </div>
                        </div>
                    </Link>
                </div>

                <div className='flex flex-col items-start px-10 mt-6 gap-6'>
                    <h1 className='text-neutral-900 font-medium font-mono -mx-4 '>General</h1>
                    {links.map((link) => (
                        <ul key={link.id} className=' '>
                            <Link href={link.path}>
                                <li className='font-medium text-neutral-500 text-sm hover:text-rose-500 transition-colors'>{link.name}</li>
                            </Link>
                        </ul>
                    ))}
                </div>
            </div>
            <div className='w-[85%] h-screen'>
                <HelpCenter />
            </div>
        </div>
    )
}

export default page