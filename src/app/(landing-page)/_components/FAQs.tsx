import React from "react"
import PlatformFAQ from "./FAQs/PlatfromFAQ "
import PricingFAQ from "./FAQs/PricingFAQ"
import FeaturesFAQ from "./FAQs/FeaturesFAQ"
import Tabs from "./Tabs"

const FAQs = () => {
    const tabs = [
        {
            id: "platform",
            title: "Platform",
            element: <PlatformFAQ />,
        },
        {
            id: "pricing",
            title: "Pricing",
            element: <PricingFAQ />,
        },
        {
            id: "features",
            title: "Features",
            element: <FeaturesFAQ />,
        },
    ]

    return (
        <div className="flex flex-col justify-center min-h-screen max-w-6xl mx-auto">
            <div className="flex flex-col items-center mb-12">
                <h1 className="text-6xl font-mono font-bold text-rose-500">FAQ</h1>
                <p className="pt-3 text-neutral-500 text-xl font-mono">Your questions answered are here.</p>
            </div>
            <Tabs tabs={tabs} defaultTabs="platform" />

        </div>
    )
}

export default FAQs

