import { ArtistList } from './artistList';

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
  artistList?: ArtistList;
  sessions: Session[];
  accounts: Account[];
  billing_id?: string;
  notification_preferences?: NotificationPreferences;
  consents?: Consent;
  created: Date;
};