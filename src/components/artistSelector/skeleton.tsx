import { ElementContainer } from '@/ui/elementContainer';
import { ImageContainer } from '@/ui/imagePlaceholder';

export const ArtistSelectorSkeleton = () => {

  return (
    <ElementContainer className='py-4 px-6'>
      <div className='flex items-center'>
        <div className='flex gap-2 items-center flex-grow'>
          <ImageContainer>

          </ImageContainer>
          <div className="flex-grow">
            <div className="bg-darkGray animate-pulse w-full h-5 rounded mb-2"></div>
            <div className="bg-darkGray animate-pulse w-full h-4 rounded"></div>
          </div>
        </div>
        <div>

        </div>
      </div>
    </ElementContainer>
  )
}