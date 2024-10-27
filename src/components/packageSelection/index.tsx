import { useEffect, useState } from 'react';

import { PackageCard } from '@/ui/packageCard';
import { PackageCardSkeleton } from '@/ui/packageCard/skeleton';
import { PackageCardSmall } from '@/ui/packageCardSmall';
import { BlueRoundedButton } from '@/ui/buttons/blueRoundedButton';

import { motion, AnimatePresence } from 'framer-motion';

import { useUserSelection } from '@/context/onboarding/userSelection/context';
import { useOnboarding } from '@/context/onboarding/breadcrumbs/context';
import { HorizontalSeperator } from '@/ui/horizontalSeperator';

import { PaymentDetailsForm } from '@/components/paymentDetailsForm';
import { PaymentSummary } from '@/components/paymentSummary';

import { getProducts } from '@/actions/lemonsqueezy';

import { Variant } from '@/types/lemonSqueezy/packageVariant';
import { Plan } from '@/types/lemonSqueezy/packagePlan';
import { LockedOverlay } from '@/ui/lockedOverlay';

export const PackageSelection = ({ small = false } : { small?: boolean }) => {
  const { step, setStep } = useOnboarding();
  const { setSelectedPlan, setVariant, userSelection: { selectedPlan, selectedVariant } } = useUserSelection();
  const [products, setProducts] = useState<Plan[] | []>([]);

  
  useEffect(() => {

    //fetching products
    async function fetchProducts() {
      const products: Plan[] = await getProducts()

      console.log("products", products);

      setProducts(products)
    }

    fetchProducts()
  }, [])

  const handleClick = (plan: Plan) => {
    const defaultVariant = plan.variants?.find((variant) => variant.name === "Default")
    const variant: Variant | null = plan.variants.find((variant) => variant?.interval === defaultVariant?.interval) ?? null
    
    if(!variant) {
      throw new Error(`Default variant not found for plan: ${plan.name}`);
    }

    setVariant(variant);
    setSelectedPlan(plan);
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.8 }
  };

  return (
    <div className='mt-8'>
      <AnimatePresence mode='wait'>
        {small === false ? (
          <motion.div
            key='normalCards'
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={cardVariants}
            className='flex justify-center items-center flex-col'
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
                  <PackageCard key={index} plan={plan} callback={handleClick} />
                ))
              }
            </div>
            <div className='flex flex-col items-center'>
              <span>Dont&#39;t know where to start? Claim your <b>free trial.</b></span>
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
            className='flex justify-center items-center flex-col'
          >
            <div className='flex gap-4'>
              {
                products?.map((plan: Plan, index: number) => (
                  <PackageCardSmall key={index} plan={plan} callback={handleClick} selectedPlan={selectedPlan} />
                ))
              }
            </div>
            <HorizontalSeperator className='my-5' />
            <div className='flex justify-between w-full relative'>
              <LockedOverlay isVisible={selectedPlan?.trial ?? false}/>
              <PaymentDetailsForm />
              <PaymentSummary plan={selectedPlan}/>
            </div>
            <div className='mt-8 self-auto'>
              <BlueRoundedButton onClick={() => setStep(2)} disabled={!selectedVariant}>
                <span>Next step</span>
              </BlueRoundedButton>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}