'use client'

import { useState } from 'react';
import { ImageContainer } from '@/ui/imagePlaceholder'
import { UserAvatar } from '@/ui/userAvatar'
import { useSession } from "next-auth/react"
import { DropdownMenu } from '@/ui/dropdownMenu'

export const UserProfileMenu = () => {
  const [menu, toggleMenu] = useState(false)
  const { data } = useSession();

  return(
    <div className='relative h-full'>
      {data?.user ? (
        <div onMouseOver={() => toggleMenu(true)} onMouseOut={() => toggleMenu(false)} className='flex items-center h-full cursor-pointer hover:shadow-[0_6px_10px_rgba(0,0,0,0.1)] bg-white'>
          <div className='flex items-center gap-2 pr-8 pl-4'>
            <UserAvatar avatar={data.user.image} />
            <span>{data.user.name}</span>
          </div>
          {menu && (
            <div className='absolute top-full w-full mr-4'>
              <DropdownMenu />
            </div>
          )}
        </div>
      ) : (
        <div className='h-full pr-8 pl-4 flex items-center'>
          <button>Login</button>
        </div>
      )}
    </div>
  )
}