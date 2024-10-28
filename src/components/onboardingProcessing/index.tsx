// import React, { useState, useEffect, useCallback } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { useRouter } from 'next/navigation'
// import { useSession } from 'next-auth/react';
// import { createArtistList, updateListById } from '@/services/artistLists';
// import { createBillingProfile } from '@/actions/billing';
// import { getCheckoutURL } from '@/actions/lemonsqueezy';
// import { updateUser } from '@/services/userManagement';
// import { Modal } from '@/ui/modal';
// import { OnboardingMessage } from '@/components/DashboardMessages';
// import { useUserSelection } from '@/context/onboarding/userSelection/context';

// export const OnboardingProcessing = ({ reset }: { reset: () => void }) => {
//   const router = useRouter();
//   const { data: session, status, update } = useSession();
//   const { userSelection: { selectedPlan, selectedArtists, selectedVariant, paymentDetails } } = useUserSelection();
//   const [currentStep, setCurrentStep] = useState(0);
//   const [orderResult, setOrderResult] = useState({ status: 'pending', data: null });
//   const [error, setError] = useState<string | null>(null);

//   const steps = [
//     { title: 'This is your plan', sub: 'Show plan details | Save plan details + payment details in the backend' },
//     { title: 'These artists have been selected', sub: 'Show Artist list | Save artist list in the backend' },
//     { title: 'Welcome', sub: 'Redirecting you to the artist page...' },
//   ];

//   const initiatePayment = useCallback(async (variantUrl: string): Promise<{ status: string, data: any | null }> => {
//     variantUrl && window.LemonSqueezy.Url.Open(variantUrl)

//     const data = await new Promise<{ status: string; data: any | null }>((resolve) => {
//       LemonSqueezy.Setup({
//         eventHandler: (event: any) => {
//           if (event.event === 'Checkout.Success') {
//             resolve({ status: 'success', data: event.data.order.data });
//           }

//           if (event === 'close') {
//             resolve({ status: 'closed', data: null });
//           }
//         },
//       });
//     });

//     return data;
//   }, []);

//   const processSteps = useCallback(async () => {
//     try {
//       // Get the checkout URL
//       const checkoutUrl = await getCheckoutURL(
//         Number(selectedVariant?.id),
//         {
//           name: paymentDetails?.full_name,
//           billing_address: {
//             country: paymentDetails?.address_country,
//             zip: paymentDetails?.address_zip,
//           },
//         }
//       );

//       if (!checkoutUrl) {
//         throw new Error('Failed to get checkout URL');
//       }

//       // Initiate payment
//       const result = !selectedPlan?.trial ? await initiatePayment(checkoutUrl) : { status: 'success', data: null };

//       if (result.status === 'closed') {
//         reset();
//         return;
//       }

//       if (result.status === 'success') {
//         LemonSqueezy.Url.Close();
//         setOrderResult(result);

//         if (!selectedPlan) {
//           throw new Error('No plan selected');
//         }

//         // Create artist list
//         const artistList = await createArtistList(selectedArtists, selectedPlan?.artists);
//         await updateListById(artistList);
//         setCurrentStep(1);

//         if (!selectedVariant) {
//           throw new Error('No variant selected');
//         }

//         // Create billing profile
//         const billingProfile = await createBillingProfile(selectedPlan, selectedVariant, paymentDetails, result.data);
//         setCurrentStep(2);

//         // Update user session
//         await update({ ...session, user: { ...session?.user, artist_list: artistList, billing: billingProfile } });
//         setCurrentStep(3);

//         // Redirect to artist page
//         setTimeout(() => {
//           const artistId = selectedArtists[0].artistId;
//           router.push(`${artistId}/home`); // Replace '/artist/X' with the actual artist page URL
//         }, 3000); // Show "Welcome" message for 3 seconds before redirecting
//       }
//     } catch (error: any) {
//       console.error('Error processing steps:', error);
//       setError(error.message);
//     }
//   }, [selectedVariant, paymentDetails, selectedPlan, selectedArtists, reset, session, update, router, initiatePayment]);

//   useEffect(() => {
//     processSteps();
//   }, [processSteps]);

//   return (
//     <Modal>
//       <AnimatePresence mode='wait'>
//         {currentStep < steps.length && (
//           <motion.div
//             key={currentStep}
//             initial={{ opacity: 0, y: 10 }}
//             animate={{ opacity: 1, y: 0 }}
//             exit={{ opacity: 0, y: -10 }}
//             transition={{ duration: 0.5 }}
//           >
//             <OnboardingMessage title={steps[currentStep].title} sub={steps[currentStep].sub} />
//           </motion.div>
//         )}
//       </AnimatePresence>
//       {error && <p className="error">{error}</p>}
//     </Modal>
//   );
// };

// export default OnboardingProcessing;