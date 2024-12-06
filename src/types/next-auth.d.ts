import { DefaultSession } from 'next-auth';
import { ArtistList } from './artistList';
import { BillingProfile } from './billing';
import { UserType } from './user';

declare module 'next-auth' {
  interface Session {
    user: UserType & DefaultSession['user'];
  }
}
