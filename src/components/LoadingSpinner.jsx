import { motion } from 'framer-motion';

const LoadingSpinner = () => {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="flex flex-col items-center justify-center py-12"
    >
      <div className="relative w-20 h-20">
        <motion.div
          className="absolute inset-0 border-4 border-neon-cyan/30 rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute inset-0 border-4 border-transparent border-t-neon-cyan rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute inset-2 border-4 border-transparent border-t-electric-purple rounded-full"
          animate={{ rotate: -360 }}
          transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
        />
      </div>
      <motion.p
        className="mt-6 text-gray-300 font-medium"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        Analyzing with AI...
      </motion.p>
      <p className="mt-2 text-sm text-gray-500">
        Running multi-layer detection models
      </p>
    </motion.div>
  );
};

export default LoadingSpinner;
