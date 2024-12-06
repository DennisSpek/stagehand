
import { auth } from "@/auth"
import { AnimatePresence, motion } from 'framer-motion';

import { Header } from '@/components/header';
import React from 'react';

import { SideNavigation } from '@/ui/sideNavigation';
import { ArtistSelector } from '@/components/artistSelector';

export default async function DashboardLayout({
  children,
  onboarding,
}: Readonly<{
  children: React.ReactNode;
  onboarding: React.ReactNode;
}>) {
  const session = await auth();

  if (!session?.user?.billing && !session?.user?.artistList) {
    return onboarding
  } else {
    return (
      <div className='max-h-screen h-full flex flex-col'>
        <Header/>
        <main className='grid grid-cols-[288px,880px,400px] grid-rows-[64px,minmax(0,1fr)] gap-6 p-8 min-h-0'>
          <div className='col-start-1 gap-4'>
            <ArtistSelector />
          </div>
          <div className='col-start-1 row-start-2 gap-4'>
            <SideNavigation />
          </div>
          <div className='col-start-2 row-start-1 row-span-2'>
            {children}
          </div>
          <div className='col-start-3 row-start-2 flex flex-col gap-6'>
            <span><b>Welcome back, {session?.user?.name} 👋</b></span>
            <div className='bg-darkGray h-[600px]'>3</div>
          </div>
        </main>
      </div>
    );
  }
}
