"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react'

const BreadcrumbHeader = () => {
    const pathName = usePathname();
    const paths = pathName === "/" ? [""] : pathName.split("/");
    return (
        <div className='flex items-center'>
            <div className=' flex gap-1'>
                {paths.map((path, index) => (
                    <Link key={index} href={path} className='flex items-center  text-sm font-medium font-sans text-neutral-700 dark:text-neutral-300'>
                        {path === "dashboard" ? "Home /" : path}
                    </Link>
                ))}
            </div>
        </div>
    )
}

export default BreadcrumbHeader
