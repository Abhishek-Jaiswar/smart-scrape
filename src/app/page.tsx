"use client"

import React from "react"
import Hero from "./_components/Hero"
import Header from "./_components/Header"
import ShowCase from "./_components/ShowCase"
import Features from "./_components/Features"
import Billing from "./_components/Billing"
import FAQs from "./_components/FAQs"
import Footer from "./_components/Footer"

const Home = () => {
    return (
        <main className="min-h-screen  relative ">
            <div className={`absolute inset-0 dark:bg-neutral-900 grid-pattern  `}></div>
            <div className="relative z-10">
                <header>
                    <Header />
                </header>
                <section className="flex items-center justify-center mt-14">
                    <Hero />
                </section>
                <section>
                    <ShowCase />
                </section>
                <section>
                    <Features />
                </section>
                <section>
                    <Billing />
                </section>
                <section className=" ">
                    <FAQs />
                </section>
                <section>
                    <Footer />
                </section>
            </div>
        </main>
    )
}

export default Home

