
import { CheckMark } from '@/icons/checkmark'
import { HorizontalSeperator } from '@/ui/horizontalSeperator'

export const PackageCardSkeleton = ({ trial } : { trial: boolean}) => {

  return(
    <div className='w-[280px] flex flex-col items-center'>
      <div className='bg-white w-full h-[440px] rounded-normal border border-lightGray flex flex-col justify-between cursor-pointer transform transition-transform duration-300'>
        <div className='px-10 py-6 flex flex-col justify-between h-[400px]'>
          <div className='space-y-4'>
            <div className='h-4 bg-lightGray rounded w-3/4 animate-pulse'></div>
            <div className='space-y-2'>
              <div className='h-6 bg-lightGray rounded w-1/2 animate-pulse'></div>
              <div className='h-4 bg-lightGray rounded w-2/3 animate-pulse'></div>
            </div>
            <HorizontalSeperator className='w-4/6' />
          </div>
          <ul className='mt-4 flex-1 space-y-2'>
            {Array(3).fill(0).map((_, index) => (
              <li key={index} className='flex items-center gap-2'>
                <div className='w-4 h-4 bg-lightGray rounded-full animate-pulse'></div>
                <div className='h-4 bg-lightGray rounded w-3/4 animate-pulse'></div>
              </li>
            ))}
          </ul>
          <div className='h-4 bg-lightGray rounded w-full animate-pulse'></div>
        </div>
        <div className='bg-lightGray w-full rounded-b-normal p-2.5 animate-pulse'></div>
      </div>
      <div className='h-4 bg-lightGray rounded w-1/2 mt-2 animate-pulse'></div>
    </div>
  )
}