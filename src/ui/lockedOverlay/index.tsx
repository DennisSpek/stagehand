import { motion, AnimatePresence } from 'framer-motion';

export const LockedOverlay = ({ children, isVisible } : { children?: React.ReactNode, isVisible: boolean }) => {
  return(
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9, backdropFilter: 'blur(0px)' }}
          animate={{ opacity: 1, scale: 1, backdropFilter: 'blur(3px)' }}
          exit={{ opacity: 0, scale: 0.9, backdropFilter: 'blur(0px)' }}
          transition={{ duration: 0.2 }}
          className="absolute inset-0 -m-4 bg-opacity-50 flex items-center justify-center z-10 backdrop-blur-[3px]"
        >
          <div className="bg-white text-center p-8 rounded-normal border border-lightGray flex flex-col">
            <span><b>{`🔒 You’re lucky! Your free trial doesn’t require any of your details.`}</b></span>
            <span><b>{`Continue below, to try 14 days on us.`}</b></span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
};