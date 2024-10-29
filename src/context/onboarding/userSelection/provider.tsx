import React, { createContext, useState, ReactNode, useContext } from 'react';
import { UserSelectionState } from '@/types/onboardingSelection';
import { UserSelectionContext } from '@/context/onboarding/userSelection/context';
import { Plan } from '@/types/lemonSqueezy/packagePlan';
import { Variant } from '@/types/lemonSqueezy/packageVariant';

import { BillingDetails } from '@/types/billing';

export const UserSelectionProvider = ({ children }: { children: ReactNode }) => {
  const [userSelection, setUserSelection] = useState<UserSelectionState>({
    selectedPlan: null,
    selectedVariant: null,
    paymentDetails: null,
    selectedArtists: [],
    selectedTracks: [],
  });

  const setSelectedPlan = (plan: Plan) => {
    setUserSelection(prevState => ({ ...prevState, selectedPlan: plan}));
  };

  const setVariant = (variant: Variant) => {
    setUserSelection(prevState => ({ ...prevState, selectedVariant: variant }));
  };

  const setPaymentDetails = (details: Partial<BillingDetails>) => {
    setUserSelection(prevState => ({
      ...prevState,
      paymentDetails: { ...prevState.paymentDetails, ...details },
    }));
  };

  const setSelectedArtists = (artists: {artistId: string, image: string, name: string, trackPreference: string}[]) => {
    setUserSelection(prevState => ({ ...prevState, selectedArtists: artists }));
  };

  const setSelectedTracks = (tracks: string[]) => {
    setUserSelection(prevState => ({ ...prevState, selectedTracks: tracks }));
  };

  const removeArtistByIndex = (index: number) => {
    setUserSelection(prevState => ({
      ...prevState,
      selectedArtists: prevState.selectedArtists.filter((_, i) => i !== index),
    }));
  };

  const setTrackPreference = (artistId: string, preference: string) => {
    setUserSelection(prevState => ({
      ...prevState,
      selectedArtists: prevState.selectedArtists.map((artist) =>
        artist.artistId === artistId ? { ...artist, trackPreference: preference } : artist
      )
    }));
  };

  return (
    <UserSelectionContext.Provider value={{ userSelection, setSelectedPlan, setPaymentDetails, setSelectedArtists, setSelectedTracks, setTrackPreference, removeArtistByIndex, setVariant }}>
      {children}
    </UserSelectionContext.Provider>
  );
};

export const useUserSelection = () => {
  const context = useContext(UserSelectionContext);
  if (context === undefined) {
    throw new Error('useUserSelection must be used within a UserSelectionProvider');
  }
  return context;
};