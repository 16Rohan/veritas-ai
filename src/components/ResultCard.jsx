import { motion, AnimatePresence } from 'framer-motion';
import RiskBadge from './RiskBadge';
import ConfidenceCircle from './ConfidenceCircle';
import ExplanationPanel from './ExplanationPanel';
import HighlightedText from './HighlightedText';
import RiskBarChart from './RiskBarChart';

const ResultCard = ({ result, inputText }) => {
  if (!result) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      {/* Risk Badge - Slides up first */}
      <div className="flex justify-center">
        <RiskBadge riskLevel={result.riskLevel} />
      </div>

      {/* Confidence Circle - Appears and counts up */}
      <div className="flex justify-center">
        <ConfidenceCircle 
          confidence={result.confidence} 
          riskLevel={result.riskLevel} 
        />
      </div>

      {/* Explanation Panel - Bullets appear one by one */}
      <ExplanationPanel explanations={result.explanations} />

      {/* Highlighted Text - Shows keyword analysis */}
      {inputText && result.highlights && result.highlights.length > 0 && (
        <HighlightedText text={inputText} highlights={result.highlights} />
      )}

      {/* Feature Scores Chart - Animates last */}
      <RiskBarChart 
        featureScores={result.featureScores} 
        modelInfo={result.modelInfo} 
      />

      {/* Timestamp */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.8 }}
        className="text-center text-sm text-gray-500"
      >
        Analysis completed at {new Date(result.timestamp).toLocaleString()}
      </motion.div>
    </motion.div>
  );
};

export default ResultCard;
