'use client'

// Onboarding consists of 3 steps:
// 1. Select a payment plan
// 2. Select roster
// 3. Connect data sources

// 3 different modules will be created for each step of the onboarding process. Keep track of active step and filled in values in a context state.
// When all steps are completed, the user is redirected to the dashboard .
import { OnboardingProvider } from '@/context/onboarding/provider';
import { useOnboarding } from '@/context/onboarding/context';

import { AnimatedLayout } from '@/ui/animatedLayout'
import { OnboardingContext } from '@/context/onboarding/context'

const Test = () => {
  const { step, setStep } = useOnboarding();

  return<button onClick={() => setStep(2)}>Test</button>
}

export default async function Page() {
  const { step, setStep } = useOnboarding();

  return (
    <AnimatedLayout>
      <OnboardingProvider>
        <p>{step}</p>
        <Test />
      </OnboardingProvider>  
    </AnimatedLayout>
    
  )
}