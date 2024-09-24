
import { auth } from "@/auth"
import { OnboardingProvider } from '@/context/onboarding/provider';
import { AnimatePresence, motion } from 'framer-motion';

import { Header } from '@/components/header';
import React from 'react';

export default async function DashboardLayout({
  children,
  onboarding,
}: Readonly<{
  children: React.ReactNode;
  onboarding: React.ReactNode;
}>) {
  const session = await auth();

  if (!session?.user?.billing_id) {
    return onboarding
  } else {
    return (
      <div className='h-full flex flex-col'>
        <Header/>
        <div className='flex-1'>
          <div className='p-8 h-full '>
            {children}
          </div>
        </div>
      </div>
    );
  }
}
