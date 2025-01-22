import React from 'react';
import { Star, Globe } from 'lucide-react';
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
                </div>
            </div>
        </div>
    );
}

export default Hero;