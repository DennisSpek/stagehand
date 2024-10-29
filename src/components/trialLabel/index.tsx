'use client'

import { useSession } from 'next-auth/react';
import { motion } from 'framer-motion';
import { CalculateDifferenceInDays } from '@/lib/calculateDifferenceInDays';

export const TrialLabel = () => {
  const { data: session, status } = useSession();

  const isTrialActive = session?.user?.billing?.billingPlan?.trial_end
  ? new Date(session.user.billing.billingPlan.trial_end) > new Date()
  : false;

  if(!session || !isTrialActive) return null;

  const trialEndDate = new Date(session.user.billing?.billingPlan.trial_end ?? new Date());
  const today = new Date();

  const daysLeft = CalculateDifferenceInDays({ startDate: today, endDate: trialEndDate });

  return (
    <motion.div
      className='bg-offWhite border border-lightGray px-2.5 rounded-sm'
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.1, ease: 'easeOut' }}
    >
      <label>{daysLeft} days left</label>
    </motion.div>
  );
}