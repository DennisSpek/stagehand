'use client'

import Link from 'next/link'
import { useContext } from 'react'

import { Button } from '@/ui/buttons/button'
import { VerticalSeperator } from '@/ui/verticalSeperator'
import { UserProfileMenu } from '@/components/userProfileMenu'
import { UserNotifications } from '@/components/userNotifications'
import { TrialLabel } from '@/components/trialLabel'
import { OnboardingBreadcrumbs } from '@/components/onboardingBreadcrumbs'
import { LogoContainer } from '@/ui/logoContainer'

export function Header() {
  return (
    <div className='pl-8 w-full shadow-[0_4px_10px_rgba(0,0,0,0.1)] bg-white flex justify-between items-center h-[50px]'>
      <div className='flex flex-1 items-center justify-between pr-4 h-full'>
        <LogoContainer className='text-xl py-3'/>
      </div>
      <div className='flex h-full justify-center items-center'>
        <div className='flex gap-4 items-center px-4'>
          <TrialLabel />
          <Link href='/articles' className='hover:underline py-3'>Articles</Link>
        </div>
        <div className='py-3 h-full'>
          <VerticalSeperator />
        </div>
        <div className='flex pl-2 gap-2'>
          <UserNotifications />
          <UserProfileMenu />
        </div>
      </div>
    </div>
  )
}

export function OnboardingHeader() {
  return (
    <div className='pl-8 w-full shadow-[0_4px_10px_rgba(0,0,0,0.1)] bg-white flex justify-between items-center h-[50px]'>
      <div className='flex flex-1 items-center justify-between pr-4 h-full'>
        <LogoContainer className='text-xl py-3'/>
        <OnboardingBreadcrumbs />
        <Link href='/articles' className='hover:underline py-3'>Articles</Link>
      </div>
      <div className='py-3 h-full'>
        <VerticalSeperator />
      </div>
      <UserProfileMenu />
    </div>
  )
}