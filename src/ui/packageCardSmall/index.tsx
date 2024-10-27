import clsx from 'clsx';
import { motion, AnimatePresence } from 'framer-motion';

import { Plan } from '@/types/lemonSqueezy/packagePlan';
import { CheckMark } from '@/icons/checkmark'

interface PackageCardProps {
  callback: (plan: Plan) => void;
  selectedPlan: Plan | null;
  plan: Plan;
}

export const PackageCardSmall = ( props : PackageCardProps) => {
  const { callback, plan: { name, price, features, description, trial}, selectedPlan} = props;

  const isSelected = selectedPlan?.name === name;

  return(
    <div className='w-[280px] flex flex-col items-center'>
      <motion.div
        onClick={() => callback(props.plan)}
        className={`relative w-full min-h-[95px] rounded-normal border border-lightGray flex flex-col justify-between cursor-pointer`}
        initial={{ opacity: 0, y: -10, backgroundColor: '#FFFFFF' }}
        animate={{ opacity: 1, y: 0, backgroundColor: isSelected ? '#5650F5' : '#FFFFFF' }}
        exit={{ opacity: 0, y: -10 }}
      >
        <AnimatePresence>
          {trial && (
            <motion.span
              className='absolute rounded-normal right-3 -top-3 px-2 py-1 text-sm'
              initial={{ opacity: 0, y: -10 }}
              animate={{
                opacity: 1,
                y: 0,
                backgroundColor: isSelected ? '#D4D7F7' : '#5650F5',
                color: isSelected ? '#5650F5' : '#FFFFFF',
              }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
            >
              Free Trial Included
            </motion.span>
          )}
        </AnimatePresence>
        <div className='px-10 py-3'>
          <motion.label
            className={`${isSelected ? 'text-lightBlue' : 'text-vividBlue'} text-normal font-bold`}
            initial={{ color: isSelected ? '#0000FF' : '#0000FF' }}
            animate={{ color: isSelected ? '#D4D7F7' : '#0000FF' }}
          >
            {name}
          </motion.label>
          <div className='flex flex-col'>
            <motion.h3
              className={` ${isSelected ? 'text-white' : 'text-black'} text-xl font-bold`}
              initial={{ color: isSelected ? '#FFFFFF' : '#000000' }}
              animate={{ color: isSelected ? '#FFFFFF' : '#000000' }}
            >
              {price.monthly}/mo
            </motion.h3>
            <motion.span
              className={` ${isSelected ? 'text-white' : 'text-darkGray'} text-sm `}
              initial={{ color: isSelected ? '#FFFFFF' : '#A9A9A9' }}
              animate={{ color: isSelected ? '#FFFFFF' : '#A9A9A9' }}
            >
              Or annually at {price.yearly}
            </motion.span>
          </div>
        </div>
      </motion.div>
      <AnimatePresence>
        {trial && (
          <motion.span
            className='text-sm text-gray mt-2'
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            14 days free. No credit card required.
          </motion.span>
        )}
      </AnimatePresence>
    </div>
  )
}