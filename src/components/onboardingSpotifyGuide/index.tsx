import { useState } from 'react';
import cslx from 'clsx';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

import { useUserSelection } from '@/context/onboarding/userSelection/context';
import { ArtistItem } from '@/components/artistSelection';

export const OnboardingSpotifyGuide = () => {
  const { userSelection: { selectedArtists } } = useUserSelection();

  return (
    <div className='flex flex-col gap-4 items-center justify-center mt-8 w-full'>
      <div className='flex flex-col w-full bg-white px-10 py-6 rounded-normal border border-lightGray'>
        <label className='text-lg font-bold text-vividBlue'>Step 1</label>
        <h3 className='text-xl font-bold'>Sign in to Spotify for Artists</h3>
        <ul className='mt-5'>
          <li key='1' className='text-darkGray'><b className='text-vividBlue'>(A)</b> In a new tab, open <b>Spotify for Artists</b> at <b><a href='https://artists.spotify.com/' target='_blank' className='underline'>https://artists.spotify.com/</a></b></li>
          <li key='2' className='text-darkGray'><b className='text-vividBlue'>(B)</b> Sign in to the artist you want to connect</li>
        </ul>
      </div>

      <div className='flex flex-col w-full bg-white px-10 py-6 rounded-normal border border-lightGray'>
        <label className='text-lg font-bold text-vividBlue'>Step 2</label>
        <h3 className='text-xl font-bold'>Invite Stagehand to your artist team</h3>
        <ul className='mt-5'>
          <li key="step-c" className='text-darkGray'>
            <b className='text-vividBlue'>(C)</b> Click the profile icon in the top right, and open “Teams” in the drop down menu
          </li>
          <li key="step-d" className='text-darkGray'>
            <b className='text-vividBlue'>(D)</b> Click on the artist that you want to connect
          </li>
          <li key="step-e" className='text-darkGray'>
            <b className='text-vividBlue'>(E)</b> On the overview that opened, click <b>(Invite)</b> in the top right
          </li>
          <li key="step-f" className='text-darkGray'>
            <b className='text-vividBlue'>(F)</b> Fill information, make sure to get the email correct:
          </li>
          <div key="contact-info" className='max-w-md mr-auto py-2'>
            <h3>Contact Information</h3>
            <ul className='grid grid-cols-2 gap-1'>
              <li key="first-name" className='relative pl-8 text-darkGray'>
                <b>First name:</b> Stagehand
              </li>
              <li key="last-name" className='relative pl-8 text-darkGray'>
                <b>Last name:</b> Data
              </li>
              <li key="business-email" className='relative pl-8 text-darkGray col-span-2'>
                <b>Business Email:</b> connect@stagehand.cc <b className='underline'>(important!)</b>
              </li>
              <li key="company" className='relative pl-8 text-darkGray'>
                <b>Company:</b> Stagehand
              </li>
              <li key="role" className='relative pl-8 text-darkGray'>
                <b>Role:</b> Other (Marketing)
              </li>
              <li key="access" className='relative pl-8 text-darkGray'>
                <b>Access:</b> Reader
              </li>
            </ul>
          </div>
          <li id="step-g" className='text-darkGray'>
            <b className='text-vividBlue'>(G)</b> Send the invite.
          </li>
        </ul>
      </div>

      <div className='flex flex-col w-full bg-white px-10 py-6 rounded-normal border border-lightGray'>
        <label className='text-lg font-bold text-vividBlue'>Step 3</label>
        <h3 className='text-xl font-bold'>Repeat for all artists</h3>
        <p className='text-darkGray max-w-[673px] mt-4'>
          It&#39;s highly important you repeat these steps for all artists, otherwise Stagehand wont be able to collect your data for you. Make sure the email is correct. Stagehand will accept the invite within 24 hours.
        </p>
        <div className='flex gap-4 mt-4'>
          {selectedArtists.map((artist, index) => (
            <SmallArtistVariant key={index} index={index} {...artist} />
          ))}
        </div>
      </div>

      <p className='text-center max-w-[500px] mt-8'>NOTE: Don’t ever delete S4A access during your subscription. Removed access will result in a failure of data processing.</p>
    </div>
  )
}

const SmallArtistVariant = ({ image, name, index } : { image: string, name: string, index: number }) => {
  const [active, setActive] = useState(false);

  return (
    <motion.div
      key={index}
      initial={{ scale: 0.5, opacity: 0 }}
      animate={{ scale: [0.5, 1.2, 1], opacity: 1 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      className='items-center flex flex-col relative cursor-pointer'
      onClick={() => setActive(!active)}
    >
      <motion.div
        className={cslx(
          'w-[50px] h-[50px] bg-white border-1 rounded-full flex items-center justify-center m-1 relative',
        )}// Tailwind colors in hex
      >
        <AnimatePresence>
          {active && (
            <motion.div
              initial={{ opacity: 0, scale: 0.5, rotate: -45 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              exit={{ opacity: 0, scale: 0.5, rotate: 45 }}
              transition={{ duration: 0.2, ease: 'easeInOut' }}
              className="absolute inset-0 bg-vividBlue rounded-full z-10 flex items-center justify-center"
            >
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                transition={{ duration: 0.2, ease: 'easeInOut' }}
                className='text-white'
              >
                ✓
              </motion.span>
            </motion.div>
          )}
        </AnimatePresence>
        <Image src={image ?? null} alt='Picture of Artist' fill={true} className='rounded-full' />
      </motion.div>
      <span className='text-sm'>{name}</span>
    </motion.div>
  )
}