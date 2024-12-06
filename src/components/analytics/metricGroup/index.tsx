'use client'

import React, { useState, useMemo, useEffect } from 'react';

import { ElementContainer } from '@/ui/elementContainer';
import { FaArrowUp } from 'react-icons/fa';
import SimpleChart from '@/components/analytics/charts/simple';
import MetricCard from '@/components/analytics/metricCard';
import MetricCardSkeleton from '@/components/analytics/metricCard/skeleton';
import Filters from '@/components/filters';

import { getAnalytics } from '@/actions/analytics/roster';
import { string } from 'zod';

const testData = [
  {
    metric_name: 'streams',
    color: '#5650F5',
    timeserie: [
      { date: '2022-01-01', value: 1000 },
      { date: '2022-01-02', value: 1400 },
      { date: '2022-01-03', value: 1400 },
      { date: '2022-01-04', value: 1200 },
      { date: '2022-01-05', value: 1500 },
      { date: '2022-01-06', value: 1800 },
      { date: '2022-01-07', value: 1900 },
      { date: '2022-01-08', value: 1600 },
      { date: '2022-01-09', value: 1700 },
      { date: '2022-01-10', value: 1650 },
      { date: '2022-01-11', value: 1600 },
      { date: '2022-01-12', value: 1400 },
      { date: '2022-01-13', value: 1400 },
      { date: '2022-01-14', value: 2000 },
      { date: '2022-01-15', value: 1900 },
      { date: '2022-01-16', value: 2100 },
      { date: '2022-01-17', value: 2000 },
      { date: '2022-01-18', value: 2200 },
      { date: '2022-01-19', value: 2100 },
      { date: '2022-01-20', value: 2300 },
      { date: '2022-01-21', value: 2200 },
      { date: '2022-01-22', value: 2400 },
      { date: '2022-01-23', value: 2300 },
      { date: '2022-01-24', value: 2500 },
      { date: '2022-01-25', value: 2400 },
      { date: '2022-01-26', value: 2600 },
      { date: '2022-01-27', value: 2500 },
      { date: '2022-01-28', value: 2700 },
      { date: '2022-01-29', value: 2600 },
      { date: '2022-01-30', value: 2800 },
      { date: '2022-01-31', value: 2700 },
    ],
  },
  {
    metric_name: 'saves',
    color: '#DC143C',
    timeserie: [
      { date: '2022-01-01', value: 300 },
      { date: '2022-01-02', value: 315 },
      { date: '2022-01-03', value: 290 },
      { date: '2022-01-04', value: 320 },
      { date: '2022-01-05', value: 310 },
      { date: '2022-01-06', value: 330 },
      { date: '2022-01-07', value: 320 },
      { date: '2022-01-08', value: 340 },
      { date: '2022-01-09', value: 330 },
      { date: '2022-01-10', value: 350 },
      { date: '2022-01-11', value: 340 },
      { date: '2022-01-12', value: 360 },
      { date: '2022-01-13', value: 350 },
      { date: '2022-01-14', value: 370 },
      { date: '2022-01-15', value: 360 },
      { date: '2022-01-16', value: 380 },
      { date: '2022-01-17', value: 370 },
      { date: '2022-01-18', value: 390 },
      { date: '2022-01-19', value: 380 },
      { date: '2022-01-20', value: 400 },
      { date: '2022-01-21', value: 390 },
      { date: '2022-01-22', value: 410 },
      { date: '2022-01-23', value: 400 },
      { date: '2022-01-24', value: 420 },
      { date: '2022-01-25', value: 410 },
      { date: '2022-01-26', value: 430 },
      { date: '2022-01-27', value: 420 },
      { date: '2022-01-28', value: 440 },
      { date: '2022-01-29', value: 430 },
      { date: '2022-01-30', value: 450 },
      { date: '2022-01-31', value: 440 },
    ],
  },
  {
    metric_name: 'followers',
    color: '#22C55E',
    timeserie: [
      { date: '2022-01-01', value: 100 },
      { date: '2022-01-02', value: 120 },
      { date: '2022-01-03', value: 110 },
      { date: '2022-01-04', value: 130 },
      { date: '2022-01-05', value: 120 },
      { date: '2022-01-06', value: 140 },
      { date: '2022-01-07', value: 130 },
      { date: '2022-01-08', value: 150 },
      { date: '2022-01-09', value: 140 },
      { date: '2022-01-10', value: 160 },
      { date: '2022-01-11', value: 150 },
      { date: '2022-01-12', value: 170 },
      { date: '2022-01-13', value: 160 },
      { date: '2022-01-14', value: 180 },
      { date: '2022-01-15', value: 170 },
      { date: '2022-01-16', value: 190 },
      { date: '2022-01-17', value: 180 },
      { date: '2022-01-18', value: 200 },
      { date: '2022-01-19', value: 190 },
      { date: '2022-01-20', value: 210 },
      { date: '2022-01-21', value: 200 },
      { date: '2022-01-22', value: 220 },
      { date: '2022-01-23', value: 210 },
      { date: '2022-01-24', value: 230 },
      { date: '2022-01-25', value: 220 },
      { date: '2022-01-26', value: 240 },
      { date: '2022-01-27', value: 230 },
      { date: '2022-01-28', value: 250 },
      { date: '2022-01-29', value: 240 },
      { date: '2022-01-30', value: 260 },
      { date: '2022-01-31', value: 250 },
    ],
  },
  {
    metric_name: 'listeners',
    color: '#FFA500',
    timeserie: [
      { date: '2022-01-01', value: 500 },
      { date: '2022-01-02', value: 600 },
      { date: '2022-01-03', value: 550 },
      { date: '2022-01-04', value: 650 },
      { date: '2022-01-05', value: 600 },
      { date: '2022-01-06', value: 700 },
      { date: '2022-01-07', value: 650 },
      { date: '2022-01-08', value: 750 },
      { date: '2022-01-09', value: 700 },
      { date: '2022-01-10', value: 800 },
      { date: '2022-01-11', value: 750 },
      { date: '2022-01-12', value: 850 },
      { date: '2022-01-13', value: 800 },
      { date: '2022-01-14', value: 900 },
      { date: '2022-01-15', value: 850 },
      { date: '2022-01-16', value: 950 },
      { date: '2022-01-17', value: 900 },
      { date: '2022-01-18', value: 1000 },
      { date: '2022-01-19', value: 950 },
      { date: '2022-01-20', value: 1050 },
      { date: '2022-01-21', value: 1000 },
      { date: '2022-01-22', value: 1100 },
      { date: '2022-01-23', value: 1050 },
      { date: '2022-01-24', value: 1150 },
      { date: '2022-01-25', value: 1100 },
      { date: '2022-01-26', value: 1200 },
      { date: '2022-01-27', value: 1150 },
      { date: '2022-01-28', value: 1250 },
      { date: '2022-01-29', value: 1200 },
      { date: '2022-01-30', value: 1300 },
      { date: '2022-01-31', value: 1250 },
    ],
  },
];

interface MetricData {
  metric: string;
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

const MetricGroup = () => {
  const [selectedMetric, setSelectedMetric] = useState<string[]>(['streams']);
  const [filter, setFilter] = useState<'1W' | '1M' | '6M' | '1Y'>('1W');
  const [metricsData, setMetricsData] = useState<MetricData[] | null>();
  const [error, setError] = useState<null | string>(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getAnalytics(filter);

      if(!data){
        setError('Error fetching data');
        setMetricsData(null);
      } else {
        setMetricsData(data);
        setError(null);
      }
    };

    fetchData();
  }, [filter]);

  if(error){
    return <div>{error}</div>;
  }
  
  return (
    <div className='flex flex-col gap-6'>
      <div className='flex justify-between w-full gap-6'>
        <div className='bg-halfWhite px-3 h-[32px] rounded-sm flex flex-1 items-center'>
          <span className='text-darkGray text-xs'>Last refresh: 00:00 mm-dd-yyyy CET (23h ago)</span>
        </div>
        <div>
          <div className='flex gap-2 justify-center items-center'>
            <label className='text-sm text-center'>Filter: </label>
            <Filters filter={filter} setFilter={setFilter} />
          </div>
        </div>
      </div>
      <div className='flex gap-6'>
        {!metricsData ? (
          Array.from({ length: 4 }).map((_, i) => (
            <MetricCardSkeleton key={i}/>
          ))
        ) : (
          metricsData.map((item, i) => (
            <MetricCard
              key={i}
              head={item.head}
              data={item.data}
              //onClick={() => setSelectedMetric(item.metric)}
              active={selectedMetric.find((metric) => metric === item.metric) ? true : false}
            />
          ))
        )}
      </div>
      {testData ? (
        <SimpleChart data={testData} />
      ) : (
        <div>Loading chart...</div>
      )}
    </div>
  );
};

export default MetricGroup;