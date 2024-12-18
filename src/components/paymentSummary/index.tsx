'use client'
import cslx from 'clsx';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import { useUserSelection } from '@/context/onboarding/userSelection/context';
import { PaymentSummaryContentSkeleton } from '@/components/paymentSummary/skeleton';
import { HorizontalSeperator } from '@/ui/horizontalSeperator';

interface PaymentSummaryProps {
  plan: Plan | null;
}

export const PaymentSummary = ({ plan }: PaymentSummaryProps) => {
  const { setVariant, userSelection: { selectedPlan, selectedVariant } } = useUserSelection();
  const [currentPlan, setCurrentPlan] = useState<Plan | null>(plan);

  useEffect(() => {
    setCurrentPlan(plan);
  }, [plan]);

  return (
    <div className='bg-white border border-lightGray rounded-sm p-[25px] max-w-[400px] w-full flex flex-col'>
      <label><b>Confirm Billing Preference</b></label>
      <AnimatePresence mode='wait'>
        {!currentPlan ? (
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
            className="flex-grow flex flex-col"
          >
            <div className='flex gap-4 py-6'>
              {selectedPlan?.variants.filter(( variant: Variant) => variant.name !== 'Default').map((item: Variant) => (
                <div key={item.id} data-variant-id={item.id} className='flex items-center gap-2.5'>
                  <input
                    type='radio'
                    checked={selectedVariant?.id === item.id}
                    onChange={() => setVariant(item)}
                  />
                  <span>{item.name}</span>
                </div>
              ))}
            </div>
            <HorizontalSeperator />
            <div className='flex flex-col py-2 gap-2'>
              <div className='flex justify-between'>
                <span><b>{selectedPlan?.name}</b></span>
                <AnimatePresence mode='wait'>
                  {selectedVariant?.interval === 'year' ? (
                    <motion.span
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className={cslx('line-through text-lightGray')}
                    >
                      {selectedPlan && `€${(parseFloat(selectedPlan.price.monthly.replace('€', '')) * 12)}`}
                    </motion.span>
                  ) : (
                    <motion.span
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className='font-bold'
                    >
                      {selectedPlan && `€${(parseFloat(selectedPlan.price.monthly.replace('€', '')) * 12)}`}
                    </motion.span>
                  )}
                </AnimatePresence>
              </div>
              <div className='flex justify-between'>
                <AnimatePresence mode='wait'>
                  {selectedVariant?.interval === 'month' ? (
                    <motion.span
                      key="month"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                    >
                      1 month, recurring
                    </motion.span>
                  ) : (
                    <motion.span
                      key="year"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                    >
                      1x 12 months
                    </motion.span>
                  )}
                </AnimatePresence>
                <AnimatePresence mode='wait'>
                  {selectedVariant?.interval !== 'month' && (
                    <motion.span
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                    >
                      <b>{selectedPlan?.price.yearly}</b>
                    </motion.span>
                  )}
                </AnimatePresence>
              </div>
            </div>
            <HorizontalSeperator  />
            <div className='h-full flex flex-col justify-between'>
              <span className='text-gray text-sm py-2'>Local VAT & Sales Tax may be added at checkout.</span>
              <div className='bg-halfWhite rounded-sm p-3'>
                <span>💳 We will ask for <b>your card</b> after step 3, so you can first complete your setup.</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};