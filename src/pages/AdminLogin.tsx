import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAdmin } from '../context/AdminContext';

export const AdminLogin: React.FC = () => {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { adminLogin } = useAdmin();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await axios.post('/api/admin/login', { identifier, password });
      adminLogin(res.data.token, res.data.email);
      navigate('/admin');
    } catch (err: any) {
      setError(err.response?.data?.error || 'Invalid credentials. Access denied.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0f1923 0%, #1a2a1a 50%, #0f2318 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: "'Inter', sans-serif",
      padding: '20px',
    }}>
      {/* Background grid */}
      <div style={{
        position: 'fixed', inset: 0, zIndex: 0,
        backgroundImage: 'linear-gradient(rgba(46,125,50,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(46,125,50,0.05) 1px, transparent 1px)',
        backgroundSize: '40px 40px',
      }} />

      <div style={{
        position: 'relative', zIndex: 1,
        width: '100%', maxWidth: '420px',
        background: 'rgba(15,25,20,0.9)',
        backdropFilter: 'blur(20px)',
        border: '1px solid rgba(46,125,50,0.3)',
        borderRadius: '20px',
        padding: '48px 40px',
        boxShadow: '0 24px 80px rgba(0,0,0,0.5), 0 0 40px rgba(46,125,50,0.1)',
      }}>
        {/* Shield Icon */}
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div style={{
            width: '64px', height: '64px',
            background: 'linear-gradient(135deg, #2E7D32, #4CAF50)',
            borderRadius: '16px',
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '28px', marginBottom: '16px',
            boxShadow: '0 8px 24px rgba(46,125,50,0.4)',
          }}>🛡️</div>
          <h1 style={{ color: '#fff', fontSize: '24px', fontWeight: 700, margin: '0 0 6px' }}>
            Admin Portal
          </h1>
          <p style={{ color: '#81C784', fontSize: '14px', margin: 0 }}>
            HealthMix Administration
          </p>
        </div>

        {error && (
          <div style={{
            background: 'rgba(229,57,53,0.1)', border: '1px solid rgba(229,57,53,0.3)',
            borderRadius: '10px', padding: '12px 16px', marginBottom: '20px',
            color: '#EF9A9A', fontSize: '14px', textAlign: 'center',
          }}>
            🔒 {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', color: '#A5D6A7', fontSize: '13px', fontWeight: 600, marginBottom: '8px', letterSpacing: '0.5px' }}>
              ADMIN EMAIL
            </label>
            <input
              type="email"
              value={identifier}
              onChange={e => setIdentifier(e.target.value)}
              placeholder="admin@healthmix.com"
              required
              style={{
                width: '100%', padding: '14px 16px', boxSizing: 'border-box',
                background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(46,125,50,0.3)',
                borderRadius: '10px', color: '#fff', fontSize: '15px',
                outline: 'none', transition: 'border 0.2s',
              }}
              onFocus={e => e.target.style.borderColor = '#4CAF50'}
              onBlur={e => e.target.style.borderColor = 'rgba(46,125,50,0.3)'}
            />
          </div>

          <div style={{ marginBottom: '28px' }}>
            <label style={{ display: 'block', color: '#A5D6A7', fontSize: '13px', fontWeight: 600, marginBottom: '8px', letterSpacing: '0.5px' }}>
              PASSWORD
            </label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              style={{
                width: '100%', padding: '14px 16px', boxSizing: 'border-box',
                background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(46,125,50,0.3)',
                borderRadius: '10px', color: '#fff', fontSize: '15px',
                outline: 'none', transition: 'border 0.2s',
              }}
              onFocus={e => e.target.style.borderColor = '#4CAF50'}
              onBlur={e => e.target.style.borderColor = 'rgba(46,125,50,0.3)'}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%', padding: '15px',
              background: loading ? '#1B5E20' : 'linear-gradient(135deg, #2E7D32, #388E3C)',
              border: 'none', borderRadius: '10px',
              color: '#fff', fontSize: '16px', fontWeight: 700,
              cursor: loading ? 'not-allowed' : 'pointer',
              letterSpacing: '1px', transition: 'all 0.2s',
              boxShadow: '0 4px 16px rgba(46,125,50,0.4)',
            }}
          >
            {loading ? '⏳ Verifying...' : '🔐 Access Dashboard'}
          </button>
        </form>

        <p style={{ textAlign: 'center', marginTop: '24px', color: '#546E7A', fontSize: '12px' }}>
          Authorized personnel only. All access is logged.
        </p>
      </div>
    </div>
  );
};
