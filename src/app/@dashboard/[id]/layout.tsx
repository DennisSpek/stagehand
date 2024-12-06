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
        <div className='flex flex-1 flex-col gap-4'>
          {children}
        </div>
      </main>
    </div>
  );
}
