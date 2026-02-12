import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useCallback } from 'react';
import Particles from 'react-tsparticles';
import { loadSlim } from 'tsparticles-slim';
import FeatureCard from '../components/FeatureCard';

const Home = () => {
  const navigate = useNavigate();

  const particlesInit = useCallback(async (engine) => {
    await loadSlim(engine);
  }, []);

  const particlesConfig = {
    particles: {
      number: {
        value: 30,
        density: {
          enable: true,
          value_area: 800
        }
      },
      color: {
        value: ['#00F5FF', '#8A2BE2', '#1E90FF']
      },
      opacity: {
        value: 0.3,
        random: true
      },
      size: {
        value: 2,
        random: true
      },
      move: {
        enable: true,
        speed: 0.5,
        direction: 'none',
        random: true,
        straight: false,
        outModes: {
          default: 'out'
        }
      },
      links: {
        enable: true,
        distance: 150,
        color: '#00F5FF',
        opacity: 0.2,
        width: 1
      }
    },
    interactivity: {
      events: {
        onHover: {
          enable: true,
          mode: 'grab'
        }
      },
      modes: {
        grab: {
          distance: 140,
          links: {
            opacity: 0.4
          }
        }
      }
    },
    detectRetina: true
  };

  const scrollToScanners = () => {
    navigate('/email');
  };

  return (
    <div className="relative min-h-screen">
      {/* Subtle Particle Background */}
      <div className="fixed inset-0 z-0">
        <Particles
          id="tsparticles"
          init={particlesInit}
          options={particlesConfig}
          className="absolute inset-0"
        />
      </div>

      {/* Animated Gradient Background */}
      <div className="fixed inset-0 animated-gradient z-0" />

      {/* Content */}
      <div className="relative z-10">
        {/* Hero Section */}
        <section className="min-h-screen flex items-center justify-center px-4 pt-20">
          <div className="max-w-5xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
            >
              <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight font-display tracking-[0.18em] uppercase">
                <span className="gradient-text block">
                  AI-Powered Cross-Platform
                </span>
                <br />
                <span className="text-white block">
                  Scam & Misinformation Detection
                </span>
              </h1>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1, ease: 'easeOut' }}
              className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto font-serif"
            >
              Analyze emails, BEC'S, links, and news in real-time using explainable machine learning.
            </motion.p>

            <motion.button
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2, ease: 'easeOut' }}
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.98 }}
              onClick={scrollToScanners}
              className="px-8 py-4 bg-gradient-to-r from-neon-cyan to-electric-purple rounded-xl font-bold text-lg text-white glow-cyan transition-fast"
            >
              Start Scanning
            </motion.button>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3, ease: 'easeOut' }}
              className="mt-16 grid grid-cols-3 gap-8 max-w-2xl mx-auto"
            >
              <motion.div
                whileHover={{ y: -6, scale: 1.03 }}
                transition={{ type: 'spring', stiffness: 220, damping: 18 }}
                className="glass rounded-xl p-4 float-slow"
              >
                <div className="text-3xl font-bold gradient-text font-display tracking-[0.14em] uppercase">
                  1247
                </div>
                <div className="text-sm text-gray-400 mt-1">Scans Completed</div>
              </motion.div>
              <motion.div
                whileHover={{ y: -6, scale: 1.03 }}
                transition={{ type: 'spring', stiffness: 220, damping: 18 }}
                className="glass rounded-xl p-4"
              >
                <div className="text-3xl font-bold gradient-text animate-glow-pulse font-display tracking-[0.14em] uppercase">
                  87%
                </div>
                <div className="text-sm text-gray-400 mt-1">Accuracy Rate</div>
              </motion.div>
              <motion.div
                whileHover={{ y: -6, scale: 1.03 }}
                transition={{ type: 'spring', stiffness: 220, damping: 18 }}
                className="glass rounded-xl p-4"
              >
                <div className="text-3xl font-bold gradient-text font-display tracking-[0.14em] uppercase">
                  342
                </div>
                <div className="text-sm text-gray-400 mt-1">Threats Blocked</div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* About Section */}
        <section className="py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3 }}
              className="glass rounded-2xl p-8 md:p-12 border border-white/10"
            >
              <h2 className="text-3xl md:text-4xl font-bold gradient-text mb-6 font-display tracking-[0.18em] uppercase">
                Why VeritasAI?
              </h2>
              <div className="space-y-4 text-gray-300 leading-relaxed font-serif">
                <p>
                  In today's digital landscape, misinformation spreads rapidly across platforms, 
                  threatening individuals and organizations alike. Sophisticated scams, phishing 
                  attempts, deepfakes, and fake domains have become increasingly difficult to detect.
                </p>
                <p>
                  <strong className="text-white">VeritasAI</strong> leverages cutting-edge machine 
                  learning to provide real-time, multi-lingual threat detection across emails, 
                  messages, links, and news articles. Our explainable AI approach ensures transparency, 
                  giving you detailed insights into why content is flagged.
                </p>
                <p>
                  Built on ethical AI principles, VeritasAI empowers users with the knowledge to 
                  make informed decisions and stay protected in an increasingly complex digital world.
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3 }}
              className="text-3xl md:text-4xl font-bold text-center gradient-text mb-12 font-display tracking-[0.18em] uppercase"
            >
              Advanced Detection Capabilities
            </motion.h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FeatureCard
                icon="📝"
                title="NLP-based Text Analysis"
                description="Advanced linguistic pattern detection with sentiment and urgency analysis. Identifies emotional manipulation, grammar anomalies, and phishing patterns."
                delay={0}
              />
              <FeatureCard
                icon="👁️"
                title="Vision-Language Detection"
                description="Correlates images with text content to detect deepfakes and visual manipulation. Analyzes consistency between visual and textual information."
                delay={0.1}
              />
              <FeatureCard
                icon="🔗"
                title="Network & Pattern Intelligence"
                description="Comprehensive domain reputation analysis with link chain tracking. Detects typosquatting, hidden redirects, and malicious hosting patterns."
                delay={0.2}
              />
              <FeatureCard
                icon="🔍"
                title="Provenance Tracking"
                description="Verifies source authenticity and tracks content across platforms. Cross-references claims with credible sources and fact-checking databases."
                delay={0.3}
              />
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3 }}
              className="glass rounded-2xl p-12 border border-white/10"
            >
              <h2 className="text-3xl md:text-4xl font-bold gradient-text mb-6 font-display tracking-[0.18em] uppercase">
                Ready to Protect Yourself?
              </h2>
              <p className="text-xl text-gray-300 mb-8 font-serif">
                Start analyzing suspicious content with our AI-powered detection system.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => navigate('/email')}
                  className="px-6 py-3 bg-gradient-to-r from-neon-cyan to-electric-purple rounded-xl font-bold text-white glow-cyan transition-fast"
                >
                  Email Scanner
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => navigate('/message')}
                  className="px-6 py-3 glass rounded-xl font-bold text-white hover:glow-cyan transition-fast border border-white/20"
                >
                  Message Scanner
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => navigate('/link')}
                  className="px-6 py-3 glass rounded-xl font-bold text-white hover:glow-cyan transition-fast border border-white/20"
                >
                  Link Scanner
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => navigate('/news')}
                  className="px-6 py-3 glass rounded-xl font-bold text-white hover:glow-cyan transition-fast border border-white/20"
                >
                  News Detector
                </motion.button>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;
