import React, { useState } from 'react';
import { X, Mail, Lock, Loader2, AlertCircle, CloudOff } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export default function AuthModal({ isOpen, onClose }) {
  const [mode, setMode] = useState('signin'); // 'signin' or 'signup'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const { signIn, signUp, error, clearError, isConfigured } = useAuth();

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSuccessMessage('');
    clearError();

    if (mode === 'signup') {
      const { error } = await signUp(email, password);
      if (!error) {
        setSuccessMessage('Check your email to confirm your account!');
        setEmail('');
        setPassword('');
      }
    } else {
      const { error } = await signIn(email, password);
      if (!error) {
        onClose();
      }
    }

    setIsSubmitting(false);
  };

  const toggleMode = () => {
    setMode(mode === 'signin' ? 'signup' : 'signin');
    clearError();
    setSuccessMessage('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-md bg-slate-900 rounded-2xl border border-slate-700 shadow-2xl">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors"
        >
          <X size={20} />
        </button>

        <div className="p-6">
          {/* Header */}
          <h2 className="text-2xl font-bold text-white mb-2">
            {mode === 'signin' ? 'Welcome Back' : 'Create Account'}
          </h2>
          <p className="text-slate-400 mb-6">
            {mode === 'signin'
              ? 'Sign in to sync your progress across devices'
              : 'Sign up to save your learning journey'}
          </p>

          {/* Not configured warning */}
          {!isConfigured && (
            <div className="flex items-start gap-3 p-4 bg-amber-900/20 border border-amber-800/50 rounded-lg mb-6">
              <CloudOff size={20} className="text-amber-400 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-amber-300 font-medium">Offline Mode</p>
                <p className="text-amber-400/70 text-sm">
                  Authentication is not configured. Your progress is saved locally.
                </p>
              </div>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Email
              </label>
              <div className="relative">
                <Mail
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
                />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  required
                  disabled={!isConfigured}
                  className="w-full pl-10 pr-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
                />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                  minLength={6}
                  disabled={!isConfigured}
                  className="w-full pl-10 pr-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
                />
              </div>
              {mode === 'signup' && (
                <p className="text-slate-500 text-xs mt-1">
                  Must be at least 6 characters
                </p>
              )}
            </div>

            {/* Error message */}
            {error && (
              <div className="flex items-center gap-2 p-3 bg-rose-900/20 border border-rose-800/50 rounded-lg">
                <AlertCircle size={18} className="text-rose-400 flex-shrink-0" />
                <p className="text-rose-300 text-sm">{error}</p>
              </div>
            )}

            {/* Success message */}
            {successMessage && (
              <div className="p-3 bg-green-900/20 border border-green-800/50 rounded-lg">
                <p className="text-green-300 text-sm">{successMessage}</p>
              </div>
            )}

            {/* Submit button */}
            <button
              type="submit"
              disabled={isSubmitting || !isConfigured}
              className="w-full py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg text-white font-semibold hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  {mode === 'signin' ? 'Signing in...' : 'Creating account...'}
                </>
              ) : (
                mode === 'signin' ? 'Sign In' : 'Create Account'
              )}
            </button>
          </form>

          {/* Toggle mode */}
          <div className="mt-6 text-center">
            <p className="text-slate-400 text-sm">
              {mode === 'signin' ? "Don't have an account? " : 'Already have an account? '}
              <button
                onClick={toggleMode}
                className="text-purple-400 hover:text-purple-300 font-medium"
              >
                {mode === 'signin' ? 'Sign up' : 'Sign in'}
              </button>
            </p>
          </div>

          {/* Continue as guest */}
          <div className="mt-4 text-center">
            <button
              onClick={onClose}
              className="text-slate-500 hover:text-slate-400 text-sm"
            >
              Continue as guest
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
