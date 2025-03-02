"use client"

import type React from "react"
import { useState } from "react"
import { AccordionItem } from "./AccordianItem"

interface AccordionProps {
    id: number
    question: string
    answer: string
}

interface AccordionComponentProps {
    faq: AccordionProps[]
}

const Accordion: React.FC<AccordionComponentProps> = ({ faq }) => {
    const [openItemId, setOpenItemId] = useState<number | null>(null)

    const toggleItem = (id: number) => {
        setOpenItemId((prevId) => (prevId === id ? null : id))
    }

    return (
        <div className="">
            {faq.map((faq) => (
                <AccordionItem key={faq.id} faq={faq} isOpen={openItemId === faq.id} onToggle={() => toggleItem(faq.id)} />
            ))}
        </div>
    )
}

export default Accordion

