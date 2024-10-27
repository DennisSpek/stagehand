'use client'

import React, { Suspense, useState, useEffect } from 'react';
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
import { BlueRoundedButton } from '@/ui/buttons/blueRoundedButton';
import { DashboardMessageSkeleton } from '@/components/DashboardMessages/skeleton';

export default function Page() {
  const { step, setStep } = useOnboarding();
  const [ finished, setFinished ] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const { userSelection: { selectedPlan, selectedVariant, selectedArtists } } = useUserSelection();

  return (
    <AnimatedLayout>
      <div className='max-w-[888px] mx-auto'>
        <AnimatePresence mode='wait'>
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 0 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 100 }}
              transition={{ duration: 0.3 }}
              className='w-full flex flex-col items-center'
            >
              <OnboardingMessage title='Good to see you here, UserName!' sub='Pick a plan that fits your needs 🙂' />
              {selectedPlan === null ? <PackageSelection /> : <PackageSelection small={true} />}
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
              <OnboardingMessage title="Finally, let's connect your S4A!" sub="In just a few steps, you'll be ready to use Stagehand." />
              <OnboardingSpotifyGuide />
              <div className='mt-8 self-auto'>
                {/* <BlueRoundedButton onClick={() => setStep(4)} disabled={!selectedVariant || !selectedPlan || selectedArtists.length === 0}>
                  <span>{selectedPlan?.trial ? ('Finish') : ('Finish & Pay')}</span>
                </BlueRoundedButton> */}
                <AnimatePresence mode='wait'>
                  {!finished ? (
                    <BlueRoundedButton onClick={() => setFinished(true)}>
                      <span>{selectedPlan?.trial ? 'Finish' : 'Finish & Pay'}</span>
                    </BlueRoundedButton>
                  ) : (
                    <OnboardingProcessing  reset={() => setFinished(false)}/>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </AnimatedLayout>
  )
}