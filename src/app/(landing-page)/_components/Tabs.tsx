"use client"

import type React from "react"
import { useState } from "react"

interface Tab {
    id: string
    title: string
    element: React.ReactNode
}

interface TabsProps {
    tabs: Tab[]
    defaultTabs?: string
}

const Tabs: React.FC<TabsProps> = ({ tabs, defaultTabs }) => {
    const [activeTab, setActiveTab] = useState(defaultTabs || tabs[0].id)

    return (
        <div className="w-full">
            <div className="flex space-x-4 border-b border-gray-200">
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        className={`py-2 px-4 font-mono text-sm text-neutral-800 font-medium transition-colors ${activeTab === tab.id ? "border-b-2 border-rose-500 text-rose-500" : "text-neutral-600 hover:text-rose-500"
                            }`}
                        onClick={() => setActiveTab(tab.id)}
                    >
                        {tab.title}
                    </button>
                ))}
            </div>
            <div className="mt-4">
                {tabs.map((tab) => (
                    <div
                        key={tab.id}
                        className={activeTab === tab.id ? "block" : "hidden"}
                        role="tabpanel"
                        aria-labelledby={`tab-${tab.id}`}
                    >
                        {tab.element}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Tabs

