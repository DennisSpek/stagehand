import { HorizontalSeperator } from '@/ui/horizontalSeperator'

export const PaymentSummaryContentSkeleton = () => {
  return(
    <div>
      <label className='block h-4 bg-gray-300 rounded animate-pulse'> </label>
      <div className='flex gap-4 mt-4'>
        {Array(2).fill(0).map((_, index) => (
          <div key={index} className='flex items-center gap-2'>
            <div className='w-4 h-4 bg-lightGray rounded-full animate-pulse'></div>
            <span className='block h-4 w-20 bg-lightGray rounded animate-pulse'></span>
          </div>
        ))}
      </div>
      <HorizontalSeperator className='my-5' />
      <div className='flex justify-between'>
        <div className='flex flex-col'>
          <span className='block h-4 w-32 bg-lightGray rounded animate-pulse'></span>
          <span className='block h-4 w-24 bg-lightGray rounded animate-pulse mt-2'></span>
        </div>
        <div className='flex flex-col'>
          <span className='block h-4 w-16 bg-lightGray rounded animate-pulse'></span>
          <span className='block h-4 w-16 bg-lightGray rounded animate-pulse mt-2'></span>
        </div>
      </div>
      <HorizontalSeperator className='my-5' />
      <div className='flex justify-between'>
        <div className='flex flex-col'>
          <span className='block h-4 w-16 bg-lightGray rounded animate-pulse'></span>
          <span className='block h-4 w-16 bg-lightGray rounded animate-pulse mt-2'></span>
        </div>
        <div className='flex flex-col'>
          <span className='block h-4 w-16 bg-lightGray rounded animate-pulse'></span>
          <span className='block h-4 w-16 bg-lightGray rounded animate-pulse mt-2'></span>
        </div>
      </div>
      <div className='mt-4'>
        <span className='block h-4 w-16 bg-lightGray rounded animate-pulse'></span>
        <span className='block h-4 w-16 bg-lightGray rounded animate-pulse mt-2'></span>
      </div>
    </div>
  )
}