"use client"

import Link from "next/link"
import { useState } from "react"
import { Menu, X } from "lucide-react"
import { SignOutButton, useAuth } from "@clerk/nextjs"
import { ModeToggle } from "@/components/ThemeModeToggle"
import { Button } from "@/components/ui/button"
import Logo from "@/components/Logo"

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const { isSignedIn } = useAuth();

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen)

    return (
        <section className="container mx-auto px-4 py-6">
            <div className="max-w-7xl mx-auto flex items-center justify-between">
                <div className="flex items-center gap-1">
                    <Logo />
                </div>

                <nav className="hidden md:block">
                    <ul className="flex items-center justify-center gap-10">
                        <Link
                            href={"/docs"}
                            className="text-neutral-950 dark:text-neutral-50 font-medium hover:text-rose-500 dark:hover:text-rose-400 transition-colors"
                        >
                            Docs
                        </Link>
                        <Link
                            href={"/dashboard/billing"}
                            className="text-neutral-950 dark:text-neutral-50 font-medium hover:text-rose-500 dark:hover:text-rose-400 transition-colors"
                        >
                            Billing
                        </Link>
                        <Link
                            href={"/help-center"}
                            className="text-neutral-950 dark:text-neutral-50 font-medium hover:text-rose-500 dark:hover:text-rose-400 transition-colors"
                        >
                            Help center
                        </Link>
                    </ul>
                </nav>

                <div className="hidden md:flex items-center gap-5">
                    {isSignedIn ? (
                        <div className="flex items-center justify-center gap-7">
                            <ModeToggle variant="default" />
                            <Button
                                variant={"outline"}
                                className=" bg-primary text-white hover:bg-primary/90 hover:text-white "
                            >

                                <SignOutButton />
                            </Button>
                            <Link
                                href="/dashboard"
                            >
                                <Button
                                    variant={"outline"}
                                    className=" bg-primary text-white hover:bg-primary/90 hover:text-white "
                                >

                                    Dashboard
                                </Button>
                            </Link>

                            <div className="flex items-center justify-center">

                            </div>
                        </div>
                    ) : (
                        <>
                            <Button variant={'ghost'}>
                                <Link href="/sign-in">
                                    Sign in
                                </Link>
                            </Button>
                            <Button className="bg-primary">
                                <Link
                                    href="/sign-up"
                                >
                                    Create free account
                                </Link>
                            </Button>
                        </>
                    )}
                </div>

                <button className="md:hidden" onClick={toggleMenu} aria-label="Toggle menu">
                    {isMenuOpen ? <X className="h-6 w-6 text-neutral-950 dark:text-neutral-50" /> : <Menu className="h-6 w-6 text-neutral-950 dark:text-neutral-50" />}
                </button>
            </div >

            {isMenuOpen && (
                <nav className="mt-4 md:hidden">
                    <ul className="flex flex-col gap-4">
                        {["Services", "Pricing", "Docs", "Feedback"].map((item) => (
                            <li key={item}>
                                <Link
                                    href={`/${item.toLowerCase()}`}
                                    className="text-neutral-950 dark:text-neutral-50 font-medium hover:text-rose-500 dark:hover:text-rose-400 transition-colors block"
                                >
                                    {item}
                                </Link>
                            </li>
                        ))}
                        <li>
                            <Link
                                href="/sign-in"
                                className="text-neutral-950 dark:text-neutral-50 font-medium hover:text-rose-500 dark:hover:text-rose-400 transition-colors block"
                            >
                                Sign in
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/sign-up"
                                className="px-3 py-1.5 bg-rose-500 dark:bg-rose-400 rounded-md font-medium text-white hover:bg-rose-400 dark:hover:bg-rose-300 transition-colors inline-block"
                            >
                                Create free account
                            </Link>
                        </li>
                    </ul>
                </nav>
            )}
        </section >
    )
}

export default Header
