import React from 'react';
import { Star, Globe, Bot, Database, Zap, Code2 } from 'lucide-react';
import { IoCheckmarkDoneSharp } from "react-icons/io5";

function Hero() {
    return (
        <div className="min-h-screen ">
            <div className="container mx-auto px-4">
                {/* Trust Indicators */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-7">
                    <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, idx) => (
                            <Star key={idx} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                        ))}
                    </div>
                    <div className="flex items-center gap-3">
                        <Globe className="w-8 h-8 text-rose-600" />
                        <p className="text-gray-700 font-mono font-semibold">
                            Trusted by 10,000+ companies worldwide
                        </p>
                    </div>
                </div>

                <div className="max-w-5xl mx-auto text-center">
                    <h1 className="text-4xl font-mono leading-loose md:text-6xl font-bold text-neutral-900 mb-8">
                        Intelligent Web Scraping with{' '}
                        <span className="inline-block px-4 py-2 bg-rose-50 border-2 border-rose-500 border-dashed rounded-lg text-rose-500">
                            SmartScrape
                        </span>
                    </h1>

                    <p className="text-xl font-mono text-gray-600 max-w-3xl mx-auto mb-8">
                        Transform web data into actionable insights with our advanced automation platform
                    </p>

                    <div className='pb-10'>
                        <ul className=' flex items-center justify-between font-mono'>
                            <li className='text-neutral-950 font-bold text-lg flex items-center justify-center gap-2'>
                                <IoCheckmarkDoneSharp className='text-3xl text-rose-500 font-bold' />
                                Web Scraping
                            </li>
                            <li className='text-neutral-950 font-bold text-lg flex items-center justify-center gap-2'>
                                <IoCheckmarkDoneSharp className='text-3xl text-rose-500 font-bold' />
                                Data Cleaning
                            </li>
                            <li className='text-neutral-950 font-bold text-lg flex items-center justify-center gap-2'>
                                <IoCheckmarkDoneSharp className='text-3xl text-rose-500 font-bold' />
                                Data Delivery
                            </li>
                            <li className='text-neutral-950 font-bold text-lg flex items-center justify-center gap-2'>
                                <IoCheckmarkDoneSharp className='text-3xl text-rose-500 font-bold' />
                                Custom Storage
                            </li>
                        </ul>
                    </div>

                    {/* Feature Highlights */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                            <Bot className="w-10 h-10 text-blue-500 mx-auto mb-4" />
                            <h3 className="font-semibold mb-2">AI-Powered Extraction</h3>
                            <p className="text-gray-600">Smart pattern recognition for accurate data collection</p>
                        </div>
                        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                            <Zap className="w-10 h-10 text-blue-500 mx-auto mb-4" />
                            <h3 className="font-semibold mb-2">Real-time Processing</h3>
                            <p className="text-gray-600">Lightning-fast data extraction and processing</p>
                        </div>
                        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                            <Database className="w-10 h-10 text-blue-500 mx-auto mb-4" />
                            <h3 className="font-semibold mb-2">Structured Output</h3>
                            <p className="text-gray-600">Clean, organized data in your preferred format</p>
                        </div>
                    </div>

                    {/* CTA Section */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                        <button className="px-8 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                            Start Scraping Free
                        </button>
                        <button className="px-8 py-3 bg-white text-blue-600 rounded-lg font-semibold border border-blue-200 hover:border-blue-300 transition-colors flex items-center gap-2">
                            <Code2 className="w-5 h-5" />
                            View Documentation
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Hero;