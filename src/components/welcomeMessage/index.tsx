'use client'

import { useSession } from 'next-auth/react'

export const WelcomeMessage = () => {
  const { data: session, status } = useSession();

  if (!session) return null;

  return(
    <div className='pl-4 pr-8 pt-2 pb-1.5'>
      <h3 className='text-xl font-bold'>Welcome back, {session?.user?.name}. 👋 Take a look at your stats!</h3>
      <span className='text-darkGray text-xs'>Last refresh: 00:00 mm-dd-yyyy CET (23h ago)</span>
    </div>
  )
}