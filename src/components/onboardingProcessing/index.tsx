'use client'

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react'

import { motion, AnimatePresence } from 'framer-motion';
import { Modal } from '@/ui/modal';
import { OnboardingMessage } from '@/components/DashboardMessages';
import { useUserSelection } from '@/context/onboarding/userSelection/context';

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
      await processStep1();
      setCurrentStep(1);
      await processStep2();
      setCurrentStep(2);
      await processStep3();
      setCurrentStep(3);

      // Redirect after showing the "Welcome" message
      setTimeout(async () => {
        await update({...session, user: { ...session?.user, billing_id: '1234' }});

        const artistId = selectedArtists[0].artistId;
        router.push(artistId+'/home'); // Replace '/artist/X' with the actual artist page URL
      }, 3000); // Show "Welcome" message for 3 seconds before redirecting

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