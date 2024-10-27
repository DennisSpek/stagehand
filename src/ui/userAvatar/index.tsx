import Image from 'next/image'
import { ImageContainer } from '@/ui/imagePlaceholder'

export const UserAvatar = ({ avatar }:{ avatar: string | null }) => {
  return (
    <div>
      { avatar ? (
        <Image src={avatar} alt='User Avatar' width={40} height={40} className='rounded' />
      ) : (
        <ImageContainer type='circle'/>
      )}
    </div>
  )
}