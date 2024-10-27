import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function Modal({
  children,
  isVisible,
}: {
  children: React.ReactNode,
  isVisible?: boolean,
}) {
  return (
    <AnimatePresence>
      <motion.div
        className='absolute z-10 top-0 left-0 w-full h-full bg-darkGray/[.75] flex items-center justify-center'
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        <motion.div
          className='p-4 border border-vividBlue rounded-normal shadow-sm border-gray-700 sm:p-6 bg-offWhite drop-shadow'
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {children}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}