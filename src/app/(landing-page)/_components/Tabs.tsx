"use client";

import type React from "react";
import { useState } from "react";

interface Tab {
    id: string;
    title: string;
    element: React.ReactNode;
}

interface TabsProps {
    tabs: Tab[];
    defaultTabs?: string;
}

const Tabs: React.FC<TabsProps> = ({ tabs, defaultTabs }) => {
    const [activeTab, setActiveTab] = useState(defaultTabs || tabs[0].id);

    return (
        <div className="w-full">
            {/* Tab Headers */}
            <div className="flex space-x-4 border-b border-gray-200">
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        className={`py-2 px-4 font-mono text-sm font-medium transition-colors ${activeTab === tab.id
                                ? "border-b-2 border-rose-500 text-rose-500 dark:text-rose-400"
                                : "text-neutral-600 dark:text-neutral-400 hover:text-rose-500 dark:hover:text-rose-400"
                            }`}
                        onClick={() => setActiveTab(tab.id)}
                    >
                        {tab.title}
                    </button>
                ))}
            </div>

            {/* Tab Content */}
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
    );
};

export default Tabs;
