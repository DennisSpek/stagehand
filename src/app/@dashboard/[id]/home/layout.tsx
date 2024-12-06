'use client'
import { useState } from 'react'

import { useSession } from "next-auth/react"
import { AnimatedLayout } from '@/ui/animatedLayout'
import MetricCard from '@/ui/metricCard/MetricCard'

import SimpleChart from '@/components/analytics/charts/simple'

const testData = [
  {
    metric_name: 'streams',
    timeserie: [
      {
        date: '2022-01-01',
        value: 123456
      },
      {
        date: '2022-01-02',
        value: 123456
      },
      {
        date: '2022-01-03',
        value: 123456
      }
    ]
  },
  {
    metric_name: 'saves',
    timeserie: [
      {
        date: '2022-01-01',
        value: 10
      },
      {
        date: '2022-01-02',
        value: 15
      },
      {
        date: '2022-01-03',
        value: 30
      }
    ]
  }
]

export default function HomeLayout({listeners, notifications, saves, tracks}: {listeners: React.ReactNode, notifications: React.ReactNode, saves: React.ReactNode, tracks: React.ReactNode}){
  //const session = await auth();
  const [activeMetrics, setActiveMetrics] = useState<string[]>(['streams']);

  return (
    <AnimatedLayout className='flex flex-col'>
      <span>Last refresh xx:xx:xx</span>
      <div className='flex gap-6'>
        {/* <MetricCard title='Streams' />
        <MetricCard title='Listeners' />
        <MetricCard title='Saves' />
        <MetricCard title='Followers' /> */}
      </div>
      {/* <SimpleChart data={testData}/> */}
    </AnimatedLayout>
  );
}