// 'use client'

//import { useSession } from 'next-auth/react'
import { SideNavigation } from '@/ui/sideNavigation';
import { ArtistSelector } from '@/components/artistSelector';
import { WelcomeMessage } from '@/components/DashboardMessages';

//VERIFY IF USER IS SUBSCRIBED?

export default function ArtistLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  //const { data: session, status } = useSession();

  return (
    <div className='h-full flex flex-col'>
      <main className='flex flex-1 gap-8'>
        <div className='w-[288px] flex flex-col gap-4 h-full'>
          <ArtistSelector />
          <div className='flex-1 overflow-auto'>
            <SideNavigation />
          </div>
        </div>
        <div className='flex flex-1 flex-col gap-4'>
          <WelcomeMessage title='Welcome back, UserName. 👋 Take a look at your stats!' sub='Last refresh: 00:00 mm-dd-yyyy CET (23h ago)' />
          {children}
        </div>
      </main>
    </div>
  );
}
