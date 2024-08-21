import { auth } from "@/auth"
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

  return (
    <div className='h-full'>
      <Header/>
      <div className='flex-1'>
        <div className='p-8 h-full '>
          {!session.user?.billing_id ? onboarding : children}
        </div>
      </div>
    </div>
    
  );
}
