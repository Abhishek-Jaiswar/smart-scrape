import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { GetAvailableBalance } from '../../actions/biling/getAvailableCredits'
import Link from 'next/link'
import { CoinsIcon, Loader2Icon } from 'lucide-react'
import { cn } from '@/lib/utils'
import ReactCountUpWrapper from './ReactCountUpWrapper'
import { buttonVariants } from './ui/button'

const UserAvailableCreditsBadge = () => {
    const query = useQuery({
        queryKey: ["user-available-credits"],
        queryFn: () => GetAvailableBalance(),
        refetchInterval: 30 * 1000 //30 sec
    })
    return (
        <Link href={"/biling"} className={cn(' w-full space-x-2 items-center',
            buttonVariants({
                variant: 'outline'
            })
        )}>
            <CoinsIcon size={20} className='text-primary ' />
            <span className=' font-semibold capitalize '>
                {query.isLoading && <Loader2Icon className='w-4 h-4 animate-spin' />}
                {!query.isLoading && query.data && <ReactCountUpWrapper value={query.data === -1 ? 0 : query.data} />}
                {!query.isLoading && query.data === undefined && "-"}
            </span>
        </Link>
    )
}

export default UserAvailableCreditsBadge