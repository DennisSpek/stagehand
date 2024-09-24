import { createContext, useState, useEffect, useContext } from 'react';

interface onboardingContextType {
  step: number
  setStep: (step: number) => void;
}

// Create the UserContext with the initial values.
export const onboardingContext = createContext<onboardingContextType>({
  step: 1,
  setStep: () => {}
});

export const useOnboarding = () => useContext(onboardingContext);
