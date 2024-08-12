import { ElementContainer } from '@/ui/elementContainer';
import { WelcomeMessage } from '@/components/welcomeMessage';
import { SessionProvider } from 'next-auth/react'
import { auth } from "@/auth"

export default async function Page() {
  const session = await auth();

  return (
    <SessionProvider>
      <div>
        <ElementContainer className='py-4 px-6'>
          <h3 className='text-xl font-bold'>{session?.isNewUser === true ? `Welcome ${session.user?.name}, to a new way to visualise your data` : `Welcome back, ${session?.user?.name}. 👋 Your stats are ready!`}</h3>
          <span className='text-darkGray text-xs'>Last refresh: 00:00 mm-dd-yyyy CET (23h ago)</span>
        </ElementContainer>
      </div>
    </SessionProvider>
  )
}