
import { motion } from 'framer-motion';

interface OptionButtonProps {
    text: string;
    isSelected: boolean;
    isDisabled: boolean;
    isCorrect: boolean | null; // null if not yet revealed
    onClick: () => void;
}

const OptionButton = ({ text, isSelected, isDisabled, isCorrect, onClick }: OptionButtonProps) => {
    let borderColor = 'border-white/10';
    let bgColor = 'bg-white/5';
    let textColor = 'text-gray-300';

    if (isSelected || (isDisabled && isCorrect)) {
        // If selected or revealed as correct
        if (isCorrect) {
            borderColor = 'border-risk-green';
            bgColor = 'bg-risk-green/10';
            textColor = 'text-risk-green';
        } else if (isCorrect === false && isSelected) {
            borderColor = 'border-risk-red';
            bgColor = 'bg-risk-red/10';
            textColor = 'text-risk-red';
        }
    }

    return (
        <motion.button
            whileHover={!isDisabled ? { scale: 1.02, backgroundColor: 'rgba(255,255,255,0.1)' } : {}}
            whileTap={!isDisabled ? { scale: 0.98 } : {}}
            onClick={onClick}
            disabled={isDisabled}
            className={`w-full text-left p-4 rounded-xl border ${borderColor} ${bgColor} ${textColor} transition-all duration-300 mb-3 flex items-start group`}
        >
            <div className={`mt-1 mr-3 w-4 h-4 rounded-full border flex-shrink-0 flex items-center justify-center
        ${isSelected
                    ? (isCorrect ? 'border-risk-green bg-risk-green' : 'border-risk-red bg-risk-red')
                    : 'border-gray-500 group-hover:border-neon-cyan'
                }
      `}>
                {isSelected && (
                    <motion.svg initial={{ scale: 0 }} animate={{ scale: 1 }} className="w-3 h-3 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </motion.svg>
                )}
            </div>
            <span className="leading-relaxed font-medium">{text}</span>
        </motion.button>
    );
};

export default OptionButton;
