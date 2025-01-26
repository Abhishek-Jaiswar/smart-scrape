import React from 'react';
import { Star, Globe } from 'lucide-react';
import { IoCheckmarkDoneSharp } from "react-icons/io5";

function Hero() {
    return (
        <div className="min-h-screen  dark:bg-transparent">
            <div className="container mx-auto px-4">
                {/* Trust Indicators */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-7">
                    <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, idx) => (
                            <Star key={idx} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                        ))}
                    </div>
                    <div className="flex items-center gap-3 text-center sm:text-left">
                        <Globe className="w-8 h-8 text-rose-600" />
                        <p className="text-gray-700 dark:text-gray-300 font-mono font-semibold">
                            Trusted by 10,000+ companies worldwide
                        </p>
                    </div>
                </div>

                {/* Hero Section */}
                <div className="max-w-5xl mx-auto text-center">
                    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-mono leading-relaxed md:leading-loose font-bold text-neutral-900 dark:text-white mb-8">
                        Intelligent Web Scraping with{' '}
                        <span className="inline-block px-4 py-2 bg-rose-50 dark:bg-rose-900 border-2 border-rose-500 border-dashed rounded-lg text-rose-500 dark:text-rose-300">
                            SmartScrape
                        </span>
                    </h1>

                    <p className="text-lg sm:text-xl font-mono text-gray-600 dark:text-gray-400 max-w-3xl mx-auto mb-8">
                        Transform web data into actionable insights with our advanced automation platform
                    </p>

                    {/* Features */}
                    <div className="pb-10">
                        <ul className="grid grid-cols-2 sm:grid-cols-4 gap-4 font-mono">
                            <li className="text-neutral-950 dark:text-gray-200 font-bold text-lg flex items-center justify-center gap-2">
                                <IoCheckmarkDoneSharp className="text-3xl text-rose-500 font-bold" />
                                Web Scraping
                            </li>
                            <li className="text-neutral-950 dark:text-gray-200 font-bold text-lg flex items-center justify-center gap-2">
                                <IoCheckmarkDoneSharp className="text-3xl text-rose-500 font-bold" />
                                Data Cleaning
                            </li>
                            <li className="text-neutral-950 dark:text-gray-200 font-bold text-lg flex items-center justify-center gap-2">
                                <IoCheckmarkDoneSharp className="text-3xl text-rose-500 font-bold" />
                                Data Delivery
                            </li>
                            <li className="text-neutral-950 dark:text-gray-200 font-bold text-lg flex items-center justify-center gap-2">
                                <IoCheckmarkDoneSharp className="text-3xl text-rose-500 font-bold" />
                                Custom Storage
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Hero;
