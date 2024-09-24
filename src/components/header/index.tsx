'use client'

import Link from 'next/link'
import { useContext } from 'react'

import{ Button } from '@/ui/buttons/button'
import { VerticalSeperator } from '@/ui/verticalSeperator'
import { UserProfileMenu } from '@/components/userProfileMenu'
import { OnboardingBreadcrumbs } from '@/components/onboardingBreadcrumbs'
import { LogoContainer } from '@/ui/logoContainer'

export function Header() {
  return (
    <div className='pl-8 w-full shadow-[0_4px_10px_rgba(0,0,0,0.1)] bg-white flex justify-between items-center h-[50px]'>
      <div className='flex flex-1 items-center justify-between pr-4 h-full'>
        <LogoContainer className='text-xl py-3'/>
        <Link href='/articles' className='hover:underline py-3'>Articles</Link>
      </div>
      <div className='py-3 h-full'>
        <VerticalSeperator />
      </div>
      <UserProfileMenu />
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