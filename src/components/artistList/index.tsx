import Link from 'next/link';
import { OpenSlot } from '@/ui/slots/openSlot';
import { LockedSlot } from '@/ui/slots/lockedSlot';
import { ItemSlot } from '@/ui/slots/itemSlot';

export const ArtistList = ({ artistList }: { artistList: ArtistList }) => {
  
  return (
    <div className='flex gap-2 items-center'>
      {Array.from({ length: 10 }).map((_, index) => {
        const artist = artistList.artists[index];
        if (artist) {
          return (
            <div key={index}>
              <Link href={`${artist.artistId}/home`}>
                <ItemSlot
                  image={artist.image}
                  className='w-[64px] h-[64px]'
                />
              </Link>
            </div>
          );
        }
        
        if (index < artistList?.available) {
          return <OpenSlot key={index} number={index + 1} className='w-[64px] h-[64px]'/>;
        } else {
          return <LockedSlot key={index} className='w-[64px] h-[64px]'/>;
        }
      })}
      <span className='font-sm'>More...</span>
    </div>
  );
};