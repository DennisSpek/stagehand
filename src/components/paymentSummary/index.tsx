'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion';

import { useUserSelection } from '@/context/onboarding/userSelection/context'
import { PaymentSummaryContentSkeleton } from '@/components/paymentSummary/skeleton'
import { getProductVariants } from '@/services/lemonSqueezy'
import { HorizontalSeperator } from '@/ui/horizontalSeperator'

import { Plan } from '@/types/lemonSqueezy/PackagePlan';
import { Variant } from '@/types/lemonSqueezy/PackageVariant';

export const PaymentSummary = ({ plan }: Plan) => {
  const { setVariant, userSelection: { selectedPlan, selectedVariant } } = useUserSelection();
  const [ variants, setVariants ] = useState<Variant[]>([]);
  const [ loading, setLoading ] = useState(true);

  useEffect(() => {
    const fetchVariants = async () => {
      setLoading(true);
      const variants = await getProductVariants(selectedPlan?.id);
      console.log("variants", variants);
      setVariants(variants);
      setLoading(false);
    };

    fetchVariants();
  }, [selectedPlan?.id]);

  return (
      <div className='bg-white border border-lightGray rounded-sm p-[25px] max-w-[400px] w-full'>
        <label>Payment summary</label>
        <AnimatePresence mode='wait'>
          {loading ? (
            <motion.div
              key="skeleton"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <PaymentSummaryContentSkeleton />
            </motion.div>
          ) : (
            <motion.div
              key="content"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div>
                <div className='flex gap-4'>
                  {variants.map((item: Variant) => {
                    return (
                      <div key={item.id} data-variant-id={item.id}>
                        <input type='radio' checked={selectedVariant?.id === item.id} onChange={() => setVariant(item)}></input>
                        <span>{item.interval === 'month' ? 'monthly' : 'annual'}</span>
                      </div>
                    )
                  })}
                </div>
                <HorizontalSeperator className='my-5' />
                <div className='flex justify-between'>
                  <div className='flex flex-col'>
                    <span>{selectedPlan?.name}</span>
                    <span>1x 12 months</span>
                  </div>
                  <div className='flex flex-col'>
                    <span>{selectedPlan?.price.monthly}</span>
                    <span>{selectedPlan?.price.yearly}</span>
                  </div>
                </div>
                <HorizontalSeperator className='my-5' />
                <div className='flex justify-between'>
                  <div className='flex flex-col'>
                    <span>Subtotal</span>
                    <span>Taxes (21%)</span>
                  </div>
                  <div className='flex flex-col'>
                    <span>{selectedPlan?.price.monthly}</span>
                    <span>{selectedPlan?.price.yearly}</span>
                  </div>
                </div>
                <div>
                  <span>Total</span>
                  <span>{selectedPlan?.price.monthly}</span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    )
}