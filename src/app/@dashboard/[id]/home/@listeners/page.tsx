'use client'

import { ContentLabel } from '@/ui/contentLabel'
import { useEffect } from 'react'

export default function Page(){

  return (
    <div className='bg-lightGray rounded-normal p-4'>
      <div className='flex gap-2'>
        <ContentLabel label='Your listeners'/>
        <ContentLabel label='0'/>
      </div>
    </div>
  )
}