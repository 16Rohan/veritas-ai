import { motion } from 'framer-motion';
import { useState } from 'react';

const HighlightedText = ({ text, highlights }) => {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  if (!highlights || highlights.length === 0) {
    return (
      <div className="glass rounded-xl p-6 border border-white/10">
        <p className="text-gray-300 leading-relaxed whitespace-pre-wrap font-body">
          {text}
        </p>
      </div>
    );
  }

  const renderHighlightedText = () => {
    let lastIndex = 0;
    const parts = [];

    highlights.forEach((highlight, idx) => {
      const startIndex = text.toLowerCase().indexOf(highlight.text.toLowerCase(), lastIndex);
      
      if (startIndex !== -1) {
        if (startIndex > lastIndex) {
          parts.push(
            <span key={`text-${idx}`}>
              {text.substring(lastIndex, startIndex)}
            </span>
          );
        }

        const endIndex = startIndex + highlight.text.length;
        const highlightColor = highlight.severity === 'high' 
          ? 'bg-risk-red/30 border-risk-red text-risk-red' 
          : 'bg-risk-amber/30 border-risk-amber text-risk-amber';

        parts.push(
          <span
            key={`highlight-${idx}`}
            className={`relative inline-block px-1 border-b-2 ${highlightColor} cursor-help transition-fast`}
            onMouseEnter={() => setHoveredIndex(idx)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            {text.substring(startIndex, endIndex)}
            {hoveredIndex === idx && (
              <motion.div
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 5 }}
                transition={{ duration: 0.2 }}
                className="absolute z-10 bottom-full left-0 mb-2 w-64 glass rounded-lg p-3 border border-white/20 shadow-xl"
              >
                <p className="text-xs text-white font-semibold mb-1">
                  {highlight.reason}
                </p>
                <p className="text-xs text-gray-400">
                  Severity: {highlight.severity.toUpperCase()}
                </p>
              </motion.div>
            )}
          </span>
        );

        lastIndex = endIndex;
      }
    });

    if (lastIndex < text.length) {
      parts.push(
        <span key="text-end">
          {text.substring(lastIndex)}
        </span>
      );
    }

    return parts;
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3, delay: 0.6 }}
      className="glass rounded-xl p-6 border border-white/10"
    >
      <h4 className="text-lg font-semibold text-white mb-4 flex items-center font-display tracking-[0.14em] uppercase">
        <span className="mr-2">🔍</span>
        Keyword Analysis
      </h4>
      <div className="text-gray-300 leading-relaxed whitespace-pre-wrap font-body">
        {renderHighlightedText()}
      </div>
      <p className="mt-4 text-xs text-gray-500 italic font-serif">
        Hover over highlighted text to see detection details
      </p>
    </motion.div>
  );
};

export default HighlightedText;
