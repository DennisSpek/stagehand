'use client'

import React, { Suspense, useState } from 'react';
import Link from 'next/link';

import { OnboardingMessage } from '@/components/DashboardMessages';
import { useOnboarding } from '@/context/onboarding/breadcrumbs/context';
import { AnimatedLayout } from '@/ui/animatedLayout'
import { AnimatePresence, motion } from 'framer-motion';
import { useUserSelection } from '@/context/onboarding/userSelection/context'
import { PackageSelection } from '@/components/packageSelection'
import { ArtistSelection } from '@/components/artistSelection';
import { OnboardingSpotifyGuide } from '@/components/onboardingSpotifyGuide';
import { OnboardingProcessing } from '@/components/onboardingProcessing';

import { DashboardMessageSkeleton } from '@/components/DashboardMessages/skeleton';

export default function Page() {
  const { step, setStep } = useOnboarding();
  const [ finished, setFinished ] = useState<boolean>(false);
  const { userSelection: { selectedPlan } } = useUserSelection();

  return (
    <AnimatedLayout>
      <div>
        <AnimatePresence mode='wait'>
          {finished && (
            <OnboardingProcessing />
          )}
        </AnimatePresence>
        <AnimatePresence mode='wait'>
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 0 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 100 }}
              transition={{ duration: 0.3 }}
            >
              <Suspense fallback={<DashboardMessageSkeleton />}>
                <OnboardingMessage title='Good to see you here, UserName' sub='Pick a plan that fits your needs' />
              </Suspense>

              <div className='mt-8'>
                {selectedPlan === null ? <PackageSelection /> : <PackageSelection small='true' />}
              </div>
            </motion.div>
          )}
          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.3 }}
              className='w-full flex flex-col items-center'
            >
              <OnboardingMessage title="Great! Whose stats are you tracking?" sub='Search for your roster and select the artists!' />
              <ArtistSelection />
            </motion.div>
          )}
          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.3 }}
              className='w-full flex flex-col items-center'
            >
              <OnboardingMessage title="Connect your account to Spotify for Artists" sub='Following these steps allows us to gather your data and present your premium analytics' />
              <OnboardingSpotifyGuide />
              <span onClick={() => setFinished(true)}>Finish</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </AnimatedLayout>
  )
}