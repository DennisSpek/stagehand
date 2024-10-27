import countryList from 'react-select-country-list'
import React, { useState, useMemo } from 'react'
import Select from 'react-select'
import { useUserSelection } from '@/context/onboarding/userSelection/context';

interface CountrySelectProps {
  name: string;
  placeholder: string;
  autocomplete: string;
}

export const CountrySelect = ({ name, placeholder, autocomplete } : CountrySelectProps) => {
  const options = useMemo(() => countryList().getData(), []);
  const { setPaymentDetails } = useUserSelection();
  
  const changeHandler = (value: any) => {
    console.log("value", value.value);
    setPaymentDetails({ ["address_country"]: value.value })
  }

  return (
    <Select 
      autocomplete='country' 
      name='country' 
      options={options} 
      onChange={changeHandler}
      isSearchable={true}
      styles={{
        control: (baseStyles: any, state: any) => ({
          ...baseStyles,
          border: 'none',
          outline: 'none',
        }),
        option: (baseStyles: any, state: any) => ({
          ...baseStyles,
          backgroundColor: state.isFocused && '#5650f5',
          color: state.isFocused ? 'white' : '#727272',
        }),
        menu: (baseStyles: any, state: any) => ({
          ...baseStyles,
          left: '0px',
        })
      }}
      className='w-full max-w-[400px] py-2 px-4 bg-white border border-lightGray text-black rounded-sm outline-none shadow-none p-0 placeholder:text-darkGray'/>
  );
};