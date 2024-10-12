import React, { createContext, useState, ReactNode, useContext } from 'react';
import { UserSelectionState, PaymentDetails } from '@/types/onboardingSelection';
import { Plan } from '@/types/lemonSqueezy/PackagePlan';
import { Variant } from '@/types/lemonSqueezy/packageVariant';

interface UserSelectionContextProps {
  userSelection: UserSelectionState;
  setSelectedPlan: (plan: Plan) => void;
  setVariant: (variant: Variant) => void;
  setPaymentDetails: (details: PaymentDetails) => void;
  setSelectedArtists: (artists: string[]) => void;
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

export const UserSelectionContext = createContext<UserSelectionContextProps | undefined>({
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
