'use client'
import React, { useMemo } from 'react';

import { useSession } from 'next-auth/react'
import { replaceWordWithVar } from '@/lib/replaceWordWithVar'

export const WelcomeMessage = ({ title, sub }: { title: string, sub: string }) => {
  const { data: session, status } = useSession();

  const convertedTitle = replaceWordWithVar(title, 'UserName', session?.user?.name || 'User');
  const convertedSub = replaceWordWithVar(sub, 'UserName', session?.user?.name || 'User');

  if (!session) return null;

  return(
    <div className='pl-4 pr-8 pt-2 pb-1.5'>
      <h3 className='text-xl font-bold'>{convertedTitle}</h3>
      <span className='text-darkGray text-xs'>{convertedSub}</span>
    </div>
  )
}

export const OnboardingMessage = ({ title, sub }: { title: string, sub: string }) => {
  const { data: session, status } = useSession();

  const convertedTitle = useMemo(() => replaceWordWithVar(title, 'UserName', session?.user?.name || 'User'), [title, session?.user?.name]);
  const convertedSub = useMemo(() => replaceWordWithVar(sub, 'UserName', session?.user?.name || 'User'), [sub, session?.user?.name]);

  if (!session) return null;

  return(
    <div className='text-center'>
      <h3 className='text-xxl font-bold'>{convertedTitle}</h3>
      <span className='text-normal'>{convertedSub}</span>
    </div>
  )
}