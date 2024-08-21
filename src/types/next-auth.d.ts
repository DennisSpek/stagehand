import { DefaultSession } from "next-auth";

export type ExtendedUser = DefaultSession["user"] & {
  id: string;
  username: string;
  artist_list: unknown[] || null;
  track_list: unknown[] || null;
  billing_id: string || null;

// add more fields here...
};

declare module "next-auth" {
  interface Session {
    isNewUser: boolean;
    user: ExtendedUser;
  }
}