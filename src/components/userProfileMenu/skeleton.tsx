import { UserAvatar } from '@/ui/userAvatar'

export const UserProfileSkeleton = () => {
  return(
    <div className='relative h-full'>
      <div className='flex items-center h-full cursor-pointer bg-white'>
        <div className='flex items-center gap-2 pr-2'>
          <UserAvatar avatar={null} />
          <span className='w-[80px] animate-pulse bg-lightGray h-[20px]'></span>
        </div>
      </div>
    </div>
  )
}