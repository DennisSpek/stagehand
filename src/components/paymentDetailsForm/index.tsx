'use client'

import { useEffect } from 'react';

import { LongInputField } from '@/ui/elements/inputField'
import { CountrySelect } from '@/ui/elements/countrySelect'
import { motion, AnimatePresence } from 'framer-motion';
import { useUserSelection } from '@/context/onboarding/userSelection/context';

export const PaymentDetailsForm = () => {
  const { setPaymentDetails, userSelection: { paymentDetails } } = useUserSelection();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPaymentDetails({ [name]: value });
  };

  return (
    <div className='relative max-w-[400px]'>
      <label className='font-bold'>We&#39;ll need a little more information from you:</label>
      <div className='flex flex-col gap-2.5 mt-4'>
        <LongInputField name='full_name' placeholder='Account Holder / Company Name' onChange={handleInputChange}/>
        <LongInputField name='address' placeholder='Billing address' onChange={handleInputChange}/>
        <LongInputField name='address_apt' placeholder='Apt, unit, suite, etc (optional)' onChange={handleInputChange}/>
        <CountrySelect name='address_country' placeholder='Country' autocomplete='country' />
        <LongInputField name='address_city' placeholder='City' onChange={handleInputChange}/>
        <div className='flex flex-1 gap-2.5'>
          <LongInputField name='address_state' placeholder='State' onChange={handleInputChange}/>
          <LongInputField name='address_zip' placeholder='Zip code' onChange={handleInputChange} />
        </div>
      </div>
    </div>
  );
}