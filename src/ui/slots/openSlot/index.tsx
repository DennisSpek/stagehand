'use client'

import { motion } from 'framer-motion';
import cslx from 'clsx';

export const OpenSlot = ({ number, className } : { number: number, className?: string }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className='items-center flex flex-col'
    >
      <div className={cslx(className, 'w-[100px] h-[100px] bg-white border border-lightGray rounded-full flex items-center justify-center m-1')}></div>
    </motion.div>
  );
};