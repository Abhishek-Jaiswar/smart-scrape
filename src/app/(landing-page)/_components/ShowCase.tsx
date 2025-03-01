"use client"

import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { ArrowUpRight, Sparkles } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useTheme } from 'next-themes'
import Link from 'next/link'

const ShowCase = () => {
    const [isVisible, setIsVisible] = useState(false)
    const [mounted, setMounted] = useState(false);
    const { theme } = useTheme()

    useEffect(() => {
        setIsVisible(true)
    }, [])


    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return (
        <section className="relative py-16 overflow-hidden">
            {/* <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-secondary/10 to-accent/5 dark:from-primary/10 dark:via-secondary/15 dark:to-accent/10" /> */}

            <div className="absolute bottom-20 left-10 w-64 h-64 bg-chart-1/20 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-20 right-10 w-72 h-72 bg-chart-1/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div
                    className="text-center mb-6 mt-4"
                >
                    <p className="dark:text-muted-foreground text-neutral-800 max-w-4xl font-bold  mx-auto text-2xl font-mono ">
                        Our intuitive dashboard gives you complete visibility into your metrics,
                        helping you make data-driven decisions with confidence.
                    </p>
                </div>
                <div
                    className="relative"
                >
                    <div className="absolute -top-3 left-7 bg-background/70 dark:bg-primary-foreground  shadow-lg rounded-full py-2 px-4 flex items-center space-x-2 z-50">
                        <Sparkles className="w-4 h-4 text-chart-1" />
                        <span className="text-xs font-medium dark:text-neutral-800 text-foreground">Premium Dashboard</span>
                    </div>

                    <div className="relative rounded-xl overflow-hidden shadow-2xl border border-border bg-card/80 backdrop-blur-sm">

                        <div className="absolute inset-0 bg-gradient-to-tr from-chart-1/10 via-chart-2/10 to-chart-3/10 opacity-80" />


                        <div className="relative p-2 md:p-4 overflow-hidden">
                            <div className={cn(
                                "rounded-lg overflow-hidden transition-all duration-700 ease-in-out",
                                "ring-1 ring-border/50 shadow-xl",
                                "group"
                            )}>
                                <Image
                                    src={theme === "dark" ? "/dashboard-dark.png" : "/dashboard-light.png"}
                                    alt="Dashboard interface"
                                    width={1920}
                                    height={1080}
                                    className={cn(
                                        "relative z-10 rounded-lg w-full h-auto",
                                        "transition-transform duration-700 ease-out",
                                        "group-hover:scale-[1.02]"
                                    )}
                                />


                                <div className="absolute inset-0 bg-gradient-to-t from-neutral-700/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-20" />
                            </div>
                        </div>


                        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-rose-400/30 to-transparent z-20" />
                    </div>


                    <div className="absolute -bottom-4 right-8 bg-card-foreground shadow-lg rounded-full py-2 px-4  z-30 hover:bg-primary/70 transition-colors duration-300 cursor-pointer group">
                        <Link href={'/dashboard'} className='flex items-center space-x-2'>
                            <span className="text-xs font-medium dark:text-neutral-800 group-hover:text-primary-foreground text-muted">Explore now</span>
                            <ArrowUpRight className="w-4 h-4 text-muted dark:text-neutral-800 group-hover:text-primary-foreground transition-colors duration-300" />
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default ShowCase