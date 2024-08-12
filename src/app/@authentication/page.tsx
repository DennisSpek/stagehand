import { signIn } from "@/auth"
import { BlackRoundedButton } from '@/ui/buttons/blackRoundedButton'
import { HorizontalSeperator } from '@/ui/horizontalSeperator'
import { LogoContainer } from '@/ui/logoContainer'
import { CredentialsWrapper } from '@/components/credentialsWrapper'

export default function Page(){
  return (
    <div className='flex flex-col items-center justify-center h-full'>
      <div className='text-center mb-16'>
        <LogoContainer className='text-2xl' />
        <h3 className='text-xl'>Login to access your statistics!</h3>
      </div>
      <div className='w-[280px]'>
        <form
          action={async () => {
            "use server"
            await signIn("spotify")
          }}
        >
          <BlackRoundedButton>
            <span>Continue with Spotify</span>
          </BlackRoundedButton>
        </form>
        <HorizontalSeperator className='my-6'>
          <div className='bg-offWhite'>
            <span className='px-2 font-bold'>OR</span>
          </div>
        </HorizontalSeperator>
        <CredentialsWrapper />
      </div>
    </div>
  )
}