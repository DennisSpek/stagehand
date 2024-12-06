'use client'

import Image from 'next/image';
import { ImageContainer } from '@/ui/imagePlaceholder';
import { useState } from 'react';
import { ElementContainer } from '@/ui/elementContainer';
import useSWR from 'swr';
import { FaInfoCircle, FaPlay } from 'react-icons/fa';
import { FaArrowUp, FaArrowDown, FaChevronDown } from "react-icons/fa6";
import { TopSelectionSkeleton } from './skeleton';

interface Entry {
  image: string | null;
  name: string;
  total: number;
  change: number;
}

interface TopSelectionProps {
  head: { title: string, description: string };
  dataKey: { name: string, cta: string; }
}

const fetcher = (url: string) => fetch(url).then(res => res.json());

const TopSelection = ({ head, dataKey }: TopSelectionProps) => {
  const [selectedMetric, setSelectedMetric] = useState<'total' | 'change'>('total');
  const [filter, setFilter] = useState<'1W' | '1M' | '6M' | '1Y'>('1W');

  const { data, error } = useSWR<Entry[]>(`/api/data?filter=${filter}`, fetcher);

  //if (error) return <div>Failed to load</div>;

  return (
    <ElementContainer className='min-w-[428px] p-4'>
      <div className='flex justify-between items-center mb-4'>
        <div className='flex items-center gap-2'>
          <label>{head.title}</label>
          <FaInfoCircle className='text-darkGray cursor-pointer' title='More information' />
        </div>
        <div className='flex gap-2'>
          <div className='flex gap-2 px-2 py-1 bg-lightGray items-center text-sm rounded-sm relative pointer'>
            <select
              className='appearance-none bg-transparent text-darkGray outline-none text-center pr-4'
              value={filter}
              onChange={(e) => setFilter(e.target.value as '1W' | '1M' | '6M' | '1Y')}
            >
              <option value='1W'>7 days</option>
              <option value='1M'>1 mo</option>
              <option value='6M'>6 mo</option>
              <option value='1Y'>1 year</option>
            </select>
            <FaChevronDown className='absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none text-darkGray' />
          </div>
          <div className='relative flex items-center justify-between bg-lightGray border border-lightGray min-w-[125px] rounded-sm'>
            <div
              className={`absolute top-0 left-0 h-full w-1/2 bg-white transition-transform duration-300 ${
                selectedMetric === 'change' ? 'transform translate-x-full rounded-r-sm' : 'rounded-l-sm'
              }`}
            ></div>
            <button
              className={`relative z-10 text-sm text-darkGray px-2 transition-colors duration-300`}
              onClick={() => setSelectedMetric('total')}
            >
              Streams
            </button>
            <button
              className={`relative z-10 text-sm text-darkGray px-2 transition-colors duration-300`}
              onClick={() => setSelectedMetric('change')}
            >
              Change
            </button>
          </div>
        </div>
      </div>
      {!error && data ? (
        <ul>
          {data.map((entry, index) => (
            <li key={index} className='p-2 cursor-pointer hover:bg-lighterBlue rounded-sm flex items-center justify-between'>
              <div className='flex items-center'>
                <span className='pr-4 text-sm'>{index + 1}</span>
                <div className='flex items-center'>
                  <ImageContainer type='circle'>
                    {entry.image && (
                      <Image src={entry.image ?? null} width={32} height={32} alt='Artist cover'/>
                    )}
                  </ImageContainer>
                  <span className='pl-2 text-sm'>{entry.name}</span>
                </div>
              </div>
              <div className='flex items-center gap-1'>
                <FaPlay className='text-lightBlue'/>
                <span className='text-sm text-darkGray'>{entry.total}</span>
              </div>
              <div className='flex items-center gap-1'>
                {entry.change > 0 ? (
                  <>
                    <FaArrowUp className='text-positiveGreen'/>
                    <span className='text-sm font-bold text-positiveGreen'>{entry.change + '%'}</span>
                  </>
                ) : (
                  <>
                    <FaArrowDown className='text-red-500'/>
                    <span className='text-sm font-bold text-red-500'>{entry.change + '%'}</span>
                  </>
                )}
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <TopSelectionSkeleton />
      )}
    </ElementContainer>
  );
};

export default TopSelection;