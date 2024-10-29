import React, { useState } from 'react';
import {onboardingContext} from './context';

export const OnboardingProvider = ({ children }:{children: React.ReactNode}) => {
  const [step, setStep] = useState<number>(0);

  return (
    <onboardingContext.Provider value={{step, setStep}}>
      {children}
    </onboardingContext.Provider>
  );
};