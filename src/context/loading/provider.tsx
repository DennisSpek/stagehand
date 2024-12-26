import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { loadingContext } from './context';
import { LoadingOverlay } from '@/ui/loadingOverlay';

export const LoadingProvider = ({ children }:{ children: React.ReactNode }) => {
  const [loading, setLoading] = useState<boolean>(false);

  return (
    <loadingContext.Provider value={{loading, setLoading}}>
      <AnimatePresence>
        {loading && (
          <motion.div
            key="loadingOverlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <LoadingOverlay />
          </motion.div>
        )}
      </AnimatePresence>
      {children}
    </loadingContext.Provider>
  );
};