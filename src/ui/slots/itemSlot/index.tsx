'use client'

import { useState } from 'react';
import { motion } from 'framer-motion';
import cslx from 'clsx';
import Image from 'next/image';

export const ItemSlot = ({ image, className }: { image: string, className: string }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ scale: 0.5, opacity: 0 }}
      animate={{ scale: [0.5, 1.2, 1], opacity: 1 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      className='items-center flex flex-col relative cursor-pointer'
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div
        className={cslx(
          className,
          'w-[100px] h-[100px] bg-white border-2 rounded-full flex items-center justify-center m-1 relative',
          {
            'border-lightGray': !isHovered,
            'border-vividBlue': isHovered,
          }
        )}
        animate={{ borderColor: isHovered ? '#5650F5' : '#EBEBEB' }} // Tailwind colors in hex
        transition={{ duration: 0.3 }}
      >
        <Image src={image} alt='Picture of Artist' fill={true} className='rounded-full' />
      </motion.div>
    </motion.div>
  );
};