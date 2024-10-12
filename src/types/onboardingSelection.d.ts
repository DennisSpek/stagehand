import { Plan } from '@/types/lemonSqueezy/packagePlan';
import { Variant } from '@/types/lemonSqueezy/packageVariant';
import { PaymentDetails } from '@/types/PaymentDetails';

export interface UserSelectionState {
  selectedPlan: Plan | null;
  selectedVariant: Variant | null;
  paymentDetails: PaymentDetails | null;
  selectedArtists: string[];
  selectedTracks: string[];
}