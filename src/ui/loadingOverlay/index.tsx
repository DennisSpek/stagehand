
import { motion } from 'framer-motion';

const waveVariants = {
  initial: {
    scale: 0.5,
    opacity: 1,
  },
  animate: {
    scale: 2,
    opacity: 0,
    transition: {
      duration: 1.5,
      ease: 'easeOut',
      repeat: Infinity,
      repeatDelay: 0.5,
    },
  },
};

const LoadingSpinner = () => {
  return (
    <div className="relative w-12 h-12 flex items-center justify-center">
      <div className="absolute w-5 h-5 bg-purple-500 rounded-full z-10"></div>
      <motion.div className="absolute w-full h-full border-2 border-purple-500 rounded-full" variants={waveVariants} initial="initial" animate="animate"></motion.div>
      <motion.div className="absolute w-full h-full border-2 border-purple-500 rounded-full" variants={waveVariants} initial="initial" animate="animate" style={{ animationDelay: '0.5s' }}></motion.div>
      <motion.div className="absolute w-full h-full border-2 border-purple-500 rounded-full" variants={waveVariants} initial="initial" animate="animate" style={{ animationDelay: '1s' }}></motion.div>
    </div>
  );
};

export const LoadingOverlay = () => {
  return(
    <div className='fixed top-0 left-0 z-50 w-full h-full bg-black bg-opacity-50 flex justify-center items-center'>
      <div className='bg-white rounded-lg p-8'>
        <LoadingSpinner />
      </div>
    </div>
  )
}