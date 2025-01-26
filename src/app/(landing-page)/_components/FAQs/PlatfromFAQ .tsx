import React from 'react'
import Accordian from '../Accordian'
import { BiSolidDashboard } from 'react-icons/bi'

interface FAQProp {
    id: number
    question: string
    answer: string
}

const PlatfromFAQ = () => {
    const FaqPlatform: FAQProp[] = [
        {
            id: 1,
            question: "What is SmartScrape?",
            answer: "SmartScrape is an intuitive web scraping tool that allows you to collect data from websites without needing to code. With our drag-and-drop flow builder, you can create custom scraping workflows and automate data collection quickly and easily."
        },
        {
            id: 2,
            question: "How does the token-based usage system work?",
            answer: "Our token-based system lets you pay for only what you use. Each token represents a specific action or resource, ensuring cost-effective and transparent usage."
        },
        {
            id: 3,
            question: "Is SmartScrape scalable for large projects?",
            answer: "Yes, SmartScrape is designed to handle projects of all sizes, from small data collection tasks to large-scale enterprise scraping jobs."
        },
        {
            id: 4,
            question: "Does SmartScrape provide anti-bot protection?",
            answer: "Absolutely! SmartScrape includes automatic anti-bot protection to ensure your scraping activities remain undetected and uninterrupted."
        },
        {
            id: 5,
            question: "Can I customize workflows for my specific needs?",
            answer: "Yes, SmartScrape offers a highly flexible flow builder that allows you to create, modify, and customize workflows tailored to your unique requirements."
        }
    ];
    return (

        <div>
            <div className='flex items-center gap-3 '>
                <BiSolidDashboard className='text-4xl text-rose-500' />
                <h1 className='text-xl text-neutral-900 dark:text-white font-bold font-mono'>General platform questions</h1>
            </div>
            <Accordian faq={FaqPlatform} />
        </div>
    )
}

export default PlatfromFAQ