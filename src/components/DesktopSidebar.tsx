"use client"

import { CoinsIcon, HomeIcon, Layers2Icon, MenuIcon, ShieldCheckIcon } from "lucide-react"
import React, { useState } from "react"
import Logo from "./Logo"
import Link from "next/link"
import { Button, buttonVariants } from "@/components/ui/button"
import { usePathname } from "next/navigation"
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "./ui/sheet"

const routes = [
    {
        id: 0,
        href: "",
        label: "Home",
        icon: HomeIcon,
    },
    {
        id: 1,
        href: "workflows",
        label: "Workflows",
        icon: Layers2Icon,
    },
    {
        id: 2,
        href: "credentials",
        label: "Credentials",
        icon: ShieldCheckIcon,
    },
    {
        id: 3,
        href: "billing",
        label: "Billing",
        icon: CoinsIcon,
    },
]

export const DesktopSidebar = () => {
    const pathname = usePathname()
    const activeRoute = routes.find((route) => route.href.length > 0 && pathname.includes(route.href)) || routes[0]
    return (
        <div className="hidden relative md:block min-w-[200px] max-w-[240px] h-screen overflow-hidden w-full bg-primary/5 dark:bg-secondary/30 dark:text-foreground text-muted-foreground border-r border-separate">
            <div className="flex items-center justify-center gap-2 border-b border-separate p-2">
                <Logo />
            </div>
            <div className="flex flex-col p-2 mt-4 gap-2">
                {routes.map((route) => (
                    <Link
                        key={route.id}
                        href={`/dashboard/${route.href}`}
                        className={buttonVariants({
                            variant: activeRoute.href === route.href ? "sidebarItemActive" : "sidebarItem",
                        })}
                    >
                        <route.icon size={20} />
                        {route.label}
                    </Link>
                ))}
            </div>
        </div>
    )
}

export const MobileSidebar = () => {
    const [isOpen, setIsOpen] = useState(false)
    const pathName = usePathname()
    const activeRoute = routes.find((route) => route.href.length && pathName.includes(route.href)) || routes[0]

    return (
        <div className="block border-separate bg-background">
            <nav className="container flex items-center justify-between">
                <Sheet open={isOpen} onOpenChange={setIsOpen}>
                    <SheetTrigger className="md:hidden block" asChild>
                        <Button variant={"ghost"} size={"icon"}>
                            <MenuIcon />
                        </Button>
                    </SheetTrigger>
                    <SheetContent className="w-[300px] sm:w-[340px] space-y-4" side={"left"}>
                        <SheetTitle className="hidden">Are you absolutely sure?</SheetTitle>
                        <div className="mt-4">
                            <Logo />
                        </div>
                        <div className="flex flex-col gap-1">
                            {routes.map((route) => (
                                <Link
                                    key={route.id}
                                    href={`/dashboard/${route.href}`}
                                    className={buttonVariants({
                                        variant: activeRoute.href === route.href ? "sidebarItemActive" : "sidebarItem",
                                    })}
                                    onClick={() => setIsOpen(prev => !prev)}
                                >
                                    <route.icon size={20} />
                                    {route.label}
                                </Link>
                            ))}
                        </div>
                    </SheetContent>
                </Sheet>
            </nav>
        </div>
    )
}

