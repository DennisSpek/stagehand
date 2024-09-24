import React, { createContext, useState, ReactNode, useContext } from 'react';
import { UserSelectionState, PaymentDetails } from '@/types/onboardingSelection';
import { Plan } from '@/types/PackagePlan';

interface UserSelectionContextProps {
  userSelection: UserSelectionState;
  setSelectedPlan: (plan: Plan) => void;
  setPaymentDetails: (details: PaymentDetails) => void;
  setSelectedArtists: (artists: string[]) => void;
  setSelectedTracks: (tracks: string[]) => void;
  removeArtistByIndex: (index: number) => void;
  setTrackPreference: (artistId: string, preference: string) => void;
}

const defaultState: UserSelectionState = {
  selectedPlan: null,
  paymentDetails: null,
  selectedArtists: [],
  selectedTracks: [],
};

export const UserSelectionContext = createContext<UserSelectionContextProps | undefined>({
  userSelection: defaultState,
  setSelectedPlan: () => {},
  setPaymentDetails: () => {},
  setSelectedArtists: () => {},
  setSelectedTracks: () => {},
  removeArtistByIndex: () => {},
  setTrackPreference: () => {},
});

export const useUserSelection = () => useContext(UserSelectionContext);
