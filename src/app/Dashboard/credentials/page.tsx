import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Skeleton } from '@/components/ui/skeleton'
import { LockKeyholeIcon, ShieldIcon, ShieldOffIcon } from 'lucide-react'
import React, { Suspense } from 'react'
import { GetCredentialsForUser } from '../../../../actions/credentials/getCredentialsForUser'
import { Card } from '@/components/ui/card'
import CreateCredentialsDialog from './_components/CreateCredentialsDialog'
import { formatDistanceToNow } from 'date-fns'
import DeleteCredentialsDialog from './_components/DeleteCredentialsDialog'

const page = () => {
    return (
        <div className='flex flex-1 flex-col h-full'>
            <div>
                <div>
                    <h1 className='text-3xl font-bold'>Credentails</h1>
                    <p className='text-muted-foreground font-medium'>Manage your credentials</p>
                </div>
                <CreateCredentialsDialog />
            </div>

            <div className='h-full py-6 space-y-8'>
                <Alert>
                    <ShieldIcon className='w-4 h-4 stroke-primary' />
                    <AlertTitle className='text-primary'>
                        Encryption
                    </AlertTitle>
                    <AlertDescription>
                        Your credentials are securely encrypted and stored using industry-standard encryption algorithms to ensure their safety and confidentiality.
                    </AlertDescription>
                </Alert>

                <Suspense fallback={
                    <Skeleton className=' h-[300px] w-full' />
                }>
                    <UserCredentials />
                </Suspense>

            </div>
        </div>
    )
}

export default page

const UserCredentials = async () => {
    const credentials = await GetCredentialsForUser();
    if (!credentials) {
        return (
            <div>Something went wrong</div>
        )
    }

    if (credentials.length === 0) {
        return (
            <Card className='w-full p-4'>
                <div className='flex flex-col gap-4 items-center justify-center'>
                    <div className='rounded-full w-20 h-20 bg-accent flex items-center justify-center'>
                        <ShieldOffIcon size={40} className='stroke-primary' />
                    </div>
                    <div className='flex flex-col gap-1 items-center'>
                        <p className=' font-bold'>No credentails created yet</p>
                        <p>Click the button to create your first credentail</p>
                    </div>
                    <CreateCredentialsDialog triggerText='Create your first credential' />
                </div>
            </Card>
        )
    }
    return (
        <div className='flex flex-wrap gap-2'>
            {credentials.map((credential) => {
                const createdAt = formatDistanceToNow(credential.createdAt, { addSuffix: true })
                return (
                    <Card key={credential.id} className='w-full p-4 flex justify-between'>
                        <div className='flex gap-2 items-center'>
                            <div className=' w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center'>
                                <LockKeyholeIcon size={18} className='stroke-primary' />
                            </div>
                            <div>
                                <p className='font-bold'>{credential.name}</p>
                                <p className='text-xs text-muted-foreground'>{createdAt}</p>
                            </div>
                        </div>
                        <DeleteCredentialsDialog name={credential.name} />
                    </Card>
                )
            })}
        </div>
    )
}