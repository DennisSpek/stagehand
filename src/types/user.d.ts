import { ArtistList } from './artistList';
import { BillingProfile } from './billing';

export type UserType = {
  id: string;
  name: string;
  last_name?: string;
  email: string;
  password?: string;
  image?: string;
  emailVerified?: string | null;
  display_name?: string;
  phone?: string;
  date_of_birth?: Date;
  artistList?: ArtistList | null;
  sessions: Session[];
  accounts: Account[];
  billing?: BillingProfile | null;
  notification_preferences?: NotificationPreferences;
  consents?: Consent;
  created: Date;
};