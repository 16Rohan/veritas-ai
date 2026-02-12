
import { motion } from 'framer-motion';

interface ExplanationPanelProps {
    isCorrect: boolean;
    explanation: string;
    teachingPoint: string;
    onNext: () => void;
    isLastLesson: boolean;
}

const ExplanationPanel = ({ isCorrect, explanation, teachingPoint, onNext, isLastLesson }: ExplanationPanelProps) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`mt-6 p-6 rounded-xl border ${isCorrect ? 'border-risk-green/30 bg-risk-green/5' : 'border-risk-red/30 bg-risk-red/5'}`}
        >
            <h3 className={`text-xl font-bold mb-2 ${isCorrect ? 'text-risk-green' : 'text-risk-red'}`}>
                {isCorrect ? 'Correct Decision!' : 'Not Quite Right'}
            </h3>

            <p className="text-gray-300 mb-4 leading-relaxed">
                {explanation}
            </p>

            <div className="bg-black/20 p-4 rounded-lg mb-6 border border-white/5">
                <span className="text-neon-cyan font-bold uppercase text-xs tracking-wider block mb-1">
                    Key Takeaway
                </span>
                <p className="text-white font-medium">
                    {teachingPoint}
                </p>
            </div>

            <button
                onClick={onNext}
                className=" px-8 py-3 bg-gradient-to-r from-neon-cyan to-electric-purple text-white font-bold rounded-xl glow-cyan hover:scale-105 transition-transform"
            >
                {isLastLesson ? 'Complete Training' : 'Next Scenario ->'}
            </button>
        </motion.div>
    );
};

export default ExplanationPanel;
