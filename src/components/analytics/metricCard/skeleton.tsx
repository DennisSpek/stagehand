import { ElementContainer } from '@/ui/elementContainer'

const MetricCardSkeleton = () => {

  return (
    <ElementContainer className='p-4 w-[200px] h-[124px]'>
      <div className='flex justify-between items-center'>
        <div className='h-4 rounded w-1/2 bg-lightGray animate-pulse'></div>
      </div>
      <div className='h-8 rounded my-2 bg-lightGray animate-pulse'></div>
      <div className='flex items-center gap-1'>
        <div className='h-4 rounded w-12 bg-lightGray animate-pulse'></div>
      </div>
    </ElementContainer>
  );
}

export default MetricCardSkeleton