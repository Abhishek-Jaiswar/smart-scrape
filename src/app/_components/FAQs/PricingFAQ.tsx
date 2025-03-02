import React from "react";
import Accordian from "../Accordian";
import { GiPriceTag } from "react-icons/gi";

type FAQ = {
  id: number;
  question: string;
  answer: string;
};

const faqs: FAQ[] = [
  {
    id: 1,
    question: "What is included in the Free plan?",
    answer: "The Free plan includes basic features such as limited workflow creation, standard support, and up to 500 tokens per month.",
  },
  {
    id: 2,
    question: "How is pricing calculated for the Pro plan?",
    answer: "The Pro plan uses a token-based system where you pay only for the tokens you use. Additional features include priority support and advanced workflow tools.",
  },
  {
    id: 3,
    question: "Does the Enterprise plan offer unlimited usage?",
    answer: "Yes, the Enterprise plan provides unlimited token usage along with dedicated support, custom solutions, and enhanced security features.",
  },
  {
    id: 4,
    question: "Can I switch between plans at any time?",
    answer: "Yes, you can upgrade or downgrade your plan at any time based on your requirements.",
  },
  {
    id: 5,
    question: "Are there any discounts for annual billing?",
    answer: "Yes, we offer a 20% discount on all plans if you choose annual billing instead of monthly billing.",
  },
];

const PricingFAQ: React.FC = () => {
  return (
    <div>
      <div className='flex items-center gap-3 '>
        <GiPriceTag className='text-4xl text-rose-500' />
        <h1 className='text-xl text-neutral-900 dark:text-white font-bold font-mono'>Pricing related questions</h1>
      </div>
      <Accordian faq={faqs} />
    </div>
  );
};

export default PricingFAQ;
