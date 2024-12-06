import NextAuth from 'next-auth';
import { redirect } from 'next/navigation';
import PostgresAdapter from '@auth/pg-adapter';
import { Pool } from 'pg';
import authConfig from './auth.config';

const pool = new Pool({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

const url = process.env.NEXT_PUBLIC_STAGEHAND_API;

export const { handlers, signIn, signOut, auth } = NextAuth(() => {
  return {
    adapter: PostgresAdapter(pool),
    session: { strategy: 'jwt' },
    ...authConfig,
    callbacks: {
      authorized: async ({ auth }) => {
        // Logged in users are authenticated, otherwise redirect to login page
        return !!auth;
      },
      signIn: () => {
        return true;
      },
      async jwt({ token, user, trigger, session }) {
        // When calling the update function, JWT token gets updated with values from the session
        if (trigger === 'update' && session?.user) {
          token = { token, ...session.user };
          console.log('Updting', token);
        }

        //When the user logs in, the token is updated with the user object
        if (user) {
          token = { ...user, token };
        }

        return token;
      },
      session({ session, token }) {
        //Update session with values from the token
        return {
          ...session,
          user: { ...token },
        };
      },
    },
    pages: {
      signIn: '/',
    },
  };
});
