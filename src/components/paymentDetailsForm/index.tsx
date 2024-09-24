import { LongInputField } from '@/ui/elements/inputField'
import { motion, AnimatePresence } from 'framer-motion';

export const PaymentDetailsForm = ({ trial }: { trial: boolean }) => {
  return (
    <div className='relative max-w-[400px]'>
      <AnimatePresence mode='wait'>
        {trial && (
          <motion.div
            className='absolute inset-0 bg-darkGray bg-opacity-80 flex items-center justify-center'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <span className='text-white font-bold'>Trial Mode </span>
          </motion.div>
        )}
      </AnimatePresence>
      <label className='font-bold'>We'll need a little more information from you:</label>
      <div className='flex flex-col gap-4 mt-4'>
        <LongInputField placeholder='Name on payment method' />
        <LongInputField placeholder='Billing address' />
        <LongInputField placeholder='Apt, unit, suite, etc (optional)' />
        <LongInputField placeholder='Country' />
        <LongInputField placeholder='City' />
        <div className='flex flex-1 gap-4'>
          <LongInputField placeholder='State' />
          <LongInputField placeholder='Zip code' />
        </div>
      </div>
    </div>
  );
}