import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AwarenessItem } from '../../data/awarenessData';
import { SeverityBadge } from './SeverityBadge';
import { CategoryTag } from './CategoryTag';

interface AwarenessCardProps {
  item: AwarenessItem;
  index: number;
}

export const AwarenessCard = ({ item, index }: AwarenessCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="h-full"
    >
      <motion.div
        className="glass rounded-xl border border-white/10 p-6 cursor-pointer h-full flex flex-col transition-all duration-300 hover:border-neon-cyan/50"
        whileHover={{ y: -4 }}
        onHoverStart={() => {}}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-4 mb-4">
          <div className="flex-1">
            <h3 className="text-lg font-bold text-white mb-2 line-clamp-2">{item.title}</h3>
            <CategoryTag category={item.category} />
          </div>
          <SeverityBadge severity={item.severity} />
        </div>

        {/* Summary */}
        <p className="text-sm text-gray-400 mb-4 flex-grow">{item.summary}</p>

        {/* Date */}
        <div className="text-xs text-gray-500 mb-4">
          Reported: {new Date(item.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
        </div>

        {/* Expand Button */}
        <motion.button
          className="w-full py-2 px-3 bg-neon-cyan/10 border border-neon-cyan/30 rounded-lg text-neon-cyan text-sm font-semibold hover:bg-neon-cyan/20 transition-colors"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {isExpanded ? '▼ Collapse Analysis' : '▶ Analyze Threat'}
        </motion.button>

        {/* Expanded Content */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="mt-4 pt-4 border-t border-white/10 space-y-4"
            >
              {/* Technical Breakdown */}
              <div>
                <h4 className="text-sm font-bold text-neon-cyan mb-2">Technical Breakdown</h4>
                <p className="text-xs text-gray-400 leading-relaxed">{item.technicalBreakdown}</p>
              </div>

              {/* Indicators of Compromise */}
              <div>
                <h4 className="text-sm font-bold text-electric-purple mb-2">Indicators of Compromise (IoCs)</h4>
                <ul className="space-y-1">
                  {item.indicators.map((indicator, idx) => (
                    <li key={idx} className="text-xs text-gray-400 flex gap-2">
                      <span className="text-electric-purple">◆</span>
                      <span>{indicator}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Prevention Checklist */}
              <div>
                <h4 className="text-sm font-bold text-green-400 mb-2">Prevention Checklist</h4>
                <ul className="space-y-1">
                  {item.prevention.map((point, idx) => (
                    <li key={idx} className="text-xs text-gray-400 flex gap-2">
                      <span className="text-green-400">✓</span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
};
