import { Search } from 'lucide-react'
import React from 'react'

const HelpCenter = () => {
  return (
    <section className='p-8 flex justify-between'>
      <div className=' w-1/2'>
        <div className=''>
          <div className=''>
            <h1 className='text-4xl'>👋 <span className='text-4xl font-mono text-neutral-700 font-bold'>Welcome to help center</span></h1>
            <p className='text-left text-neutral-500 font-medium font-mono pl-16 mt-4'><span className='text-rose-500'>We are glad having you here looking for answer.</span> As our team hardly working on the product, feel free to ask any question, post your complaints, feedbacks and reviews. We believe only your feedback might move us forword</p>
          </div>
          <div className=' relative ml-16 mt-6'>
            <input
            type="text"
            placeholder='Search in help center'
            className='px-4 pl-10 py-2 border w-full'
             />
             <Search className='absolute inset-0 top-2 left-2 text-neutral-400' />
          </div>
        </div>
      </div>
      <div className='flex justify-center w-1/2'>
        <div className='p-4 border '>
          <h1 className='text-neutral-950 font-mono text-xl'>Where to Start?</h1>
          <ul className='mt-6 space-y-3'>
            <li className='text-sm font-medium font-mono text-neutral-600 hover:text-rose-500 underline cursor-pointer'>Account</li>
            <li className='text-sm font-medium font-mono text-neutral-600 hover:text-rose-500 underline cursor-pointer'>Billing</li>
            <li className='text-sm font-medium font-mono text-neutral-600 hover:text-rose-500 underline cursor-pointer'>Features</li>
            <li className='text-sm font-medium font-mono text-neutral-600 hover:text-rose-500 underline cursor-pointer'>Docs</li>
            <li className='text-sm font-medium font-mono text-neutral-600 hover:text-rose-500 underline cursor-pointer'>Feedback</li>
            <li className='text-sm font-medium font-mono text-neutral-600 hover:text-rose-500 underline cursor-pointer'>Changelogs</li>
          </ul>
        </div>
      </div>

    </section>
  )
}

export default HelpCenter