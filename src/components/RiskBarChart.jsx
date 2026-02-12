import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const RiskBarChart = ({ featureScores, modelInfo }) => {
  const data = Object.entries(featureScores).map(([name, value]) => ({
    name,
    value
  }));

  const getBarColor = (value) => {
    if (value >= 70) return '#FF4C4C';
    if (value >= 40) return '#FFA500';
    return '#00FF88';
  };

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="glass rounded-lg p-3 border border-white/20">
          <p className="text-white font-semibold">{payload[0].payload.name}</p>
          <p className="text-neon-cyan font-mono">{payload[0].value}/100</p>
        </div>
      );
    }
    return null;
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3, delay: 0.7 }}
      className="glass rounded-xl p-6 border border-white/10"
    >
      <h4 className="text-lg font-semibold text-white mb-6 flex items-center font-display tracking-[0.14em] uppercase">
        <span className="mr-2">📊</span>
        Feature Scores
      </h4>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
          <XAxis type="number" domain={[0, 100]} stroke="#9CA3AF" />
          <YAxis dataKey="name" type="category" stroke="#9CA3AF" width={150} />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(0, 245, 255, 0.1)' }} />
          <Bar dataKey="value" radius={[0, 8, 8, 0]}>
            {data.map((entry, index) => (
              <Cell 
                key={`cell-${index}`} 
                fill={getBarColor(entry.value)}
                style={{
                  filter: `drop-shadow(0 0 8px ${getBarColor(entry.value)})`
                }}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>

      {modelInfo && (
        <div className="mt-6 pt-6 border-t border-white/10 space-y-2">
          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-400">Overall Confidence:</span>
            <span className="text-neon-cyan font-mono font-semibold">
              {modelInfo.confidence}% (CI: {modelInfo.confidenceInterval})
            </span>
          </div>
          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-400">Model Version:</span>
            <span className="text-electric-purple font-mono">{modelInfo.model}</span>
          </div>
          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-400">Analysis Time:</span>
            <span className="text-soft-blue font-mono">{modelInfo.analysisTime}</span>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default RiskBarChart;
