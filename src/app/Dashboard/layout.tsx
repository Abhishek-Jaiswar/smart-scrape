import React from 'react'
import { MobileSidebar, DesktopSidebar } from '@/components/DesktopSidebar'
import BreadcrumbHeader from '@/components/BreadcrumbHeader'
import { ModeToggle } from '@/components/ThemeModeToggle'

const layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className='flex h-screen'>
            <DesktopSidebar />
            <div className='flex flex-col flex-1 min-h-screen'>
                <header className=' h-[52px] container px-4 py-2'>
                    <MobileSidebar />
                    <div className=' flex items-center justify-between'>
                        <BreadcrumbHeader />
                        <ModeToggle />
                    </div>
                </header>
                <hr />
                <div className='overflow-auto'>
                    <div className="flex-1 container p-4 text-accent-foreground">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default layout