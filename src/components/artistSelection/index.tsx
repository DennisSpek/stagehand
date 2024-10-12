import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import cslx from 'clsx';
import { useState, useEffect } from 'react';
import { SearchBar } from '@/ui/searchBar';
import { HorizontalSeperator } from '@/ui/horizontalSeperator';
import { searchArtist } from '@/services/spotify/searchArtist';
import { CheckboxNormal } from '@/ui/checkboxes';
import { SearchResultModal } from '@/ui/searchResultModal';
import { BlueRoundedButton } from '@/ui/buttons/blueRoundedButton';
import { useUserSelection } from '@/context/onboarding/userSelection/context';
import { useOnboarding } from '@/context/onboarding/breadcrumbs/context';
import { FaLock } from 'react-icons/fa';

export const ArtistSelection = () => {
  const { userSelection: { selectedArtists }, setSelectedArtists } = useUserSelection();
  const { setStep } = useOnboarding();
  const [searchResults, setSearchResults] = useState<Unknown[]>([]);
  const [activeArtist, setActiveArtist] = useState<{ artistId: string, preference: string } | null>(null);

  useEffect(() => {
    setSearchResults([]);
    console.log("selectedArtists", selectedArtists);
  }, [selectedArtists]);

  async function handleSearch(value: string) {
    let results: Unknown[] = await searchArtist(value);
    if (!results) {
      results = [];
    }
    setSearchResults(results);
  }

  async function handleSelectItem({ artistId, image, name }: { artistId: string, image: string, name: string }) {
    setSelectedArtists([...selectedArtists, { artistId, image, name, trackPreference: 'top' }]);
  }

  return (
    <div className='w-[600px] flex justify-center items-center flex-col'>
      <div className='relative w-full flex justify-center items-center'>
        <SearchBar callback={(value) => handleSearch(value)} placeholder='Find your artist...' className='mt-10' />
        {searchResults.length > 0 && (
          <SearchResultModal searchResults={searchResults} onItemSelect={handleSelectItem} />
        )}
      </div>
      <HorizontalSeperator className='my-10' />
      <SelectedItemsDisplay setActiveArtist={setActiveArtist} activeArtist={activeArtist}/>
      <TrackPreferenceSelector activeArtist={activeArtist} />
      <div className='mt-8'>
        <BlueRoundedButton onClick={() => setStep(3)} disabled={selectedArtists.length === 0}>
          <span>Next step</span>
        </BlueRoundedButton>
      </div>
    </div>
  );
};

interface SelectedItemsDisplayProps {
  setActiveArtist: (artist: { artistId: string, preference: string } | null) => void;
  activeArtist: { artistId: string, preference: string } | null;
}

const SelectedItemsDisplay = ({ setActiveArtist, activeArtist }: SelectedItemsDisplayProps) => {
  const { userSelection: { selectedPlan, selectedArtists }, removeArtistByIndex } = useUserSelection();
  const maxItems = 10;

  const handleArtistClick = (artist: { artistId: string, preference: string }) => {
    setActiveArtist(artist);
  };

  const handleRemoveArtist = (index: number) => {
    removeArtistByIndex(index);
    setActiveArtist(null);
  }

  return (
    <div className='flex flex-wrap w-full gap-3'>
      {Array.from({ length: maxItems }).map((_, index) => {
        const artist = selectedArtists[index];
        if (index < selectedPlan.artists) {
          if (artist) {
            return (
              <div key={index} onClick={() => handleArtistClick({ artistId: artist.artistId, preference: artist.trackPreference })}>
                <ArtistItem
                  active={activeArtist?.artistId === artist.artistId}
                  artistName={artist.name}
                  image={artist.image}
                  onRemove={(e) => {
                    e.stopPropagation();
                    handleRemoveArtist(index);
                  }}
                />
              </div>
            );
          }
          return <OpenItem key={index} number={index + 1} />;
        } else {
          return <LockedItem key={index} />;
        }
      })}
    </div>
  );
};

interface TrackPreferenceProps {
  activeArtist: { artistId: string, preference: string } | null;
}

const TrackPreferenceSelector = ({ activeArtist }: TrackPreferenceProps) => {
  const { userSelection: { selectedArtists }, setTrackPreference } = useUserSelection();

  const handlePreferenceChange = (preference: string) => {
    if (activeArtist) {
      setTrackPreference(activeArtist.artistId, preference);
    }
  };

  return (
    <div className='mt-10'>
      <div className='flex flex-col items-center'>
        <span className='text-sm font-bold'>Each artist has 20 songs to track. Which songs do you want to include?</span>

        {activeArtist && (
          <div className='flex justify-center gap-4 mt-2'>
            <div className='flex gap-1 justify-center items-center'>
              <CheckboxNormal name={`trackPreference-${activeArtist.artistId}`} onClick={() => handlePreferenceChange('top')} active={selectedArtists.find(( artist ) => artist?.artistId === activeArtist?.artistId)?.trackPreference === 'top'}/>
              <label className='text-sm'>Top performing</label>
            </div>
            <div className='flex gap-1 justify-center items-center'>
              <CheckboxNormal name={`trackPreference-${activeArtist.artistId}`} onClick={() => handlePreferenceChange('custom')} active={selectedArtists.find(( artist ) => artist?.artistId === activeArtist?.artistId)?.trackPreference === 'custom'}/>
              <label className='text-sm'>Custom</label>
            </div>
          </div>
        )}
      </div>
      <p className='text-sm text-center max-w-[460px] mt-8'>
        If your artist has over 20 songs, we have automatically picked their most popular.
        Go to artist settings in the dashboard to update the selection.
      </p>
    </div>
  );
};

const LockedItem = () => {
  return (
    <div className='items-center flex flex-col'>
      <div className='w-[100px] h-[100px] bg-lightGray rounded-full flex items-center justify-center m-1'>
        <FaLock />
      </div>
      <span>Locked</span>
    </div>
  );
};

const OpenItem = ({ number }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className='items-center flex flex-col'
    >
      <div className='w-[100px] h-[100px] bg-white border border-lightGray rounded-full flex items-center justify-center m-1'></div>
      <span>Artist {number}</span>
    </motion.div>
  );
};

interface ArtistItemProps {
  active: boolean;
  artistName: string;
  image: string;
  onRemove: () => void;
}

const ArtistItem = ({ active, artistName, image, onRemove }: ArtistItemProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ scale: 0.5, opacity: 0 }}
      animate={{ scale: [0.5, 1.2, 1], opacity: 1 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      className='items-center flex flex-col relative cursor-pointer'
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div
        className={cslx(
          'w-[100px] h-[100px] bg-white border-2 rounded-full flex items-center justify-center m-1 relative',
          {
            'border-lightGray': !active,
            'border-vividBlue': active,
          }
        )}
        animate={{ borderColor: active ? '#5650F5' : '#EBEBEB' }} // Tailwind colors in hex
        transition={{ duration: 0.3 }}
      >
        <Image src={image} alt='Picture of Artist' fill={true} className='rounded-full' />
        <AnimatePresence>
          {isHovered && (
            <motion.button
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              transition={{ duration: 0.1 }}
              onClick={onRemove}
              className='absolute top-0 right-0 bg-gray text-white rounded-full w-6 h-6 flex items-center justify-center'
            >
              <span>x</span>
            </motion.button>
          )}
        </AnimatePresence>
      </motion.div>
      <span>{artistName}</span>
    </motion.div>
  );
};