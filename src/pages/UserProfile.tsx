import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { User, Shield, Calendar, LogOut, Loader2, ArrowLeft } from 'lucide-react';
import { motion } from 'motion/react';

interface UserProfileData {
  identifier: string;
  role: string;
  createdAt: string | null;
  isVerified: boolean;
}

export function UserProfile() {
  const { isLoggedIn, logout } = useAuth();
  const navigate = useNavigate();
  const [profile, setProfile] = useState<UserProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/login');
      return;
    }

    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('auth_token');
        const response = await axios.get('/api/auth/me', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setProfile(response.data);
      } catch (err) {
        setError('Failed to load profile. Please log in again.');
        logout();
        navigate('/login');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [isLoggedIn, navigate, logout]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F9FBE7] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4 text-[#2E7D32]">
          <Loader2 className="w-10 h-10 animate-spin" />
          <p className="font-medium text-sm animate-pulse">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (error || !profile) return null;

  return (
    <div className="min-h-screen bg-neutral-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-neutral-500 hover:text-[#2E7D32] transition-colors mb-6 font-medium text-sm"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </button>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-3xl shadow-xl overflow-hidden border border-[#2E7D32]/10"
        >
          {/* Header Banner */}
          <div className="h-32 bg-gradient-to-r from-[#2E7D32] to-[#4CAF50] relative">
            <div className="absolute -bottom-12 left-8">
              <div className="w-24 h-24 bg-white rounded-2xl shadow-lg flex items-center justify-center p-1">
                <div className="w-full h-full bg-gradient-to-br from-[#F9FBE7] to-[#E8F5E9] rounded-xl flex items-center justify-center border border-[#2E7D32]/20">
                  <span className="text-4xl font-black text-[#2E7D32]">
                    {profile.identifier.charAt(0).toUpperCase()}
                  </span>
                </div>
              </div>
            </div>
            
            <div className="absolute top-4 right-4">
              <span className={`px-3 py-1 rounded-full text-xs font-bold shadow-sm border ${
                profile.isVerified 
                  ? 'bg-white text-[#2E7D32] border-[#2E7D32]/20' 
                  : 'bg-amber-100 text-amber-700 border-amber-200'
              }`}>
                {profile.isVerified ? '✓ Verified Account' : '⚠️ Unverified'}
              </span>
            </div>
          </div>

          <div className="pt-16 pb-8 px-8">
            <h1 className="text-2xl font-extrabold text-neutral-800 mb-1">{profile.identifier}</h1>
            <p className="text-neutral-500 text-sm mb-8 flex items-center gap-1.5">
              <Shield className="w-4 h-4 text-[#2E7D32]" />
              Role: <span className="font-semibold text-neutral-700 capitalize">{profile.role.toLowerCase()}</span>
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
              <div className="bg-neutral-50 p-5 rounded-2xl border border-neutral-100 flex items-start gap-4">
                <div className="bg-white p-3 rounded-xl shadow-sm text-[#4CAF50]">
                  <User className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-neutral-400 uppercase tracking-wider mb-1">Account ID</h3>
                  <p className="text-neutral-800 font-medium break-all">{profile.identifier}</p>
                </div>
              </div>

              <div className="bg-neutral-50 p-5 rounded-2xl border border-neutral-100 flex items-start gap-4">
                <div className="bg-white p-3 rounded-xl shadow-sm text-[#26C6DA]">
                  <Calendar className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-neutral-400 uppercase tracking-wider mb-1">Member Since</h3>
                  <p className="text-neutral-800 font-medium">
                    {profile.createdAt 
                      ? new Date(profile.createdAt).toLocaleDateString('en-US', { 
                          year: 'numeric', month: 'long', day: 'numeric' 
                        })
                      : 'Unknown'
                    }
                  </p>
                </div>
              </div>
            </div>

            <div className="border-t border-neutral-100 pt-8 flex justify-end">
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-6 py-3 bg-red-50 text-red-600 font-semibold rounded-xl hover:bg-red-100 hover:text-red-700 transition-colors shadow-sm"
              >
                <LogOut className="w-5 h-5" />
                Sign Out Securely
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
