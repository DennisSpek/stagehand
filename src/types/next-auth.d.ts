import { DefaultSession } from "next-auth";

export type ExtendedUser = DefaultSession["user"] & {
  id: string;
  username: string;
  address: string;
// add more fields here...
};

declare module "next-auth" {
  interface Session {
    isNewUser: boolean;
    user: ExtendedUser;
  }
}