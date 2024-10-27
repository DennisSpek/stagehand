import React, { createContext, useState, ReactNode, useContext } from 'react';
import { UserSelectionState } from '@/types/onboardingSelection';
import { Plan } from '@/types/lemonSqueezy/packagePlan';
import { Variant } from '@/types/lemonSqueezy/packageVariant';
import { BillingDetails } from '@/types/billing';

interface UserSelectionContextProps {
  userSelection: UserSelectionState;
  setSelectedPlan: (plan: Plan) => void;
  setVariant: (variant: Variant) => void;
  setPaymentDetails: (details: Partial<BillingDetails>) => void;
  setSelectedArtists: (artists: { artistId: string, image: string, name: string, trackPreference: string }[]) => void;
  setSelectedTracks: (tracks: string[]) => void;
  removeArtistByIndex: (index: number) => void;
  setTrackPreference: (artistId: string, preference: string) => void;
}

const defaultState: UserSelectionState = {
  selectedPlan: null,
  selectedVariant: null,
  paymentDetails: null,
  selectedArtists: [],
  selectedTracks: [],
};

export const UserSelectionContext = createContext<UserSelectionContextProps>({
  userSelection: defaultState,
  setSelectedPlan: () => {},
  setVariant: () => {},
  setPaymentDetails: () => {},
  setSelectedArtists: () => {},
  setSelectedTracks: () => {},
  removeArtistByIndex: () => {},
  setTrackPreference: () => {},
});

export const useUserSelection = () => useContext(UserSelectionContext);
