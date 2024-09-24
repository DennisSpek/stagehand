'use client'

import clsx from 'clsx';
import { useOnboarding } from '@/context/onboarding/breadcrumbs/context';
import { motion } from 'framer-motion';

export const OnboardingBreadcrumbs = () => {
  const { step } = useOnboarding();

  const borderVariants = {
    initial: { left: '50%', right: '50%', width: '0%' },
    animate: { left: '0%', right: '0%', width: '100%' },
  };

  return (
    <div className='flex gap-4 h-full'>
      <div className='flex flex-col justify-center h-full'>
        <div className={'flex flex-1 gap-1 items-center'}>
          <div className={clsx(step === 1 ? 'bg-vividBlue' : 'bg-lightGray', "w-5 h-5 rounded-full flex items-center justify-center transition-colors duration-500")}>
            <span className='text-white text-sm font-bold -translate-x-px'>1</span>
          </div>
          <label className='uppercase text-sm font-bold'>set up account</label>
        </div>
        <motion.div 
          initial="initial"
          animate={step === 1 ? 'animate' : 'initial'}
          variants={borderVariants}
          transition={{ duration: 0.1 }} 
          className={clsx(step === 1 ? 'border-lightBlue' : 'border-white', 'border-b-2 relative')}>
        </motion.div>
      </div>
      <div className='flex flex-col justify-center h-full'>
        <div className={'flex flex-1 gap-1 items-center'}>
          <div className={clsx(step === 2 ? 'bg-vividBlue' : 'bg-lightGray', "w-5 h-5 rounded-full flex items-center justify-center transition-colors duration-100")}>
            <span className='text-white text-sm font-bold'>2</span>
          </div>
          <label className='uppercase text-sm font-bold'>select roster</label>
        </div>
        <motion.div 
          initial="initial"
          animate={step === 2 ? 'animate' : 'initial'}
          variants={borderVariants}
          transition={{ duration: 0.1 }} 
          className={clsx(step === 2 ? 'border-lightBlue' : 'border-white', 'border-b-2 relative')}>
        </motion.div>
      </div>
      <div className='flex flex-col justify-center h-full'>
        <div className={'flex flex-1 gap-1 items-center'}>
          <div className={clsx(step === 3 ? 'bg-vividBlue' : 'bg-lightGray', "w-5 h-5 rounded-full flex items-center justify-center transition-colors duration-100")}>
            <span className='text-white text-sm font-bold'>3</span>
          </div>
          <label className='uppercase text-sm font-bold'>connect data</label>
        </div>
        <motion.div 
          initial="initial"
          animate={step === 3 ? 'animate' : 'initial'}
          variants={borderVariants}
          transition={{ duration: 0.1 }} 
          className={clsx(step === 3 ? 'border-lightBlue' : 'border-white', 'border-b-2 relative')}>
        </motion.div>
      </div>
    </div>
  )
};
