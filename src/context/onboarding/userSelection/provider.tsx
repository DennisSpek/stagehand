import React, { createContext, useState, ReactNode, useContext } from 'react';
import { UserSelectionContext } from '@/context/onboarding/userSelection/context';

// selectedPlan: {
//   artists: 50,
//   description: "For companies with a diverse group of artists seeking a reliable view of their performance.",
//   features: ['Connect 50 artists', 'Track 1000 songs', 'Daily notifications', 'Audience reports', 'Multi-user access'],
//   id: "368317",
//   name: "Bigger Teams",
//   price: { monthly: '€130', yearly: '€1,248' },
//   tracks: 1000,
//   trial: false,
//   variants: [{}, {}, {}]
// },
// selectedVariant: {
//   description: "<p>For companies with a diverse group of artists seeking a reliable view their performance.</p>",
//   id: "549867",
//   interval: "month",
//   name: "Monthly",
//   price: 13000,
//   url: "https://stagehand.lemonsqueezy.com/checkout/buy/a5985969-b127-4cfc-8903-ca989f7a893d"
// },
// paymentDetails: {
//   address: "Marinestraat 1",
//   address_city: "Rotterdam",
//   address_country: "NL",
//   address_zip: "3071PB",
//   full_name: "dennis spek"
// },
// selectedArtists: [{
//   artistId: "6kD58SAifDeYcddV0wgB2Q",
//   image: "https://i.scdn.co/image/ab6761610000e5eb21146bfd9fe4db401b0147a3",
//   name: "Space Bear",
//   trackPreference: "top"
// }],

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