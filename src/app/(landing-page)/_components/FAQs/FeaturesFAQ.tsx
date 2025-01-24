import React from 'react'
import Accordian from '../Accordian';
import { FaEarlybirds } from 'react-icons/fa';

type FAQ = {
  id: number;
  question: string;
  answer: string;
};

const faqs: FAQ[] = [
  {
    id: 1,
    question: "What makes the flow builder intuitive?",
    answer: "Our flow builder features a drag-and-drop interface, pre-built templates, and visual cues to simplify workflow creation.",
  },
  {
    id: 2,
    question: "How does the token-based usage system benefit me?",
    answer: "The token-based system ensures you only pay for the features you use, offering a cost-effective and flexible pricing model.",
  },
  {
    id: 3,
    question: "Is the platform scalable for large projects?",
    answer: "Yes, the platform is designed to seamlessly scale from small tasks to enterprise-level projects without performance issues.",
  },
  {
    id: 4,
    question: "How does the anti-bot protection work?",
    answer: "Our system uses advanced algorithms to detect and block bot activities, ensuring secure and uninterrupted usage.",
  },
  {
    id: 5,
    question: "Can I customize workflows to suit my needs?",
    answer: "Absolutely! The platform allows you to create and modify workflows to meet your unique requirements with ease.",
  },
];

const FeaturesFAQ = () => {
  return (
    <div>
      <div className='flex items-center gap-3'>
        <FaEarlybirds className='text-4xl text-rose-500' />
        <h1 className='text-xl text-neutral-900 font-bold font-mono'>General platform questions</h1>
      </div>
      <Accordian faq={faqs} />
    </div>
  )
}

export default FeaturesFAQ