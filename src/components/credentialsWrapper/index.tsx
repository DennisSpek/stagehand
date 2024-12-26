'use client'

import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { CredentialsLogin } from '@/components/credentialsLogin';
import { CredentialsRegister } from '@/components/credentialsRegister';
import { LoadingProvider } from '@/context/loading/provider'

export const CredentialsWrapper = () => {
  const [activeForm, setActiveForm] = useState('login');
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  useEffect(() => {
    setIsInitialLoad(false);
  }, []);

  const variants = {
    initial: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    animate: {
      x: 0,
      opacity: 1,
      transition: { type: 'spring', stiffness: 300, damping: 30 },
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
      transition: { duration: 0.3 },
    }),
  };

  return (
    <LoadingProvider>
      <AnimatePresence custom={activeForm === 'login' ? 1 : -1}>
        <div className='flex min-h-[332px]'>
          {activeForm === 'login' ? (
            <motion.div
              key="login"
              custom={1}
              variants={variants}
              initial={isInitialLoad ? false : "initial"}
              animate="animate"
              exit="exit"
            >
              <CredentialsLogin callback={() => setActiveForm('register')}/>
            </motion.div>
          ) : (
            <motion.div
              key="register"
              custom={-1}
              variants={variants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <CredentialsRegister callback={() => setActiveForm('login')}/>
            </motion.div>
          )}
        </div>
      </AnimatePresence>
    </LoadingProvider>
  );
};