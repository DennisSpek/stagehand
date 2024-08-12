'use client'

import { AnimatedLayout } from '@/ui/animatedLayout'
import { Button } from "@/ui/buttons/button";

export default function Home() {

  return (
    <AnimatedLayout
      className="min-h-screen p-24 flex flex-col items-center justify-center"  
    >
      <div className='text-center'>
        <label className='font-bold text-2xl'>Coming soon</label>
        <h1 className='text-5xl	mt-4 '>Ultra pro music analytics: <br/> understand your data like <b>never before</b></h1>
        <p className='text-2xl mt-4'>Stagehand organizes your music data, like a 24/7 assistant and <br/> with the impact of an entire data team</p>
      </div>
      <div className='mt-16'>
        <form>
          <div className='relative w-[490px] bg-gray flex justify-between rounded-large'>
            <input className='bg-transparent m-4 ml-8' placeholder={'Enter your email'}/>
            <Button text={'Join the waitlist'} />
          </div>   
        </form>
        <span className='block text-center w-full mt-2 text-sm '>*We will only use your email to send you launch updates</span>
      </div>
    </AnimatedLayout>
  );
}
