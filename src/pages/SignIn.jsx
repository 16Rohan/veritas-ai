import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { authService } from '../utils/authService';

const SignIn = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isSignUp) {
        if (!username.trim() || !email.trim() || !password.trim()) {
          setError('Please fill in all fields');
          setLoading(false);
          return;
        }
        const response = await authService.signUp(username, email, password);
        authService.setToken(response.token);
        authService.setUser(response.user);
      } else {
        if (!email.trim() || !password.trim()) {
          setError('Please enter email and password');
          setLoading(false);
          return;
        }
        const response = await authService.signIn(email, password);
        authService.setToken(response.token);
        authService.setUser(response.user);
      }
      navigate('/dashboard');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Authentication failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="w-full max-w-md"
      >
        <div className="glass rounded-2xl p-8 border border-white/10">
          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-neon-cyan to-electric-purple flex items-center justify-center mx-auto mb-4 glow-cyan">
              <span className="text-white font-bold text-2xl font-display tracking-wide">
                V
              </span>
            </div>
            <h1 className="text-3xl font-bold gradient-text mb-2 font-display tracking-[0.18em] uppercase">
              Welcome to VeritasAI
            </h1>
            <p className="text-gray-400 font-serif">
              {isSignUp ? 'Create an account' : 'Sign in to access your security dashboard'}
            </p>
          </div>

          {error && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mb-4 p-3 bg-red-500/20 border border-red-500/50 rounded-lg text-red-400 text-sm"
            >
              {error}
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {isSignUp && (
              <div>
                <label htmlFor="username" className="block text-white font-semibold mb-2">
                  Username
                </label>
                <input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter your username"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-neon-cyan focus:glow-cyan transition-fast"
                  required={isSignUp}
                />
              </div>
            )}

            <div>
              <label htmlFor="email" className="block text-white font-semibold mb-2">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-neon-cyan focus:glow-cyan transition-fast"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-white font-semibold mb-2">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-neon-cyan focus:glow-cyan transition-fast"
                required
              />
            </div>

            <motion.button
              type="submit"
              disabled={loading}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="w-full px-8 py-3 bg-gradient-to-r from-neon-cyan to-electric-purple rounded-xl font-bold text-white glow-cyan transition-fast disabled:opacity-50"
            >
              {loading ? 'Loading...' : isSignUp ? 'Sign Up' : 'Sign In'}
            </motion.button>
          </form>

          <div className="mt-6 text-center text-sm text-gray-400">
            <p>
              {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
              <button
                type="button"
                onClick={() => {
                  setIsSignUp(!isSignUp);
                  setError('');
                  setUsername('');
                  setEmail('');
                  setPassword('');
                }}
                className="text-neon-cyan hover:text-electric-purple transition-fast font-semibold"
              >
                {isSignUp ? 'Sign In' : 'Sign Up'}
              </button>
            </p>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          className="mt-6 text-center text-sm text-gray-400"
        >
          <p>
            By signing in, you agree to our{' '}
            <a href="#" className="text-neon-cyan hover:text-electric-purple transition-fast">
              Terms of Service
            </a>{' '}
            and{' '}
            <a href="#" className="text-neon-cyan hover:text-electric-purple transition-fast">
              Privacy Policy
            </a>
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default SignIn;
