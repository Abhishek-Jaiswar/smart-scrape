import React, { useState } from 'react';
import { Box, Crown, Building2 } from 'lucide-react';

function Pricing() {
    const [billingCycle, setBillingCycle] = useState<'annual' | 'monthly'>('annual');

    const plans = [
        {
            name: 'Plus',
            icon: Box,
            price: billingCycle === 'annual' ? 29 : 34,
            description: 'For growing teams',
            features: [
                'Intuitive Flow Builder',
                'Token-based Usage System',
                'Scalable for Small to Large Jobs',
                'Automatic Anti-Bot Protection'
            ],
            ctaText: 'Upgrade to Plus',
            ctaColor: 'bg-rose-600 hover:bg-rose-700',
        },
        {
            name: 'Pro',
            icon: Crown,
            price: billingCycle === 'annual' ? 59 : 69,
            description: 'For scaling businesses',
            features: [
                'Advanced Workflow Tools',
                'Priority Token Access',
                'Optimized for Mid-Sized Jobs',
                'Enhanced Security Measures',
            ],
            ctaText: 'Upgrade to Pro',
            ctaColor: 'bg-rose-600 hover:bg-rose-700',
            popular: true,
        },
        {
            name: 'Enterprise',
            icon: Building2,
            price: billingCycle === 'annual' ? 119 : 139,
            description: 'For large-scale companies',
            features: [
                'Custom Workflow Solutions',
                'Unlimited Token Access',
                'Built for Enterprise Scale',
                'Dedicated Anti-Bot Shield',
            ],
            ctaText: 'Talk to sales',
            ctaColor: 'bg-rose-600 hover:bg-rose-700',
        },
    ];

    return (
        <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="text-center">
                    <h1 className="text-4xl font-mono font-bold text-neutral-900 dark:text-white mb-4">Pick a plan</h1>
                    <p className="text-xl font-mono text-gray-500 dark:text-gray-400 mb-8">
                        Choose the perfect plan for your needs
                    </p>

                    <div className="flex items-center justify-center space-x-4 mb-12">
                        <div className="relative inline-flex rounded-full p-1 bg-neutral-100 dark:bg-neutral-800">
                            <button
                                className={`px-4 py-2 font-mono rounded-full text-sm font-medium transition-colors ${billingCycle === 'annual'
                                        ? 'bg-white dark:bg-neutral-700 text-neutral-900 dark:text-white shadow-sm'
                                        : 'text-neutral-500 dark:text-gray-400'
                                    }`}
                                onClick={() => setBillingCycle('annual')}
                            >
                                Annual
                                <span className="ml-2 font-mono text-green-600 dark:text-green-400 font-semibold">-15%</span>
                            </button>
                            <button
                                className={`px-4 py-2 font-mono rounded-full text-sm font-medium transition-colors ${billingCycle === 'monthly'
                                        ? 'bg-white dark:bg-neutral-700 text-neutral-900 dark:text-white shadow-sm'
                                        : 'text-neutral-500 dark:text-gray-400'
                                    }`}
                                onClick={() => setBillingCycle('monthly')}
                            >
                                Monthly
                            </button>
                        </div>
                    </div>
                </div>

                <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                    {plans.map((plan) => (
                        <div
                            key={plan.name}
                            className={`relative rounded-2xl bg-white dark:bg-neutral-800 p-8 shadow-lg border ${plan.popular
                                    ? 'border-rose-200 ring-2 ring-rose-500 dark:border-rose-400'
                                    : 'border-gray-200 dark:border-neutral-700'
                                }`}
                        >
                            {plan.popular && (
                                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                                    <span className="bg-rose-600 text-white text-sm font-medium px-3 py-1 rounded-full">
                                        Most Popular
                                    </span>
                                </div>
                            )}

                            <div className="flex items-center justify-center h-12 w-12 rounded-xl bg-rose-100 dark:bg-rose-900 mb-4">
                                <plan.icon className="h-6 w-6 text-rose-600 dark:text-rose-400" />
                            </div>

                            <h2 className="text-2xl font-bold font-mono text-gray-900 dark:text-white mb-2">{plan.name}</h2>
                            <p className="text-gray-500 font-mono dark:text-gray-400 mb-6">{plan.description}</p>

                            <div className="mb-6">
                                <span className="text-4xl font-mono font-bold text-gray-900 dark:text-white">₹{plan.price}</span>
                                <span className="text-gray-500 font-mono dark:text-gray-400 ml-2">per user/month</span>
                                <p className="text-sm font-mono text-gray-500 dark:text-gray-400 mt-1">
                                    {billingCycle === 'annual' ? 'billed annually' : 'billed monthly'}
                                </p>
                            </div>

                            <button
                                className={`w-full font-mono ${plan.ctaColor} text-white rounded-lg py-3 px-4 font-medium transition-colors mb-6`}
                            >
                                {plan.ctaText}
                            </button>

                            <ul className="space-y-4">
                                {plan.features.map((feature) => (
                                    <li key={feature} className="flex items-center text-gray-600 dark:text-gray-400">
                                        <svg
                                            className="h-5 w-5 text-rose-600 dark:text-rose-400 mr-2"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M5 13l4 4L19 7"
                                            />
                                        </svg>
                                        {feature}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                <div className="text-center mt-12">
                    <a
                        href="#"
                        className="text-rose-600 dark:text-rose-400 hover:text-rose-700 dark:hover:text-rose-500 font-medium"
                    >
                        More details and all features
                    </a>
                </div>
            </div>
        </div>
    );
}

export default Pricing;
