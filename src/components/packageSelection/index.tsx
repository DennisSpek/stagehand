import { useEffect, useState } from 'react';

import { PackageCard } from '@/ui/packageCard';
import { PackageCardSkeleton } from '@/ui/packageCard/skeleton';
import { PackageCardSmall } from '@/ui/packageCardSmall';
import { Plan } from '@/types/lemonSqueezy/PackagePlan';

import { motion, AnimatePresence } from 'framer-motion';

import { useUserSelection } from '@/context/onboarding/userSelection/context';
import { useOnboarding } from '@/context/onboarding/breadcrumbs/context';
import { HorizontalSeperator } from '@/ui/horizontalSeperator';

import { PaymentDetailsForm } from '@/components/paymentDetailsForm';
import { PaymentSummary } from '@/components/paymentSummary';

import { getProducts } from '@/services/lemonSqueezy';

export const PackageSelection = ({ small = false } : { small: boolean }) => {
  const { step, setStep } = useOnboarding();
  const { setSelectedPlan, userSelection: { selectedPlan } } = useUserSelection();
  const [products, setProducts] = useState<Plan[] | []>([]);

  useEffect(() => {

    //fetching products
    async function fetchProducts() {
      const data = await getProducts()
      
      setProducts(data)
    }

    fetchProducts()
  }, [])

  const handleClick = (plan) => {
    console.log("plan", plan);
    setSelectedPlan(plan);
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.8 }
  };

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
                products.length === 0 ? 
                  <>
                    <PackageCardSkeleton trial={true} />
                    <PackageCardSkeleton trial={false} />
                    <PackageCardSkeleton trial={false} />
                  </> 
                :
                products?.map((plan: Plan, index: number) => (
                  <PackageCard key={index} plan={plan} callback={handleClick} selectedPlan={selectedPlan?.plan} />
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
                products?.map((plan: Plan, index: number) => (
                  <PackageCardSmall key={index} plan={plan} callback={handleClick} selectedPlan={selectedPlan} />
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