'use server';

import { auth } from '@/auth';

const content = {
  streams: {
    head: { title: 'Streams', description: 'Total streams' },
  },
  saves: {
    head: { title: 'Saves', description: 'Total saves' },
  },
  followers: {
    head: { title: 'Followers', description: 'Total followers' },
  },
  listeners: {
    head: { title: 'Listeners', description: 'Total listeners' },
  },
};

type MetricKey = keyof typeof content;

interface MetricData {
  metric: MetricKey;
  head: {
    title: string;
    description: string;
  };
  data: {
    timeframe?: { date: string; value: number }[];
    total: string;
    change: number;
  };
}

export async function getAnalytics(
  timeframe: string
): Promise<MetricData[] | null> {
  // Code to get analytics
  const session = await auth();

  if (!session) return null;

  const data = new Promise<MetricData[] | null>((resolve, reject) => {
    const response = [
      {
        metric: 'streams',
        data: { total: '1000', change: 10 },
      },
      {
        metric: 'saves',
        data: { total: '300', change: 10 },
      },
      {
        metric: 'followers',
        data: { total: '200', change: 25 },
      },
      {
        metric: 'listeners',
        data: { total: '500', change: 6 },
      },
    ];

    if (!response) {
      resolve(null);
    }

    setTimeout(() => {
      resolve(
        response.map((item) => ({
          metric: item.metric as MetricKey,
          head: content[item.metric as MetricKey].head,
          data: item.data,
        }))
      );
    }, 3000);
  });

  return data;
}
