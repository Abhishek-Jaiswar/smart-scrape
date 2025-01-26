import React from 'react'
import DesktopSidebar from '@/components/DesktopSidebar'
import BreadcrumbHeader from '@/components/BreadcrumbHeader'
import { ModeToggle } from '@/components/ThemeModeToggle'
const layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className='flex h-screen'>
            <DesktopSidebar />
            <div className='flex flex-col flex-1 min-h-screen'>
                <header className='flex items-center justify-between px-6 py-6 h-[52px] container'>
                    <BreadcrumbHeader />
                    <div className=''>
                        <ModeToggle />
                    </div>
                </header>
                <hr />
                <div className='overflow-auto'>
                    <div className="flex-1 container py-4 text-accent-foreground">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default layout