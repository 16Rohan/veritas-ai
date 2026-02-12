import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const ConfidenceCircle = ({ confidence, riskLevel }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = confidence;
    const duration = 300;
    const increment = end / (duration / 16);

    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [confidence]);

  const getColor = () => {
    switch (riskLevel) {
      case 'HIGH RISK':
        return '#FF4C4C';
      case 'SUSPICIOUS':
        return '#FFA500';
      case 'SAFE':
        return '#00FF88';
      default:
        return '#00F5FF';
    }
  };

  const color = getColor();
  const radius = 70;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (count / 100) * circumference;

  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.3, delay: 0.2 }}
      className="flex flex-col items-center"
    >
      <div className="relative w-40 h-40">
        <svg className="transform -rotate-90 w-40 h-40">
          <circle
            cx="80"
            cy="80"
            r={radius}
            stroke="rgba(255, 255, 255, 0.1)"
            strokeWidth="10"
            fill="none"
          />
          <motion.circle
            cx="80"
            cy="80"
            r={radius}
            stroke={color}
            strokeWidth="10"
            fill="none"
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: offset }}
            transition={{ duration: 0.3, delay: 0.2 }}
            style={{
              filter: `drop-shadow(0 0 8px ${color})`
            }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <motion.span
            className="text-4xl font-bold font-display tracking-[0.18em] uppercase"
            style={{ color }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            {count}%
          </motion.span>
          <span className="text-xs text-gray-400 mt-1 font-serif">
            Confidence
          </span>
        </div>
      </div>
      <p className="mt-4 text-sm text-gray-400 font-serif">
        {riskLevel === 'HIGH RISK' && 'High probability of threat'}
        {riskLevel === 'SUSPICIOUS' && 'Moderate risk detected'}
        {riskLevel === 'SAFE' && 'Low risk detected'}
      </p>
    </motion.div>
  );
};

export default ConfidenceCircle;
