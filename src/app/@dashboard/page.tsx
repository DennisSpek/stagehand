import { ElementContainer } from '@/ui/elementContainer';
import { ArtistList } from '@/components/artistList';
import { SessionProvider } from 'next-auth/react'
import { FaArrowUp } from "react-icons/fa";

import { auth } from "@/auth"

import SimpleChart from '@/components/analytics/charts/simple';
import TopSelection from '@/components/analytics/topSelector';
import MetricGroup from '@/components/analytics/metricGroup';

export default async function Page() {
  const session = await auth();

  return (
    <div className='flex flex-col gap-6 grid'>
      <div>
        {session?.user?.artistList && (
          <ArtistList artistList={session.user.artistList} />
        )}
      </div>
      <MetricGroup />
      <div className='flex gap-6'>
        <TopSelection head={{ title: 'Top Artists', description: 'Testing' }} dataKey={{ name: 'artists', cta: '' }} />
        <TopSelection head={{ title: 'Top Tracks', description: 'Testing' }} dataKey={{ name: 'tracks', cta: '' }} />
      </div>
    </div>
  )
}