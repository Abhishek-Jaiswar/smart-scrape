import AuthInfo from '@/components/AuthInfo'
import { SignIn } from '@clerk/nextjs'

export default function Page() {
    return (
        <div className='flex items-center gap-6'>
            <div className=' w-1/2 h-screen flex items-center justify-center'>
                <SignIn />
            </div>
            <div className=' w-1/2 h-screen flex items-center justify-center'>
                <AuthInfo />
            </div>
        </div>
    )
}