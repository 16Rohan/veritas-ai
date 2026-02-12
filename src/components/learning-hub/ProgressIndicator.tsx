
import { motion } from 'framer-motion';

interface ProgressIndicatorProps {
    total: number;
    current: number;
}

const ProgressIndicator = ({ total, current }: ProgressIndicatorProps) => {
    return (
        <div className="flex items-center space-x-2 mb-8">
            {Array.from({ length: total }).map((_, i) => (
                <div key={i} className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: i < current ? '100%' : i === current ? '50%' : '0%' }}
                        className={`h-full ${i < current ? 'bg-risk-green' : i === current ? 'bg-neon-cyan' : 'bg-transparent'}`}
                    />
                </div>
            ))}
            <span className="ml-4 text-neon-cyan font-mono text-sm">
                Day {current + 1}/{total}
            </span>
        </div>
    );
};

export default ProgressIndicator;
