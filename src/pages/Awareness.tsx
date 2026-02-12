import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { awarenessData, categories, severities } from '../data/awarenessData';
import { AwarenessCard } from '../components/awareness/AwarenessCard';

const Awareness = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedSeverity, setSelectedSeverity] = useState<string | null>(null);

  // Filter data based on selections
  const filteredData = useMemo(() => {
    return awarenessData.filter(item => {
      const categoryMatch = !selectedCategory || item.category === selectedCategory;
      const severityMatch = !selectedSeverity || item.severity === selectedSeverity;
      return categoryMatch && severityMatch;
    });
  }, [selectedCategory, selectedSeverity]);

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 relative overflow-hidden">
      {/* Animated background grid */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black to-black/80" />
        <motion.div
          className="absolute inset-0 opacity-5"
          animate={{ backgroundPosition: ['0% 0%', '100% 100%'] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          style={{
            backgroundImage: 'linear-gradient(45deg, rgba(34, 211, 238, 0.1) 1px, transparent 1px)',
            backgroundSize: '50px 50px'
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <h1 className="text-5xl font-bold gradient-text mb-4 font-display tracking-[0.18em] uppercase">
            Cyber Threat Intelligence
          </h1>
          <p className="text-lg text-gray-400 mb-6 max-w-2xl mx-auto font-serif">
            Real-world awareness of evolving cyber-fraud tactics. Advanced detection tools alone are insufficient without user literacy and situational awareness.
          </p>

          {/* Divider */}
          <motion.div
            className="h-px bg-gradient-to-r from-transparent via-neon-cyan to-transparent mx-auto mb-8 relative"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 3, repeat: Infinity }}
            style={{
              boxShadow: '0 0 20px rgba(34, 211, 238, 0.5)'
            }}
          />

          <p className="text-sm text-gray-500 italic">
            Educational Module
          </p>
        </motion.div>

        {/* Filter Controls */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-12 flex flex-wrap gap-4 justify-center items-center"
        >
          {/* Category Filter */}
          <div className="flex gap-2 flex-wrap">
            <span className="text-sm font-bold text-gray-400 self-center">Category:</span>
            <motion.button
              onClick={() => setSelectedCategory(null)}
              className={`px-3 py-2 rounded-full text-xs font-semibold border transition-all ${
                selectedCategory === null
                  ? 'bg-neon-cyan/20 border-neon-cyan/50 text-neon-cyan'
                  : 'bg-white/5 border-white/10 text-gray-400 hover:border-white/20'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              All
            </motion.button>
            {categories.map(cat => (
              <motion.button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-2 rounded-full text-xs font-semibold border transition-all ${
                  selectedCategory === cat
                    ? 'bg-electric-purple/20 border-electric-purple/50 text-electric-purple'
                    : 'bg-white/5 border-white/10 text-gray-400 hover:border-white/20'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {cat}
              </motion.button>
            ))}
          </div>

          {/* Severity Filter */}
          <div className="flex gap-2 flex-wrap">
            <span className="text-sm font-bold text-gray-400 self-center">Severity:</span>
            <motion.button
              onClick={() => setSelectedSeverity(null)}
              className={`px-3 py-2 rounded-full text-xs font-semibold border transition-all ${
                selectedSeverity === null
                  ? 'bg-neon-cyan/20 border-neon-cyan/50 text-neon-cyan'
                  : 'bg-white/5 border-white/10 text-gray-400 hover:border-white/20'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              All
            </motion.button>
            {severities.map(sev => (
              <motion.button
                key={sev}
                onClick={() => setSelectedSeverity(sev)}
                className={`px-3 py-2 rounded-full text-xs font-semibold border transition-all ${
                  selectedSeverity === sev
                    ? 'bg-electric-purple/20 border-electric-purple/50 text-electric-purple'
                    : 'bg-white/5 border-white/10 text-gray-400 hover:border-white/20'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {sev}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Results Count */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="mb-6 text-center text-sm text-gray-500"
        >
          Showing {filteredData.length} of {awarenessData.length} intelligence items
        </motion.div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredData.map((item, idx) => (
            <AwarenessCard key={item.id} item={item} index={idx} />
          ))}
        </div>

        {/* No Results */}
        {filteredData.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <p className="text-gray-400 text-lg">No threats match your filter criteria.</p>
            <motion.button
              onClick={() => {
                setSelectedCategory(null);
                setSelectedSeverity(null);
              }}
              className="mt-4 px-4 py-2 bg-neon-cyan/20 border border-neon-cyan/50 rounded-lg text-neon-cyan text-sm font-semibold hover:bg-neon-cyan/30 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Reset Filters
            </motion.button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Awareness;
