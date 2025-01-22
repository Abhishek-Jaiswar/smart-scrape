'use client'
import Image from 'next/image'
const Header = () => {

    return (
        <div className=' container'>
            <div className=' hidden mx-5 md:flex items-center justify-between md:max-w-7xl md:mx-auto py-6'>
                <div>
                    <div className='flex items-center gap-2'>
                        <Image
                            src="/logo.png"
                            alt='logo'
                            width={25}
                            height={25}
                        />
                        <h1 className='text-xl tracking-wider text-neutral-950 font-bold font-mono '>SMARTSCRAPE</h1>
                    </div>
                </div>
                <div className='hidden md:flex items-center justify-center gap-6'>
                    <ul className='flex items-center justify-center gap-10'>
                        <li className='text-neutral-950 font-medium'>Services</li>
                        <li className='text-neutral-950 font-medium'>Pricing</li>
                        <li className='text-neutral-950 font-medium'>Docs</li>
                        <li className='text-neutral-950 font-medium'>Feedback</li>
                    </ul>
                </div>
                <div className='flex items-center gap-5'>
                    <button className='text-neutral-950 font-medium'>Sign in</button>
                    <button className='px-3 py-1.5 bg-rose-500 rounded-md font-medium text-white hover:bg-rose-400'>Create free account</button>
                </div>
            </div>
        </div>
    )
}

export default Header