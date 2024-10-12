import { auth } from "@/auth"
import { AnimatedLayout } from '@/ui/animatedLayout'

export default async function HomeLayout({listeners, notifications, saves, tracks}: {listeners: React.ReactNode, notifications: React.ReactNode, saves: React.ReactNode, tracks: React.ReactNode}){
  const session = await auth();

  console.log("session", session)

  return (
    // <AnimatedLayout className='flex flex-1'>
      
    // </AnimatedLayout>
    <div className='flex flex-1 flex-col bg-white rounded-normal border border-vividBlue p-8'>
        <div className='grid grid-cols-3 gap-8 h-[613]'>
          <div className='col-span-1 flex flex-col gap-8'>
            {listeners}
            {saves}
          </div>
          <div className='col-span-2 grid'>
            {tracks}
          </div>
        </div>
        <div className='mt-8'>
          {notifications}
        </div>
      </div>
  )
}