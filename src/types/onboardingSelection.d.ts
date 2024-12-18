type UserSelectionState = {
  selectedPlan: Plan | null;
  selectedVariant: Variant | null;
  paymentDetails: PaymentDetails | null;
  selectedArtists: {
    artistId: string;
    image: string;
    name: string;
    trackPreference: string;
  }[];
  selectedTracks: string[];
};
