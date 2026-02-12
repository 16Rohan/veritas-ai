import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, Legend } from 'recharts';
import { getDashboardStats } from '../utils/dashboardApi';
import RiskBadge from '../components/RiskBadge';

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadStats = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getDashboardStats();
        setStats(data);
      } catch (err) {
        console.error('Failed to load dashboard stats:', err);
        setError(err instanceof Error ? err.message : 'Failed to load dashboard');
      } finally {
        setLoading(false);
      }
    };
    loadStats();
  }, []);

  const COLORS = {
    Email: '#00F5FF',
    Message: '#8A2BE2',
    Link: '#1E90FF',
    News: '#FFA500'
  };

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="glass rounded-lg p-3 border border-white/20">
          <p className="text-white font-semibold">{payload[0].name}</p>
          <p className="text-neon-cyan">{payload[0].value} scans</p>
        </div>
      );
    }
    return null;
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-24 pb-12 px-4 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-neon-cyan mx-auto mb-4"></div>
          <p className="text-gray-400">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen pt-24 pb-12 px-4 flex items-center justify-center">
        <div className="text-center max-w-md">
          <p className="text-red-400 mb-2">Failed to load dashboard data.</p>
          <p className="text-gray-400 text-sm">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-12 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold gradient-text mb-4 font-display tracking-[0.18em] uppercase">
            Analytics Dashboard
          </h1>
          <p className="text-gray-400 text-lg mb-8 font-serif">
            Overview of your security scans and threat detection statistics.
          </p>
        </motion.div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.1, ease: 'easeOut' }}
            whileHover={{ y: -6, scale: 1.02 }}
            className="glass rounded-2xl p-6 border border-white/10 hover:border-neon-cyan/30 transition-fast"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-400">Total Scans</span>
              <span className="text-2xl">📊</span>
            </div>
            <div className="text-3xl font-bold gradient-text">
              {stats.summary.totalScans.toLocaleString()}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.15, ease: 'easeOut' }}
            whileHover={{ y: -6, scale: 1.02 }}
            className="glass rounded-2xl p-6 border border-risk-red/30 hover:border-risk-red transition-fast glow-red"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-400">High Risk</span>
              <span className="text-2xl">⚠️</span>
            </div>
            <div className="text-3xl font-bold text-risk-red animate-glow-pulse">
              {stats.summary.highRisk}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.2, ease: 'easeOut' }}
            whileHover={{ y: -6, scale: 1.02 }}
            className="glass rounded-2xl p-6 border border-risk-amber/30 hover:border-risk-amber transition-fast glow-amber"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-400">Suspicious</span>
              <span className="text-2xl">⚡</span>
            </div>
            <div className="text-3xl font-bold text-risk-amber">
              {stats.summary.suspicious}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.25, ease: 'easeOut' }}
            whileHover={{ y: -6, scale: 1.02 }}
            className="glass rounded-2xl p-6 border border-risk-green/30 hover:border-risk-green transition-fast glow-green"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-400">Safe</span>
              <span className="text-2xl">✓</span>
            </div>
            <div className="text-3xl font-bold text-risk-green">
              {stats.summary.safe}
            </div>
          </motion.div>
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Pie Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.3 }}
            className="glass rounded-2xl p-6 border border-white/10"
          >
            <h3 className="text-xl font-bold text-white mb-6 font-display tracking-[0.12em] uppercase">
              Scans by Type
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={stats.scansByType}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {stats.scansByType.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[entry.name]} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Line Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.35 }}
            className="glass rounded-2xl p-6 border border-white/10"
          >
            <h3 className="text-xl font-bold text-white mb-6 font-display tracking-[0.12em] uppercase">
              Risk Trends (Last 7 Days)
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={stats.riskTrend}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis dataKey="date" stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'rgba(11, 15, 20, 0.9)',
                    border: '1px solid rgba(255,255,255,0.2)',
                    borderRadius: '8px'
                  }}
                />
                <Legend />
                <Line type="monotone" dataKey="highRisk" stroke="#FF4C4C" strokeWidth={2} name="High Risk" />
                <Line type="monotone" dataKey="suspicious" stroke="#FFA500" strokeWidth={2} name="Suspicious" />
                <Line type="monotone" dataKey="safe" stroke="#00FF88" strokeWidth={2} name="Safe" />
              </LineChart>
            </ResponsiveContainer>
          </motion.div>
        </div>

        {/* Recent Scans Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.4 }}
          className="glass rounded-2xl p-6 border border-white/10 mb-8"
        >
          <h3 className="text-xl font-bold text-white mb-6 font-display tracking-[0.12em] uppercase">
            Recent Scans
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left py-3 px-4 text-gray-400 font-semibold">Type</th>
                  <th className="text-left py-3 px-4 text-gray-400 font-semibold">Risk Level</th>
                  <th className="text-left py-3 px-4 text-gray-400 font-semibold">Confidence</th>
                  <th className="text-left py-3 px-4 text-gray-400 font-semibold">Date</th>
                  <th className="text-left py-3 px-4 text-gray-400 font-semibold">Preview</th>
                </tr>
              </thead>
              <tbody>
                {stats.recentScans.map((scan) => (
                  <motion.tr
                    key={scan.id}
                    whileHover={{ backgroundColor: 'rgba(255,255,255,0.05)' }}
                    className="border-b border-white/5 transition-fast"
                  >
                    <td className="py-4 px-4">
                      <span className="text-white font-medium">{scan.type}</span>
                    </td>
                    <td className="py-4 px-4">
                      <div className="inline-block scale-75 origin-left">
                        <RiskBadge riskLevel={scan.riskLevel} />
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <span className="text-neon-cyan font-mono">{scan.confidence}%</span>
                    </td>
                    <td className="py-4 px-4">
                      <span className="text-gray-400 text-sm">{scan.date}</span>
                    </td>
                    <td className="py-4 px-4">
                      <span className="text-gray-400 text-sm truncate max-w-xs block">
                        {scan.preview}
                      </span>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Top Threats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.45 }}
          className="glass rounded-2xl p-6 border border-white/10"
        >
          <h3 className="text-xl font-bold text-white mb-6 font-display tracking-[0.12em] uppercase">
            Most Common Threat Types
          </h3>
          <div className="space-y-4">
            {stats.topThreats.map((threat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.5 + index * 0.05 }}
                className="flex items-center space-x-4"
              >
                <div className="flex-1">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-white font-medium">{threat.type}</span>
                    <span className="text-gray-400 text-sm">{threat.count} incidents</span>
                  </div>
                  <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${threat.percentage}%` }}
                      transition={{ duration: 0.3, delay: 0.5 + index * 0.05 }}
                      className="h-full bg-gradient-to-r from-risk-red to-risk-amber"
                      style={{
                        boxShadow: '0 0 10px rgba(255, 76, 76, 0.5)'
                      }}
                    />
                  </div>
                </div>
                <span className="text-neon-cyan font-bold text-lg w-16 text-right">
                  {threat.percentage}%
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;
