'use client'

import { useEffect } from 'react';

import { LongInputField } from '@/ui/elements/inputField'
import { motion, AnimatePresence } from 'framer-motion';
import { useUserSelection } from '@/context/onboarding/userSelection/context';

export const PaymentDetailsForm = ({ trial }: { trial: boolean }) => {
  const { setPaymentDetails, userSelection: { paymentDetails } } = useUserSelection();

  useEffect(() => {
    console.log(paymentDetails);
  }, [paymentDetails]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPaymentDetails({ [name]: value });
  };

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
        <LongInputField name='full_name' placeholder='Name on payment method' onChange={handleInputChange}/>
        <LongInputField name='address' placeholder='Billing address' onChange={handleInputChange}/>
        <LongInputField name='address_apt' placeholder='Apt, unit, suite, etc (optional)' onChange={handleInputChange}/>
        <LongInputField name='address_country' placeholder='Country' onChange={handleInputChange}/>
        <LongInputField name='address_city' placeholder='City' onChange={handleInputChange}/>
        <div className='flex flex-1 gap-4'>
          <LongInputField name='address_state' placeholder='State' onChange={handleInputChange}/>
          <LongInputField name='address_zip' placeholder='Zip code' onChange={handleInputChange}/>
        </div>
      </div>
    </div>
  );
}