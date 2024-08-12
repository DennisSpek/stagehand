import Credentials from "next-auth/providers/credentials"
import Spotify from "next-auth/providers/spotify"
import type { NextAuthConfig } from "next-auth"
import { saltAndHashPassword } from "@/utils/password"
import { saveUser, getUser } from "@/services/userManagement"

export async function registerUser(email: string, password: string, name: string): Promise<User | null> {

  // Hashing password
  const pwHash = await saltAndHashPassword(password);

  console.log("pwHash", pwHash);

  // Add User or return null
  const result = await saveUser(email, pwHash, name);

  if (result) return result;

  return null;
}

export default { 
  providers: [
    Spotify,
    Credentials({
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      credentials: {
        email: { label: "Email" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        let user: User = null;
 
        // logic to salt and hash password
        const pwHash = await saltAndHashPassword(credentials.password);
 
        // logic to verify if the user exists
        user = await getUser(credentials.email, pwHash)
        
        if (!user) {
          // No user found, so this is their first attempt to login
          // meaning this is also the place you could do registration
          throw new Error("User not found.")
        }
 
        // return user object with their profile data
        return user
      },
    }),
  ],
} satisfies NextAuthConfig