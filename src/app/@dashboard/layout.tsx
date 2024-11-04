
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
      <div className='h-full flex flex-col'>
        <Header/>
        <main className='flex p-8 gap-8'>
          <div className='w-[288px] flex flex-col gap-4 h-full'>
            <ArtistSelector />
            <div className='flex-1 overflow-auto'>
              <SideNavigation />
            </div>
          </div>
          <div className='h-full flex-1'>
            {children}
          </div>
          <div className='w-[400px] h-[600px] bg-darkGray'>
          </div>
        </main>
      </div>
    );
  }
}
