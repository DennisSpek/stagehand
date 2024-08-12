import { ElementContainer } from '@/ui/elementContainer';
import { ImageContainer } from '@/ui/imagePlaceholder';

export const ArtistSelector = () => {
  return (
    <ElementContainer className='py-4 px-6'>
      <div className='flex items-center'>
        <div className='flex gap-2 items-center'>
          <ImageContainer>

          </ImageContainer>
          <div>
            <label className='font-bold'>Artist name</label>
            <span className='block text-xs text-darkGray'>Profile 1</span>
          </div>
        </div>
        <div>

        </div>
      </div>
    </ElementContainer>
  )
}