'use client'
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation'
import Image from 'next/image';

import { ArtistSelectorSkeleton } from './skeleton';
import { ElementContainer } from '@/ui/elementContainer';
import { ImageContainer } from '@/ui/imagePlaceholder';

import { useSession } from 'next-auth/react';

const getFirstPathPart = (pathname: string): string | null => {
  const parts = pathname.split('/');
  return parts.length > 1 ? parts[1] : null;
};

export const ArtistSelector = () => {
  const { data: session, status } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname()
  const [selectedArtist, setSelectedArtist] = useState<Artist | null>(null);
  const items = session?.user?.artistList?.artists

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const firstPathPart = getFirstPathPart(pathname);

    const artist = items?.find((artist: Artist) => artist.artistId === firstPathPart);

    if(artist){
      console.log(artist)
      setSelectedArtist(artist)
    }
    
  }, [pathname, items])

  if (status === 'loading' && !selectedArtist) return <ArtistSelectorSkeleton />
  
  return (
    <ElementContainer className='py-4 px-6'>
      <div className='relative'>
        <div className='flex items-center cursor-pointer' onClick={toggleDropdown}>
          <div className='flex gap-2 items-center'>
            <ImageContainer type='square'>
              {selectedArtist && (
                <Image src={selectedArtist?.image ?? null} width={64} height={64} alt='Artist cover'/>
              )}
            </ImageContainer>
            <div>
              <label className='font-bold'>{selectedArtist?.name ?? 'Your Roster'}</label>
              {selectedArtist && selectedArtist?.tracks?.length > 0 && (
                <span className='block text-xs text-darkGray'>Tracks: {selectedArtist?.tracks.length}</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </ElementContainer>
  )
}