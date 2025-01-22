import React from 'react'
import Feedback from '../_components/Feedback'

const page = () => {
    return (
        <div className='flex items-center'>
            <div className='w-[20%] h-screen'>
                <div>
                    <h1>SmartScrape</h1>
                </div>
            </div>
            <div className='w-[80%]'>
                <Feedback />
            </div>
        </div>
    )
}

export default page