import { motion } from 'framer-motion';

const FeatureCard = ({ icon, title, description, delay = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45, delay, ease: 'easeOut' }}
      whileHover={{ y: -6, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="glass rounded-2xl p-6 border border-white/10 hover:border-neon-cyan/30 transition-fast hover:glow-cyan"
    >
      <div className="text-4xl mb-4">{icon}</div>
      <h3 className="text-xl font-bold text-white mb-3 font-display tracking-[0.14em] uppercase">
        {title}
      </h3>
      <p className="text-gray-400 leading-relaxed font-serif">{description}</p>
    </motion.div>
  );
};

export default FeatureCard;
