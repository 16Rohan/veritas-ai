
import { useState } from 'react';
import { motion } from 'framer-motion';
import { lessons } from '../data/lessons';
import LessonCard from '../components/learning-hub/LessonCard';

const LearningHub = () => {
    const [currentLessonIndex, setCurrentLessonIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [isCompleted, setIsCompleted] = useState(false);

    const handleLessonComplete = (isCorrect: boolean) => {
        if (isCorrect) setScore(s => s + 1);

        if (currentLessonIndex < lessons.length - 1) {
            setCurrentLessonIndex(prev => prev + 1);
        } else {
            setIsCompleted(true);
        }
    };

    const restart = () => {
        setCurrentLessonIndex(0);
        setScore(0);
        setIsCompleted(false);
    };

    return (
        <div className="min-h-screen pt-24 pb-12 px-4 relative">
            {/* Background elements */}
            <div className="absolute top-20 left-10 w-64 h-64 bg-electric-purple/10 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute bottom-20 right-10 w-64 h-64 bg-neon-cyan/10 rounded-full blur-[100px] pointer-events-none" />

            <div className="max-w-5xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-12"
                >
                    <h1 className="text-4xl md:text-5xl font-bold gradient-text mb-4 font-display tracking-[0.18em] uppercase">
                        Security Training Hub
                    </h1>
                    <p className="text-gray-400 text-lg font-serif max-w-2xl mx-auto">
                        Step into the shoes of John Doe for a week.
                        Can you navigate daily cyber threats without falling victim?
                    </p>
                </motion.div>

                {!isCompleted ? (
                    <LessonCard
                        lesson={lessons[currentLessonIndex]}
                        lessonIndex={currentLessonIndex}
                        totalLessons={lessons.length}
                        onComplete={handleLessonComplete}
                    />
                ) : (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="max-w-2xl mx-auto glass p-10 rounded-2xl border border-white/10 text-center"
                    >
                        <div className="w-20 h-20 bg-neon-cyan/20 rounded-full flex items-center justify-center mx-auto mb-6 border border-neon-cyan/50">
                            <span className="text-4xl">🏆</span>
                        </div>

                        <h2 className="text-3xl font-bold text-white mb-4">
                            Training Complete!
                        </h2>

                        <p className="text-gray-300 text-lg mb-8">
                            You correctly identified <span className="text-neon-cyan font-bold">{score}</span> out of <span className="text-white font-bold">{lessons.length}</span> threats.
                        </p>

                        <div className="bg-white/5 p-6 rounded-xl border border-white/10 mb-8 text-left">
                            <h3 className="text-white font-bold mb-4 uppercase text-sm tracking-wider">Key Skills Developed:</h3>
                            <ul className="space-y-2">
                                <li className="flex items-center text-gray-300">
                                    <span className="text-neon-cyan mr-2">✓</span> Domain Scrutiny (Phishing)
                                </li>
                                <li className="flex items-center text-gray-300">
                                    <span className="text-neon-cyan mr-2">✓</span> Behavioral Pause (Malicious Links)
                                </li>
                                <li className="flex items-center text-gray-300">
                                    <span className="text-neon-cyan mr-2">✓</span> Process Validation (Social Engineering)
                                </li>
                                <li className="flex items-center text-gray-300">
                                    <span className="text-neon-cyan mr-2">✓</span> Source Verification (Fake News)
                                </li>
                                <li className="flex items-center text-gray-300">
                                    <span className="text-neon-cyan mr-2">✓</span> Zero-Trust Mindset (AI Impersonation)
                                </li>
                            </ul>
                        </div>

                        <button
                            onClick={restart}
                            className="px-8 py-3 glass rounded-xl font-bold text-white hover:bg-white/10 transition-colors border border-white/20"
                        >
                            Restart Simulation
                        </button>
                    </motion.div>
                )}
            </div>
        </div>
    );
};

export default LearningHub;
