'use client'
import { Appbar } from '@repo/ui'
import { signIn, signOut, useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

export function AppbarClient() {
    const session = useSession();
    const router = useRouter();


    const signOutHandler = async () => {
        await signOut();
        router.push('/api/auth/signin');
    }
    return (
        <div>
            <Appbar onSignin={signIn} onSignout={signOutHandler} user={session.data?.user} />
        </div>
    )
}