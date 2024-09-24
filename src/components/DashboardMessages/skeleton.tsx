import React from 'react';
import { motion } from 'framer-motion';

export const DashboardMessageSkeleton = () => {
  return (
    <div className='flex flex-col gap-4'>
      <motion.div
        className='h-[48px] w-full bg-lightGray'
        animate={{ opacity: [1, 0.5, 1] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      ></motion.div>
      <motion.div
        className='h-[20px] w-full bg-lightGray'
        animate={{ opacity: [1, 0.5, 1] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      ></motion.div>
    </div>
  )
}