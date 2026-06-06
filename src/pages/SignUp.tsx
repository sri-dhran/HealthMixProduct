import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

export function SignUp() {
  const [step, setStep] = useState(1);
  const [identifier, setIdentifier] = useState('');
  const [otp, setOtp] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    try {
      await axios.post('/api/auth/register', { identifier });
      setStep(2);
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to send OTP');
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    try {
      await axios.post('/api/auth/verify', { identifier, otp });
      setStep(3);
    } catch (err: any) {
      setError(err.response?.data?.error || 'Invalid OTP');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    try {
      await axios.post('/api/auth/set-password', { identifier, password });
      // After setting password, auto-login
      const res = await axios.post('/api/auth/login', { identifier, password });
      if (res.data.token) {
        login(res.data.token, identifier);
        navigate('/');
      }
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to set password');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-50 flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full bg-white rounded-3xl shadow-xl overflow-hidden"
      >
        <div className="bg-[#2E7D32] p-8 text-center">
          <Link to="/" className="inline-block mb-4 text-white hover:text-amber-200 transition-colors">
            ← Back to Home
          </Link>
          <h2 className="text-3xl font-bold text-white mb-2">Join HealthMix</h2>
          <p className="text-[#E8F5E9]">Create your account in seconds</p>
        </div>

        <div className="p-8">
          {error && (
            <div className="bg-red-50 text-red-600 p-3 rounded-lg mb-4 text-sm">
              {error}
            </div>
          )}

          {step === 1 && (
            <form onSubmit={handleSendOtp} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Email or Phone Number
                </label>
                <input
                  type="text"
                  required
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-neutral-300 focus:ring-2 focus:ring-[#2E7D32] focus:border-transparent outline-none transition-all"
                  placeholder="Enter email or phone"
                />
              </div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-[#2E7D32] hover:bg-[#1B5E20] text-white font-bold py-3 px-4 rounded-xl transition-all disabled:opacity-70"
              >
                {isLoading ? 'Sending...' : 'Send OTP'}
              </button>
            </form>
          )}

          {step === 2 && (
            <form onSubmit={handleVerifyOtp} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Enter OTP sent to {identifier}
                </label>
                <input
                  type="text"
                  required
                  maxLength={6}
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="w-full px-4 py-3 text-center tracking-[1em] text-2xl rounded-xl border border-neutral-300 focus:ring-2 focus:ring-[#2E7D32] focus:border-transparent outline-none transition-all"
                  placeholder="------"
                />
              </div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-[#2E7D32] hover:bg-[#1B5E20] text-white font-bold py-3 px-4 rounded-xl transition-all disabled:opacity-70"
              >
                {isLoading ? 'Verifying...' : 'Verify OTP'}
              </button>
              <button
                type="button"
                onClick={() => setStep(1)}
                className="w-full text-neutral-500 hover:text-neutral-800 text-sm py-2"
              >
                Change email/phone
              </button>
            </form>
          )}

          {step === 3 && (
            <form onSubmit={handleSetPassword} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Create a Password
                </label>
                <input
                  type="password"
                  required
                  minLength={6}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-neutral-300 focus:ring-2 focus:ring-[#2E7D32] focus:border-transparent outline-none transition-all"
                  placeholder="Enter secure password"
                />
              </div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-[#2E7D32] hover:bg-[#1B5E20] text-white font-bold py-3 px-4 rounded-xl transition-all disabled:opacity-70"
              >
                {isLoading ? 'Saving...' : 'Complete Sign Up'}
              </button>
            </form>
          )}

          <p className="text-center mt-6 text-neutral-600">
            Already have an account?{' '}
            <Link to="/login" className="text-[#2E7D32] font-bold hover:underline">
              Log In
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
