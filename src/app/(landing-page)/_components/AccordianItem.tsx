"use client"

import { ChevronDown } from "lucide-react"
import type React from "react"
import { useRef, useEffect, useState } from "react"

interface AccordionItemProps {
    faq: {
        id: number
        question: string
        answer: string
    }
    isOpen: boolean
    onToggle: () => void
}

export const AccordionItem: React.FC<AccordionItemProps> = ({ faq, isOpen, onToggle }) => {
    const contentRef = useRef<HTMLDivElement>(null)
    const [height, setHeight] = useState<number | undefined>(0)

    useEffect(() => {
        if (isOpen) {
            const contentEl = contentRef.current
            if (contentEl) {
                setHeight(contentEl.scrollHeight)
            }
        } else {
            setHeight(0)
        }
    }, [isOpen])

    return (
        <div className=" overflow-hidden">
            <button
                className="w-full text-left p-4 pl-12 pb-1 flex justify-between items-center"
                onClick={onToggle}
                aria-expanded={isOpen}
                aria-controls={`accordion-content-${faq.id}`}
            >
                <h2 className="font-bold dark:text-white text-neutral-800 font-mono">{faq.question}</h2>
                <ChevronDown
                    className={`text-xl font-bold text-rose-500 transition-transform duration-300 ${isOpen ? "transform rotate-180" : ""
                        }`}
                />
            </button>
            <div
                id={`accordion-content-${faq.id}`}
                ref={contentRef}
                className="overflow-hidden transition-all duration-300 ease-in-out"
                style={{ height: height ? `${height}px` : "0px" }}
            >
                <div className=" pl-12 pb-6 text-neutral-600">
                    <p className="text-sm font-medium text-neutral-700 dark:text-neutral-200 font-mono">{faq.answer}</p>
                </div>
            </div>
        </div>
    )
}

