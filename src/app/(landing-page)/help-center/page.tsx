import React from 'react'
import HelpCenter from '../_components/HelpCenter'
import Logo from '@/components/Logo'
import { ModeToggle } from '@/components/ThemeModeToggle'

const page = () => {
    return (
        <div className='flex h-screen flex-col'>
            <header className='px-8 py-3 border-b-2 flex justify-between'>
                <Logo />
                <ModeToggle variant="outline" />
            </header>
            <div>
                <p className='text-sm text-rose-500 py-2 font-medium text-center'>Help center feature is currently not available, this is under developmet</p>
            </div>
            <div className='w-[85%] mx-auto h-screen mt-5'>
                <HelpCenter />
            </div>
        </div>
    )
}

export default page