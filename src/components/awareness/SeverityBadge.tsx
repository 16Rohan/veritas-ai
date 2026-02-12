import { motion } from 'framer-motion';

interface SeverityBadgeProps {
  severity: "Low" | "Medium" | "High";
}

export const SeverityBadge = ({ severity }: SeverityBadgeProps) => {
  const colors = {
    Low: { bg: "rgba(34, 197, 94, 0.1)", border: "border-green-500/50", dot: "bg-green-400", glow: "shadow-lg shadow-green-500/20" },
    Medium: { bg: "rgba(251, 146, 60, 0.1)", border: "border-orange-500/50", dot: "bg-orange-400", glow: "shadow-lg shadow-orange-500/20" },
    High: { bg: "rgba(239, 68, 68, 0.1)", border: "border-red-500/50", dot: "bg-red-400", glow: "shadow-lg shadow-red-500/20" }
  };

  const config = colors[severity];

  return (
    <div className={`flex items-center gap-2 px-3 py-1 rounded-full border ${config.border}`} style={{ backgroundColor: config.bg }}>
      <motion.div
        className={`w-2 h-2 rounded-full ${config.dot} ${config.glow}`}
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
      />
      <span className="text-xs font-semibold text-gray-300">{severity}</span>
    </div>
  );
};
