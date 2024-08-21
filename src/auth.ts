import NextAuth, from "next-auth"
import { redirect } from 'next/navigation'
import PostgresAdapter from "@auth/pg-adapter"
import { Pool } from "pg"
import authConfig from "./auth.config"

const pool = new Pool({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
})

const url = process.env.NEXT_PUBLIC_STAGEHAND_USER_SERVICE_URL

export const { handlers, signIn, signOut, auth } = NextAuth(() => {
  return {
    adapter: PostgresAdapter(pool),
    session: { strategy: "jwt" },
    ...authConfig,
    callbacks: {
      signIn: () => {
        return true;
      },
      async jwt({token, user, account, profile, isNewUser}, props) { 
        if (user) { // User is available during sign-in
          const response: User = await fetch(url + '/user/'+ user?.id);

          const userObject: User = await response.json();

          token.id = userObject.id
          token.billing_id = userObject.billing_id
          token.artist_list = userObject.artist_list
          token.track_list = userObject.track_list
          token.isNewUser = isNewUser
        }

        return token
      },
      session({ session, token }) {
        session.user.id = token.id;
        session.user.billing_id = token.billing_id;
        session.user.artist_list = token.artist_list;
        session.user.track_list = token.track_list;
        session.isNewUser = token.isNewUser;

        return session
      },
    },
  }
})