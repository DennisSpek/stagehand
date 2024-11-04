import { ElementContainer } from '@/ui/elementContainer';
import { ArtistList } from '@/components/artistList';
import { SessionProvider } from 'next-auth/react'
import { FaArrowUp } from "react-icons/fa";

import { auth } from "@/auth"

export default async function Page() {
  const session = await auth();

  return (
    <SessionProvider>
      <div className='flex flex-col gap-6 px-8'>
        <div>
          {session?.user?.artistList && (
            <ArtistList artistList={session.user.artistList} />
          )}
        </div>
        <div className='flex justify-between'>
          <span className='text-darkGray text-xs'>Last refresh: 00:00 mm-dd-yyyy CET (23h ago)</span>
          <span>Filters</span>
        </div>
        <div className='flex gap-6'>
          <ElementContainer className='p-4 w-[200px]'>
            <div className='flex justify-between items-center'>
              <label className='text-sm'>Roster streams</label>
              <i>i</i>
            </div>
            <h2 className='text-xxl'>123,567</h2>
            <div className='flex items-center'>
              <FaArrowUp fill='#00A210' className='h-[12px]'/>
              <b className='text-sm text-positiveGreen ml-0.5'>12,3%</b>
            </div>
          </ElementContainer>
          <ElementContainer className='p-4 w-[200px]'>
            <div className='flex justify-between items-center'>
              <label className='text-sm'>Roster streams</label>
              <i>i</i>
            </div>
            <h2 className='text-xxl'>123,567</h2>
            <div className='flex items-center'>
              <FaArrowUp fill='#00A210' className='h-[12px]'/>
              <b className='text-sm text-positiveGreen ml-0.5'>12,3%</b>
            </div>
          </ElementContainer>
          <ElementContainer className='p-4 w-[200px]'>
            <div className='flex justify-between items-center'>
              <label className='text-sm'>Roster streams</label>
              <i>i</i>
            </div>
            <h2 className='text-xxl'>123,567</h2>
            <div className='flex items-center'>
              <FaArrowUp fill='#00A210' className='h-[12px]'/>
              <b className='text-sm text-positiveGreen ml-0.5'>12,3%</b>
            </div>
          </ElementContainer>
          <ElementContainer className='p-4 w-[200px]'>
            <div className='flex justify-between items-center'>
              <label className='text-sm'>Roster streams</label>
              <i>i</i>
            </div>
            <h2 className='text-xxl'>123,567</h2>
            <div className='flex items-center'>
              <FaArrowUp fill='#00A210' className='h-[12px]'/>
              <b className='text-sm text-positiveGreen ml-0.5'>12,3%</b>
            </div>
          </ElementContainer>
        </div>
      </div>
    </SessionProvider>
  )
}