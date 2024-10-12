'use client'

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react'
import { fetchTopTracks } from '@/services/spotify/fetchTopTracks';
import { updateListById } from '@/services/artistLists';

import { motion, AnimatePresence } from 'framer-motion';
import { Modal } from '@/ui/modal';
import { OnboardingMessage } from '@/components/DashboardMessages';
import { useUserSelection } from '@/context/onboarding/userSelection/context';

import { ArtistList, Artist } from '@/types/artistList';

// Dummy async functions to simulate processing steps
const processStep1 = () => new Promise(resolve => setTimeout(resolve, 5000));
const processStep2 = () => new Promise(resolve => setTimeout(resolve, 5000));
const processStep3 = () => new Promise(resolve => setTimeout(resolve, 5000));

export const OnboardingProcessing = () => {
  const router = useRouter();
  const { data: session, status, update } = useSession();
  const { userSelection: { selectedPlan, selectedArtists } } = useUserSelection();
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    { title: 'Verifying your card details', sub: 'Show payment details | Communicate in the backend with our PSP' },
    { title: 'This is your plan', sub: 'Show plan details | Save plan details + payment details in the backend' },
    { title: 'These artists have been selected', sub: 'Show Artist list | Save artist list in the backend' },
    { title: 'Welcome', sub: 'Redirecting you to the artist page...' },
  ];

  useEffect(() => {
    const processSteps = async () => {
      console.log('Processing onboarding steps...', selectedArtists, session);
      await processStep1();
      setCurrentStep(1);
      await processStep2();
      setCurrentStep(2);
      const artistList = await createArtistList();
      setCurrentStep(3);

      // Redirect after showing the "Welcome" message
      setTimeout(async () => {
        await update({...session, user: { ...session?.user, artist_list: artistList, billing_id: '1234' }});

        const artistId = selectedArtists[0].artistId;
        router.push(artistId+'/home'); // Replace '/artist/X' with the actual artist page URL
      }, 3000); // Show "Welcome" message for 3 seconds before redirecting
    };

    const createArtistList = async () => {
      const artists: Artist[] = [];
      for (const artist of selectedArtists) {
        const topTracks = await fetchTopTracks(artist.artistId);

        const artistObj: Artist = {
          artistId: artist.artistId,
          name: artist.name,
          image: artist.image,
          tracks: topTracks.map(track => ({ trackId: track.id })),
        }

        artists.push(artistObj);
      }

      const artistList: ArtistList = {
        artists: artists,
        occupied: artists.length,
        available: selectedPlan.artists,
      }

      const list = await updateListById(session?.user.id, artistList);

      return list;
    };

    processSteps();
  }, []);

  return (
    <Modal>
      <AnimatePresence mode='wait'>
        {currentStep < steps.length && (
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.5 }}
          >
            <OnboardingMessage title={steps[currentStep].title} sub={steps[currentStep].sub} />
          </motion.div>
        )}
      </AnimatePresence>
    </Modal>
  );
};