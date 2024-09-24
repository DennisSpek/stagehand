import { PackageCard } from '@/ui/packageCard';
import { PackageCardSmall } from '@/ui/packageCardSmall';
import { Plan } from '@/types/PackagePlan';

import { motion, AnimatePresence } from 'framer-motion';

import { useUserSelection } from '@/context/onboarding/userSelection/context';
import { useOnboarding } from '@/context/onboarding/breadcrumbs/context';
import { HorizontalSeperator } from '@/ui/horizontalSeperator';

import { PaymentDetailsForm } from '@/components/paymentDetailsForm';
import { PaymentSummary } from '@/components/paymentSummary';
const packageArray: Plan[] = [
  {
    name: 'Artist Plan',
    price: {
      monthly: 12,
      yearly: 120
    },
    artists: 1,
    tracks: 20,
    features: [
      'Connect 1 artist',
      'Track 20 songs',
      'Weekly notifications',
    ],
    description: 'Great for independent artists or users who want to track only one artist.',
    trial: true,
  },
  {
    name: 'Small Teams',
    price: {
      monthly: 80,
      yearly: 900
    },
    artists: 10,
    tracks: 200,
    features: [
      'Connect 10 artists',
      'track 200 songs',
      'Weekly notifications',
      'Audience reports',
    ],
    description: 'Great for independent artists or users who want to track only one artist.',
    trial: false,
  },
  {
    name: 'Bigger Teams',
    price: {
      monthly: 130,
      yearly: 1500
    },
    artists: 50,
    tracks: 1000,
    features: [
      'Connect 50 artists',
      'Track 1000 songs',
      'Daily notifications',
      'Audience reports',
      'Multi-user access',
    ],
    description: 'Great for independent artists or users who want to track only one artist.',
    trial: false,
  }
]

export const PackageSelection = ({ small = false } : { small: boolean }) => {
  const { step, setStep } = useOnboarding();
  const { setSelectedPlan, userSelection: { selectedPlan } } = useUserSelection();
  
  const handleClick = (plan) => {
    setSelectedPlan(plan);
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.8 }
  };

  console.log("selectedPlan", selectedPlan);

  return (
    <div className='flex justify-center'>
      <AnimatePresence mode='wait'>
        {small === false ? (
          <motion.div
            key='normalCards'
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={cardVariants}
            className='flex flex-col gap-4 justify-center'
          >
            <div className='flex gap-4'>
              {
                packageArray.map((plan, index) => (
                  <PackageCard key={index} {...plan} callback={handleClick} selectedPlan={selectedPlan} />
                ))
              }
            </div>
            <div className='flex flex-col items-center'>
              <span>Dont't know where to start? Claim your <b>free trial.</b></span>
              <span>See all features</span>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key='smallCards'
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={cardVariants}
            className='flex flex-col max-w-[888px] justify-center'
          >
            <div className='flex gap-4'>
              {
                packageArray.map((plan, index) => (
                  <PackageCardSmall key={index} {...plan} callback={handleClick} selectedPlan={selectedPlan} />
                ))
              }
            </div>
            <HorizontalSeperator className='my-5' />
            <div className='flex justify-between'>
              <PaymentDetailsForm trial={selectedPlan?.trial}/>
              <PaymentSummary plan={selectedPlan}/>
            </div>
            <button onClick={() => setStep(2)}>Next step</button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}