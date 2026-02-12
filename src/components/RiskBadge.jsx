import { motion } from 'framer-motion';

const RiskBadge = ({ riskLevel }) => {
  const getBadgeStyles = () => {
    switch (riskLevel) {
      case 'HIGH RISK':
        return {
          bg: 'bg-risk-red/20',
          border: 'border-risk-red',
          text: 'text-risk-red',
          glow: 'glow-red',
          animate: true
        };
      case 'SUSPICIOUS':
        return {
          bg: 'bg-risk-amber/20',
          border: 'border-risk-amber',
          text: 'text-risk-amber',
          glow: 'glow-amber',
          animate: false
        };
      case 'SAFE':
        return {
          bg: 'bg-risk-green/20',
          border: 'border-risk-green',
          text: 'text-risk-green',
          glow: 'glow-green',
          animate: false
        };
      default:
        return {
          bg: 'bg-gray-500/20',
          border: 'border-gray-500',
          text: 'text-gray-500',
          glow: '',
          animate: false
        };
    }
  };

  const styles = getBadgeStyles();

  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.2 }}
      className={`inline-flex items-center px-6 py-3 rounded-xl border-2 ${styles.bg} ${styles.border} ${styles.text} ${styles.glow} font-bold text-lg ${
        styles.animate ? 'animate-glow-pulse' : ''
      }`}
    >
      <span className="mr-2">
        {riskLevel === 'HIGH RISK' && '⚠️'}
        {riskLevel === 'SUSPICIOUS' && '⚡'}
        {riskLevel === 'SAFE' && '✓'}
      </span>
      {riskLevel}
    </motion.div>
  );
};

export default RiskBadge;
