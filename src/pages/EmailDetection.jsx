import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { analyzeEmail } from '../utils/mockApi';
import LoadingSpinner from '../components/LoadingSpinner';
import ResultCard from '../components/ResultCard';

const EmailDetection = () => {
  const [emailText, setEmailText] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState(null);

  const handleAnalyze = async () => {
    if (!emailText.trim()) return;

    setIsAnalyzing(true);
    setResult(null);

    try {
      const analysisResult = await analyzeEmail(emailText);
      setResult(analysisResult);
    } catch (error) {
      console.error('Analysis error:', error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleReset = () => {
    setEmailText('');
    setResult(null);
  };

  return (
    <div className="min-h-screen pt-24 pb-12 px-4">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold gradient-text mb-4 font-display tracking-[0.18em] uppercase">
            Email Scanner
          </h1>
          <p className="text-gray-400 text-lg mb-8 font-serif">
            Analyze emails for phishing attempts, scams, and malicious content using advanced NLP and domain intelligence.
          </p>
        </motion.div>

        {/* Input Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="glass rounded-2xl p-6 md:p-8 border border-white/10 mb-8"
        >
          <label htmlFor="email-input" className="block text-white font-semibold mb-3">
            Paste Email Content
          </label>
          <textarea
            id="email-input"
            value={emailText}
            onChange={(e) => setEmailText(e.target.value)}
            placeholder="Paste the email content here, including sender information, subject, and body text..."
            className="w-full h-64 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-neon-cyan focus:glow-cyan transition-fast resize-none"
            disabled={isAnalyzing}
          />

          <div className="mt-6 flex flex-wrap gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleAnalyze}
              disabled={isAnalyzing || !emailText.trim()}
              className="px-8 py-3 bg-gradient-to-r from-neon-cyan to-electric-purple rounded-xl font-bold text-white glow-cyan transition-fast disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isAnalyzing ? 'Analyzing...' : 'Analyze Email'}
            </motion.button>

            {(result || emailText) && (
              <motion.button
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleReset}
                className="px-8 py-3 glass rounded-xl font-bold text-white hover:glow-cyan transition-fast border border-white/20"
              >
                Reset
              </motion.button>
            )}
          </div>

          {/* Example Button */}
          <div className="mt-4">
            <button
              onClick={() => setEmailText('URGENT: Your account has been suspended!\n\nDear valued customer,\n\nWe detected suspicious activity on your PayPal account. Please verify your account immediately by clicking here: http://paypa1-secure.tk/verify\n\nFailure to verify within 24 hours will result in permanent account closure.\n\nBest regards,\nPayPal Security Team')}
              className="text-sm text-neon-cyan hover:text-electric-purple transition-fast underline"
              disabled={isAnalyzing}
            >
              Load Example (High Risk)
            </button>
          </div>
        </motion.div>

        {/* Results Section */}
        <AnimatePresence mode="wait">
          {isAnalyzing && (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="glass rounded-2xl p-8 border border-white/10"
            >
              <LoadingSpinner />
            </motion.div>
          )}

          {!isAnalyzing && result && (
            <motion.div
              key="result"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="glass rounded-2xl p-6 md:p-8 border border-white/10"
            >
              <ResultCard result={result} inputText={emailText} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default EmailDetection;
