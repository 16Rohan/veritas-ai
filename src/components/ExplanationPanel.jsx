import { motion } from 'framer-motion';

const ExplanationPanel = ({ explanations }) => {
  const listVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.4
      }
    }
  };

  const itemVariants = {
    hidden: { x: -10, opacity: 0 },
    visible: { x: 0, opacity: 1 }
  };

  const getCategoryIcon = (category) => {
    if (category.includes('Domain')) return '🌐';
    if (category.includes('Linguistic') || category.includes('Content')) return '📝';
    if (category.includes('Pattern') || category.includes('Recognition')) return '🔍';
    if (category.includes('Behavioral')) return '🧠';
    if (category.includes('Network')) return '🔗';
    if (category.includes('Reputation')) return '⭐';
    if (category.includes('Source')) return '📰';
    if (category.includes('Threat')) return '🛡️';
    return '📊';
  };

  return (
    <motion.div
      variants={listVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      <h3 className="text-xl font-bold text-white mb-4 font-display tracking-[0.14em] uppercase">
        Analysis Breakdown
      </h3>

      {explanations.map((explanation, idx) => (
        <motion.div
          key={idx}
          variants={itemVariants}
          className="glass rounded-xl p-6 border border-white/10 hover:border-neon-cyan/30 transition-fast"
        >
          <div className="flex items-center space-x-3 mb-4">
            <span className="text-2xl">{getCategoryIcon(explanation.category)}</span>
            <h4 className="text-lg font-semibold text-neon-cyan font-display tracking-[0.14em] uppercase">
              {explanation.category}
            </h4>
          </div>

          <ul className="space-y-3">
            {explanation.findings.map((finding, findingIdx) => (
              <motion.li
                key={findingIdx}
                variants={itemVariants}
                className="flex items-start space-x-3 text-gray-300"
              >
                <span className="text-electric-purple mt-1 flex-shrink-0">▸</span>
                <span className="text-sm leading-relaxed">
                  {finding.split(/(\d+\.?\d*%|\d+\/\d+|\d+\.\d+\/\d+)/).map((part, i) => {
                    if (/\d+\.?\d*%|\d+\/\d+|\d+\.\d+\/\d+/.test(part)) {
                      return (
                        <span key={i} className="font-mono text-neon-cyan font-semibold">
                          {part}
                        </span>
                      );
                    }
                    return part;
                  })}
                </span>
              </motion.li>
            ))}
          </ul>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default ExplanationPanel;
