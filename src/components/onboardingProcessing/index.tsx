"use client"

import { useSession, signOut } from 'next-auth/react';
import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation'
import { createArtistList, updateListById } from '@/services/artistLists';
import { createBillingProfile } from '@/actions/billing';
import { getCheckoutURL } from '@/actions/lemonsqueezy';
import { updateUser } from '@/services/userManagement';
import { Modal } from '@/ui/modal';
import { OnboardingMessage } from '@/components/DashboardMessages';
import { useUserSelection } from '@/context/onboarding/userSelection/context';

import { userAgent } from 'next/server';

export const OnboardingProcessing = ({ paymentResult }: { paymentResult: any }) => {
  const router = useRouter();
  const { data: session, update } = useSession();
  const [currentStep, setCurrentStep] = useState(0);
  const { userSelection: { selectedPlan, selectedVariant, selectedArtists, paymentDetails } } = useUserSelection();
  const [error, setError] = useState<string | null>(null);

  const steps = [
    { title: 'This is your plan', sub: 'Show plan details | Save plan details + payment details in the backend' },
    { title: 'These artists have been selected', sub: 'Show Artist list | Save artist list in the backend' },
    { title: 'Welcome', sub: 'Logging you out because I cant update your session :(' },
  ];

  const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

  useEffect(() => {
    let isMounted = true;
    let artistListProfile: ArtistList | null = null;
    let billingProfile: BillingProfile | null = null;

    (async () => {
      try {

        if (!selectedPlan || !selectedVariant) {
          throw new Error('Plan or variant missing');
        }

        for (let i = 0; i < steps.length; i++) {
          if (!isMounted) break;
          setCurrentStep(i);

          // Call the corresponding function for each step
          if (i === 0){
            // Create artist list
            artistListProfile = await createArtistList(selectedArtists, selectedPlan?.artists);
            await updateListById(artistListProfile);

            if (!artistListProfile) {
              throw new Error('Artist list profile is missing');
            }
          }
          if (i === 1){
            // Create billing profile
            billingProfile = await createBillingProfile(selectedPlan, selectedVariant, paymentDetails, paymentResult);

            if (!billingProfile) {
              throw new Error('Failed to create billing profile');
            }
          };
          if (i === 2){
            // Update user session
            const updatedUser = { ...session?.user, artistList: artistListProfile, billing: billingProfile }
            await update({ user: updatedUser });

            router.refresh();
          };

          await delay(3000);
        }
      } catch (error: any) {
        console.error('Error processing steps:', error);
        setError(error.message);
      }
    })();

    return () => {
      isMounted = false;
    };
  }, [steps.length]);
  //   (async () => {
  //     try {
  //       await delay(3000);
  //       setCurrentStep(1);
        
  
        
  //       await delay(3000);
  //       setCurrentStep(2);
  
  //      

        
  //       // Update user session
  //       //await update({ ...session, user: { ...session?.user, artist_list: artistList, billing: billingProfile } });

  //       // Redirect to artist page
  //       // setTimeout(() => {
  //       //   const artistId = selectedArtists[0].artistId;
  //       //   router.push(`${artistId}/home`); // Replace '/artist/X' with the actual artist page URL
  //       // }, 3000); // Show "Welcome" message for 3 seconds before redirecting
  //     } catch (error: any) {
  //       console.error('Error processing steps:', error);
  //       setError(error.message);
  //     }
  //   })();
  // });

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
      {error && <p className="error">{error}</p>}
    </Modal>
  );
};

export default OnboardingProcessing;