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

export const { handlers, signIn, signOut, auth } = NextAuth(() => {
  return {
    adapter: PostgresAdapter(pool),
    session: { strategy: "jwt" },
    ...authConfig,
    callbacks: {
      signIn: () => {
        return true;
      },
      jwt({token, user, account, profile, isNewUser}) {
        if (user) { // User is available during sign-in
          token.id = user.id
          token.isNewUser = isNewUser
        }

        return token
      },
      session({ session, token }) {

        session.user.id = token.id;
        session.user.address = "123 Fake St.";
        session.isNewUser = token.isNewUser;

        return session
      },
    },
  }
})