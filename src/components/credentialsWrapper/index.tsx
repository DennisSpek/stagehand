'use client'

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { CredentialsLogin } from '@/components/credentialsLogin';
import { CredentialsRegister } from '@/components/credentialsRegister';

export const CredentialsWrapper = () => {
  const [activeForm, setActiveForm] = useState('login');

  const variants = {
    initial: (direction) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    animate: {
      x: 0,
      opacity: 1,
      transition: { type: 'spring', stiffness: 300, damping: 30 },
    },
    exit: (direction) => ({
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
      transition: { duration: 0.3 },
    }),
  };

  return (
    <AnimatePresence custom={activeForm === 'login' ? 1 : -1}>
      <div className='flex min-h-[332px]'>
        {activeForm === 'login' ? (
          <motion.div
            key="login"
            custom={1}
            variants={variants}
            initial="initial"
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
  );
};