import { auth } from "@/auth"

export default async function Settings() {
  const session = await auth();

  console.log("session", session);

  return (
    <div>
      <h1>Settings</h1>
    </div>
  )
}