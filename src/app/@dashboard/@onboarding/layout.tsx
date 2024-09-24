'use client'
import Link from 'next/link';

import { OnboardingProvider } from '@/context/onboarding/breadcrumbs/provider';
import { UserSelectionProvider } from '@/context/onboarding/userSelection/provider';
import { OnboardingHeader } from '@/components/header';

export default function OnboardingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <OnboardingProvider>
      <div className='h-full'>
        <OnboardingHeader />
        <div className='flex-1'>
          <div className='p-8 h-full '>
            <UserSelectionProvider>
              {children}
            </UserSelectionProvider>
          </div>
        </div>
      </div>
    </OnboardingProvider>
  );
} 