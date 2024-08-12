
import Link from 'next/link'
import { SignOutButton } from '@/ui/signOutButton'

export const DropdownMenu = () => {
  return (
    <div className='p-2 py bg-white shadow-[0_6px_10px_rgba(0,0,0,0.1)] w-full'>
      <ul className='flex flex-col gap-2'>
        <Link href='/profile'>
          <li className='hover:bg-offWhite hover:text-primary transition-colors duration-200 p-2 rounded'>Profile</li>
        </Link>
        <Link href='/settings'>
          <li className='hover:bg-offWhite hover:text-primary transition-colors duration-200 p-2 rounded'>Settings</li>
        </Link>
        <SignOutButton />
      </ul>
    </div>
  )
}