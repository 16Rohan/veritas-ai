
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lesson } from '../../data/lessons';
import OptionButton from './OptionButton';
import ExplanationPanel from './ExplanationPanel';
import ProgressIndicator from './ProgressIndicator';

interface LessonCardProps {
    lesson: Lesson;
    lessonIndex: number;
    totalLessons: number;
    onComplete: (isCorrect: boolean) => void;
}

const LessonCard = ({ lesson, lessonIndex, totalLessons, onComplete }: LessonCardProps) => {
    const [selectedOption, setSelectedOption] = useState<number | null>(null);
    const [isRevelaled, setIsRevealed] = useState(false);

    const handleSelect = (index: number) => {
        setSelectedOption(index);
        setIsRevealed(true);
    };

    const handleNext = () => {
        onComplete(selectedOption === lesson.correctIndex);
        setSelectedOption(null);
        setIsRevealed(false);
    };

    return (
        <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            key={lesson.id}
            className="max-w-3xl mx-auto"
        >
            <ProgressIndicator total={totalLessons} current={lessonIndex} />

            <div className="glass p-8 rounded-2xl border border-white/10 relative overflow-hidden">
                {/* Background decorative element */}
                <div className="absolute top-0 right-0 p-32 bg-neon-cyan/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />

                <div className="relative z-10">
                    <div className="flex items-center justify-between mb-6">
                        <span className="px-3 py-1 bg-white/10 rounded-full text-xs font-mono text-gray-400 border border-white/5 uppercase tracking-wider">
                            {lesson.day}
                        </span>
                        <span className="text-gray-400 text-sm font-mono">
                            Scenario #{lesson.id}
                        </span>
                    </div>

                    <h2 className="text-3xl font-bold text-white mb-6 font-display">
                        {lesson.title}
                    </h2>

                    <div className="bg-black/30 p-6 rounded-xl border-l-4 border-neon-cyan mb-8">
                        <p className="text-gray-200 text-lg leading-relaxed whitespace-pre-wrap font-serif">
                            {lesson.scenario}
                        </p>
                    </div>

                    <h3 className="text-xl font-bold text-white mb-4">
                        {lesson.question}
                    </h3>

                    <div className="space-y-3">
                        {lesson.options.map((option, idx) => (
                            <OptionButton
                                key={idx}
                                text={option}
                                isSelected={selectedOption === idx}
                                isDisabled={isRevelaled}
                                isCorrect={isRevelaled ? idx === lesson.correctIndex : null}
                                onClick={() => handleSelect(idx)}
                            />
                        ))}
                    </div>

                    <AnimatePresence>
                        {isRevelaled && selectedOption !== null && (
                            <ExplanationPanel
                                isCorrect={selectedOption === lesson.correctIndex}
                                explanation={lesson.explanation}
                                teachingPoint={lesson.teachingPoint}
                                onNext={handleNext}
                                isLastLesson={lessonIndex === totalLessons - 1}
                            />
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </motion.div>
    );
};

export default LessonCard;
