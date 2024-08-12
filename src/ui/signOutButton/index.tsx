
import { signOut } from "next-auth/react"

export const SignOutButton = () => {
  return (
    <button onClick={() => signOut()}>
      <li className='hover:bg-offWhite hover:text-primary transition-colors duration-200 p-2 rounded'>Logout</li>
    </button>
  )
}