'use client'

import { useState } from 'react';
import { ImageContainer } from '@/ui/imagePlaceholder'
import { UserAvatar } from '@/ui/userAvatar'
import { useSession } from "next-auth/react"
import { DropdownMenu } from '@/ui/dropdownMenu'

export const UserNotifications = () => {
  const { data } = useSession();

  return(
    <div className='relative h-full'>
      {data?.user && (
        <div className='flex items-center h-full cursor-pointer hover:shadow-[0_6px_10px_rgba(0,0,0,0.1)] bg-white'>
          <div className='flex items-center'>
            <UserAvatar avatar={data.user.image ?? null} />
          </div>
        </div>
      )}
    </div>
  )
}