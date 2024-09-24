import { Plan } from '@/types/PackagePlan';

export interface PaymentDetails {
  cardNumber: string;
  expiryDate: string;
  cvv: string;
}

export interface UserSelectionState {
  selectedPlan: Plan | null;
  paymentDetails: PaymentDetails | null;
  selectedArtists: string[];
  selectedTracks: string[];
}