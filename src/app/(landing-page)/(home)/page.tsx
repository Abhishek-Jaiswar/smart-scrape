"use client"

import React from "react"
import Header from "../_components/Header"
import Hero from "../_components/Hero"
import Pricing from "../_components/Pricing"

const Home = () => {
    return (
        <main className="min-h-screen bg-gradient-to-b from-rose-50/80 to-white relative">
            <div className="absolute inset-0 grid-pattern"></div>
            <div className="relative z-10">
                <header>
                    <Header />
                </header>
                <section className="flex items-center justify-center mt-14">
                    <Hero />
                </section>
                <section>
                    <Pricing />
                </section>
            </div>
        </main>
    )
}

export default Home

