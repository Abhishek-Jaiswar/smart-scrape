"use client"

import Link from "next/link"
import { SiScratch } from "react-icons/si"
import { useState } from "react"
import { Menu, X } from "lucide-react"
import { useAuth, UserButton } from "@clerk/nextjs"

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const { isSignedIn } = useAuth();

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen)

    return (
        <section className="container mx-auto px-4 py-6">
            <div className=" max-w-7xl mx-auto flex items-center justify-between">
                <div className="flex items-center gap-1">
                    <SiScratch className="text-4xl font-bold text-rose-500" aria-hidden="true" />
                    <span className="text-xl tracking-wider text-neutral-950 font-bold font-mono">SMARTSCRAPE</span>
                </div>

                <nav className="hidden md:block">
                    <ul className="flex items-center justify-center gap-10">
                        {["Services", "Pricing", "Docs", "Feedback"].map((item) => (
                            <li key={item}>
                                <Link
                                    href={`/${item.toLowerCase()}`}
                                    className="text-neutral-950 font-medium hover:text-rose-500 transition-colors"
                                >
                                    {item}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>

                <div className="hidden md:flex items-center gap-5">
                    {isSignedIn ? (
                        <div className="flex items-center justify-center gap-7">
                            <Link
                                href="/dashboard"
                                className="px-3 py-1.5 bg-rose-500 rounded-md font-medium text-white hover:bg-rose-400 transition-colors"
                            >
                                Dashboard
                            </Link>
                            <div className="flex items-center justify-center">
                                <UserButton />
                            </div>
                        </div>
                    ) : (
                        <>
                            <Link href="/sign-in" className="text-neutral-950 font-medium hover:text-rose-500 transition-colors">
                                Sign in
                            </Link>
                            <Link
                                href="/sign-up"
                                className="px-3 py-1.5 bg-rose-500 rounded-md font-medium text-white hover:bg-rose-400 transition-colors"
                            >
                                Create free account
                            </Link>
                        </>
                    )}
                </div>

                <button className="md:hidden" onClick={toggleMenu} aria-label="Toggle menu">
                    {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                </button>
            </div >

            {isMenuOpen && (
                <nav className="mt-4 md:hidden">
                    <ul className="flex flex-col gap-4">
                        {["Services", "Pricing", "Docs", "Feedback"].map((item) => (
                            <li key={item}>
                                <Link
                                    href={`/${item.toLowerCase()}`}
                                    className="text-neutral-950 font-medium hover:text-rose-500 transition-colors block"
                                >
                                    {item}
                                </Link>
                            </li>
                        ))}
                        <li>
                            <Link
                                href="/sign-in"
                                className="text-neutral-950 font-medium hover:text-rose-500 transition-colors block"
                            >
                                Sign in
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/sign-up"
                                className="px-3 py-1.5 bg-rose-500 rounded-md font-medium text-white hover:bg-rose-400 transition-colors inline-block"
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

