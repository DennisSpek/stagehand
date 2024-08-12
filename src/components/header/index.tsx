import Link from 'next/link'
import{ Button } from '@/ui/buttons/button'
import { VerticalSeperator } from '@/ui/verticalSeperator'
import { UserProfileMenu } from '@/components/userProfileMenu'
import { LogoContainer } from '@/ui/logoContainer'

export function Header() {
  return (
    <div className='pl-8 w-full shadow-[0_4px_10px_rgba(0,0,0,0.1)] bg-white flex justify-between items-center'>
      <div className='py-3 flex flex-1 items-center justify-between pr-4'>
        <LogoContainer className='text-xl'/>
        <Link href='/articles' className='hover:underline'>Articles</Link>
      </div>
      <VerticalSeperator className='py-3 h-full'/>
      <UserProfileMenu />
    </div>
  )
}