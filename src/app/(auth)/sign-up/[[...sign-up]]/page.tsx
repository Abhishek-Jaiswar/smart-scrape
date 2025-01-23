import AuthInfo from '@/app/components/AuthInfo'
import { SignUp } from '@clerk/nextjs'

export default function Page() {
    return (
        <div className='flex items-center gap-6'>
            <div className=' w-1/2 h-screen flex items-center justify-center'>
                <SignUp />
            </div>
            <div className=' w-1/2 h-screen flex items-center justify-center'>
                <AuthInfo />
            </div>
        </div>
    )
}