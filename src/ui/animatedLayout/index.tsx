import { motion } from "framer-motion"

export const AnimatedLayout = ({children, className}: {children: React.ReactNode, className?: string}) => {
  
  const pageVariants = {
    initial: { opacity: 0 },
    in: { opacity: 1 },
    out: { opacity: 0 },
  };
  
  return (
    <motion.div
      className={className}
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}  
    >
      {children}
    </motion.div>
  )
}