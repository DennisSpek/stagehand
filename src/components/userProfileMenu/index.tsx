'use client'

import { useState } from 'react';
import { ImageContainer } from '@/ui/imagePlaceholder'
import { UserAvatar } from '@/ui/userAvatar'
import { useSession } from "next-auth/react"
import { DropdownMenu } from '@/ui/dropdownMenu'

import { UserProfileSkeleton } from '@/components/userProfileMenu/skeleton'

export const UserProfileMenu = () => {
  const [menu, toggleMenu] = useState(false)
  const { data } = useSession();

  if(!data?.user) return <UserProfileSkeleton />

  return(
    <div className='relative h-full'>
      <div onMouseOver={() => toggleMenu(true)} onMouseOut={() => toggleMenu(false)} className='flex items-center h-full cursor-pointer hover:shadow-[0_6px_10px_rgba(0,0,0,0.1)] bg-white'>
        <div className='flex items-center gap-2 pr-2'>
          <UserAvatar avatar={data.user.image ?? null} />
          <span>{data.user.name}</span>
        </div>

        {menu && (
          <div className='absolute top-full w-full'>
            <DropdownMenu />
          </div>
        )}
      </div>
    </div>
  )
}