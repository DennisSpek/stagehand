import React from 'react';

export const TopSelectionSkeleton = () => {
  return (
    <ul>
      {Array.from({ length: 5 }).map((_, index) => (
        <li key={index} className='p-2 cursor-pointer hover:bg-lighterBlue rounded-sm flex items-center justify-between'>
          <div className='flex items-center'>
            <div className='w-4 h-4 bg-lightGray rounded mr-4 animate-pulse'></div>
            <div className='flex items-center'>
              <div className='w-8 h-8 bg-lightGray rounded-full animate-pulse'></div>
              <div className='w-24 h-4 bg-lightGray rounded ml-2 animate-pulse'></div>
            </div>
          </div>
          <div className='flex items-center gap-1'>
            <div className='w-4 h-4 bg-lightGray rounded animate-pulse'></div>
            <div className='w-12 h-4 bg-lightGray rounded animate-pulse'></div>
          </div>
          <div className='flex items-center gap-1'>
            <div className='w-4 h-4 bg-lightGray rounded animate-pulse'></div>
            <div className='w-12 h-4 bg-lightGray rounded animate-pulse'></div>
          </div>
        </li>
      ))}
    </ul>
  );
};