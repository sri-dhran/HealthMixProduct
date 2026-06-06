import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAdmin } from '../context/AdminContext';

interface UserRow {
  id: number;
  identifier: string;
  isVerified: boolean;
  role: string;
  createdAt: string | null;
}

interface Message {
  id: number;
  name: string;
  email: string;
  message: string;
  createdAt: string | null;
}

interface ProductInventory {
  id: string;
  name: string;
  totalStock: number;
  availableStock: number;
}

interface Stats {
  totalUsers: number;
  verifiedUsers: number;
  unverifiedUsers: number;
  totalMessages: number;
  totalStockItems?: number;
  lowStockCount?: number;
}

type Tab = 'overview' | 'users' | 'messages' | 'inventory';

export const AdminDashboard: React.FC = () => {
  const { adminToken, adminEmail, adminLogout, isAdminLoggedIn } = useAdmin();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<Tab>('overview');
  const [stats, setStats] = useState<Stats | null>(null);
  const [users, setUsers] = useState<UserRow[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [products, setProducts] = useState<ProductInventory[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState<{ msg: string; type: 'success' | 'error' } | null>(null);

  const [editingProdId, setEditingProdId] = useState<string | null>(null);
  const [editTotalStock, setEditTotalStock] = useState<number>(0);
  const [editAvailableStock, setEditAvailableStock] = useState<number>(0);
  const [savingStock, setSavingStock] = useState(false);

  const authHeaders = { Authorization: `Bearer ${adminToken}` };

  const showToast = (msg: string, type: 'success' | 'error' = 'success') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  const fetchAll = useCallback(async () => {
    setLoading(true);
    try {
      const [statsRes, usersRes, msgsRes, productsRes] = await Promise.all([
        axios.get('/api/admin/stats', { headers: authHeaders }),
        axios.get('/api/admin/users', { headers: authHeaders }),
        axios.get('/api/admin/messages', { headers: authHeaders }),
        axios.get('/api/admin/products', { headers: authHeaders }),
      ]);
      setStats(statsRes.data);
      setUsers(usersRes.data);
      setMessages(msgsRes.data);
      setProducts(productsRes.data);
    } catch {
      showToast('Session expired. Please log in again.', 'error');
      adminLogout();
      navigate('/admin/login');
    } finally {
      setLoading(false);
    }
  }, [adminToken]);

  const handleSaveStock = async (id: string) => {
    setSavingStock(true);
    try {
      const res = await axios.put(`/api/admin/products/${id}/stock`, {
        totalStock: editTotalStock,
        availableStock: editAvailableStock
      }, { headers: authHeaders });

      setProducts(prev => prev.map(p => p.id === id ? res.data : p));
      setEditingProdId(null);
      showToast('Stock updated successfully');
      
      // Refresh stats
      const statsRes = await axios.get('/api/admin/stats', { headers: authHeaders });
      setStats(statsRes.data);
    } catch {
      showToast('Failed to update stock', 'error');
    } finally {
      setSavingStock(false);
    }
  };

  useEffect(() => {
    if (!isAdminLoggedIn) { navigate('/admin/login'); return; }
    fetchAll();
  }, [isAdminLoggedIn, fetchAll]);

  const deleteUser = async (id: number) => {
    if (!confirm('Delete this user?')) return;
    try {
      await axios.delete(`/api/admin/users/${id}`, { headers: authHeaders });
      setUsers(u => u.filter(x => x.id !== id));
      if (stats) setStats({ ...stats, totalUsers: stats.totalUsers - 1 });
      showToast('User deleted successfully');
    } catch { showToast('Failed to delete user', 'error'); }
  };

  const deleteMessage = async (id: number) => {
    if (!confirm('Delete this message?')) return;
    try {
      await axios.delete(`/api/admin/messages/${id}`, { headers: authHeaders });
      setMessages(m => m.filter(x => x.id !== id));
      if (stats) setStats({ ...stats, totalMessages: stats.totalMessages - 1 });
      showToast('Message deleted successfully');
    } catch { showToast('Failed to delete message', 'error'); }
  };

  const filteredUsers = users.filter(u =>
    u.identifier.toLowerCase().includes(search.toLowerCase())
  );

  // ── Styles ──────────────────────────────────────────────────────────────────
  const sidebarStyle: React.CSSProperties = {
    width: '240px', minHeight: '100vh', flexShrink: 0,
    background: 'linear-gradient(180deg, #0a1a0f 0%, #0f2318 100%)',
    borderRight: '1px solid rgba(46,125,50,0.2)',
    display: 'flex', flexDirection: 'column', padding: '0',
  };

  const tabItem = (tab: Tab, icon: string, label: string) => (
    <button
      key={tab}
      onClick={() => setActiveTab(tab)}
      style={{
        display: 'flex', alignItems: 'center', gap: '12px',
        padding: '14px 24px', margin: '2px 12px', borderRadius: '10px',
        background: activeTab === tab ? 'linear-gradient(135deg, rgba(46,125,50,0.3), rgba(56,142,60,0.2))' : 'transparent',
        border: activeTab === tab ? '1px solid rgba(46,125,50,0.4)' : '1px solid transparent',
        color: activeTab === tab ? '#81C784' : '#546E7A',
        fontSize: '14px', fontWeight: activeTab === tab ? 600 : 400,
        cursor: 'pointer', transition: 'all 0.2s', textAlign: 'left', width: 'calc(100% - 24px)',
      }}
    >
      <span style={{ fontSize: '18px' }}>{icon}</span>
      {label}
    </button>
  );

  const statCard = (label: string, value: number | string, icon: string, color: string) => (
    <div style={{
      background: 'rgba(255,255,255,0.03)', border: `1px solid ${color}33`,
      borderRadius: '16px', padding: '24px', flex: '1', minWidth: '160px',
      position: 'relative', overflow: 'hidden',
    }}>
      <div style={{
        position: 'absolute', top: '-10px', right: '-10px',
        fontSize: '60px', opacity: 0.08,
      }}>{icon}</div>
      <div style={{ fontSize: '13px', color: '#78909C', marginBottom: '8px', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
        {label}
      </div>
      <div style={{ fontSize: '36px', fontWeight: 800, color: color }}>
        {loading ? '—' : value}
      </div>
    </div>
  );

  return (
    <div style={{ display: 'flex', minHeight: '100vh', fontFamily: "'Inter', sans-serif", background: '#0d1a12', color: '#E0E0E0' }}>
      {/* Sidebar */}
      <aside style={sidebarStyle}>
        {/* Logo */}
        <div style={{ padding: '28px 24px 20px', borderBottom: '1px solid rgba(46,125,50,0.15)' }}>
          <div style={{ fontSize: '22px', fontWeight: 800, color: '#fff', marginBottom: '4px' }}>
            🌿 HealthMix
          </div>
          <div style={{
            display: 'inline-block', background: 'rgba(46,125,50,0.2)', color: '#4CAF50',
            fontSize: '11px', fontWeight: 700, padding: '2px 10px', borderRadius: '20px',
            letterSpacing: '1px',
          }}>
            ADMIN PANEL
          </div>
        </div>

        {/* Nav */}
        <nav style={{ flex: 1, padding: '16px 0' }}>
          {tabItem('overview', '📊', 'Overview')}
          {tabItem('users', '👥', `Users (${users.length})`)}
          {tabItem('messages', '💬', `Messages (${messages.length})`)}
          {tabItem('inventory', '📦', `Inventory (${products.length})`)}
        </nav>

        {/* User info + logout */}
        <div style={{ padding: '16px 24px', borderTop: '1px solid rgba(46,125,50,0.15)' }}>
          <div style={{ fontSize: '12px', color: '#4CAF50', marginBottom: '4px', fontWeight: 600 }}>
            Logged in as
          </div>
          <div style={{ fontSize: '13px', color: '#A5D6A7', marginBottom: '12px', wordBreak: 'break-all' }}>
            {adminEmail}
          </div>
          <button
            onClick={() => { adminLogout(); navigate('/admin/login'); }}
            style={{
              width: '100%', padding: '9px', background: 'rgba(229,57,53,0.1)',
              border: '1px solid rgba(229,57,53,0.3)', borderRadius: '8px',
              color: '#EF9A9A', fontSize: '13px', cursor: 'pointer', fontWeight: 600,
              transition: 'all 0.2s',
            }}
          >
            🚪 Sign Out
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main style={{ flex: 1, padding: '32px', overflow: 'auto' }}>
        {/* Toast */}
        {toast && (
          <div style={{
            position: 'fixed', top: '20px', right: '20px', zIndex: 9999,
            background: toast.type === 'success' ? 'rgba(46,125,50,0.95)' : 'rgba(229,57,53,0.95)',
            color: '#fff', padding: '12px 20px', borderRadius: '10px',
            fontSize: '14px', fontWeight: 600, boxShadow: '0 8px 24px rgba(0,0,0,0.3)',
            animation: 'slideIn 0.3s ease',
          }}>
            {toast.type === 'success' ? '✅' : '❌'} {toast.msg}
          </div>
        )}

        {/* Header */}
        <div style={{ marginBottom: '32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <h1 style={{ fontSize: '28px', fontWeight: 800, color: '#fff', margin: '0 0 4px' }}>
              {activeTab === 'overview' && '📊 Dashboard Overview'}
              {activeTab === 'users' && '👥 User Management'}
              {activeTab === 'messages' && '💬 Contact Messages'}
              {activeTab === 'inventory' && '📦 Product Inventory'}
            </h1>
            <p style={{ color: '#546E7A', fontSize: '14px', margin: 0 }}>
              {new Date().toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </div>
          <button
            onClick={fetchAll}
            style={{
              padding: '10px 18px', background: 'rgba(46,125,50,0.15)',
              border: '1px solid rgba(46,125,50,0.4)', borderRadius: '8px',
              color: '#81C784', cursor: 'pointer', fontSize: '13px', fontWeight: 600,
            }}
          >
            🔄 Refresh
          </button>
        </div>

        {/* ── OVERVIEW TAB ── */}
        {activeTab === 'overview' && (
          <div>
            {/* Stat cards */}
            <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', marginBottom: '32px' }}>
              {statCard('Total Users', stats?.totalUsers ?? 0, '👥', '#4CAF50')}
              {statCard('Verified Users', stats?.verifiedUsers ?? 0, '✅', '#26C6DA')}
              {statCard('Messages', stats?.totalMessages ?? 0, '💬', '#AB47BC')}
              {statCard('Total Stock', stats?.totalStockItems ?? 0, '📦', '#81C784')}
              {statCard('Low Stock Alerts', stats?.lowStockCount ?? 0, '⚠️', '#EF5350')}
            </div>

            {/* Recent users */}
            <div style={{
              background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(46,125,50,0.15)',
              borderRadius: '16px', padding: '24px', marginBottom: '24px',
            }}>
              <h2 style={{ fontSize: '18px', fontWeight: 700, color: '#fff', margin: '0 0 16px' }}>
                Recent Registrations
              </h2>
              {loading ? (
                <div style={{ color: '#546E7A', textAlign: 'center', padding: '20px' }}>Loading...</div>
              ) : users.slice(-5).reverse().map(u => (
                <div key={u.id} style={{
                  display: 'flex', alignItems: 'center', gap: '12px',
                  padding: '12px 0', borderBottom: '1px solid rgba(255,255,255,0.04)',
                }}>
                  <div style={{
                    width: '36px', height: '36px', borderRadius: '50%',
                    background: 'linear-gradient(135deg, #2E7D32, #4CAF50)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '14px', fontWeight: 700, color: '#fff', flexShrink: 0,
                  }}>
                    {u.identifier.charAt(0).toUpperCase()}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ color: '#E0E0E0', fontSize: '14px' }}>{u.identifier}</div>
                    <div style={{ color: '#546E7A', fontSize: '12px' }}>{u.createdAt ? new Date(u.createdAt).toLocaleDateString() : 'Unknown date'}</div>
                  </div>
                  <span style={{
                    padding: '3px 10px', borderRadius: '20px', fontSize: '11px', fontWeight: 700,
                    background: u.isVerified ? 'rgba(38,198,218,0.15)' : 'rgba(255,167,38,0.15)',
                    color: u.isVerified ? '#26C6DA' : '#FFA726',
                    border: `1px solid ${u.isVerified ? 'rgba(38,198,218,0.3)' : 'rgba(255,167,38,0.3)'}`,
                  }}>
                    {u.isVerified ? 'Verified' : 'Pending'}
                  </span>
                </div>
              ))}
            </div>

            {/* Recent messages */}
            <div style={{
              background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(46,125,50,0.15)',
              borderRadius: '16px', padding: '24px',
            }}>
              <h2 style={{ fontSize: '18px', fontWeight: 700, color: '#fff', margin: '0 0 16px' }}>
                Recent Messages
              </h2>
              {loading ? (
                <div style={{ color: '#546E7A', textAlign: 'center', padding: '20px' }}>Loading...</div>
              ) : messages.slice(-3).reverse().map(m => (
                <div key={m.id} style={{
                  padding: '14px', background: 'rgba(255,255,255,0.02)', borderRadius: '10px',
                  marginBottom: '10px', border: '1px solid rgba(255,255,255,0.05)',
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                    <span style={{ color: '#4CAF50', fontWeight: 600, fontSize: '14px' }}>{m.name}</span>
                    <span style={{ color: '#546E7A', fontSize: '12px' }}>{m.email}</span>
                  </div>
                  <div style={{ color: '#90A4AE', fontSize: '13px', lineHeight: '1.5' }}>
                    {m.message.length > 100 ? m.message.slice(0, 100) + '...' : m.message}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── USERS TAB ── */}
        {activeTab === 'users' && (
          <div>
            {/* Search */}
            <div style={{ marginBottom: '20px' }}>
              <input
                type="text"
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="🔍  Search by email or phone..."
                style={{
                  width: '100%', maxWidth: '400px', padding: '12px 16px', boxSizing: 'border-box',
                  background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(46,125,50,0.3)',
                  borderRadius: '10px', color: '#fff', fontSize: '14px', outline: 'none',
                }}
              />
            </div>

            {/* Table */}
            <div style={{
              background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(46,125,50,0.15)',
              borderRadius: '16px', overflow: 'hidden',
            }}>
              <div style={{
                display: 'grid', gridTemplateColumns: '1fr 2fr 120px 160px 80px',
                padding: '14px 20px', background: 'rgba(46,125,50,0.1)',
                borderBottom: '1px solid rgba(46,125,50,0.2)',
                fontSize: '12px', fontWeight: 700, color: '#81C784',
                textTransform: 'uppercase', letterSpacing: '0.5px',
              }}>
                <div>#ID</div>
                <div>Email / Phone</div>
                <div>Status</div>
                <div>Joined</div>
                <div>Action</div>
              </div>

              {loading ? (
                <div style={{ padding: '40px', textAlign: 'center', color: '#546E7A' }}>Loading users...</div>
              ) : filteredUsers.length === 0 ? (
                <div style={{ padding: '40px', textAlign: 'center', color: '#546E7A' }}>No users found</div>
              ) : filteredUsers.map((u, i) => (
                <div key={u.id} style={{
                  display: 'grid', gridTemplateColumns: '1fr 2fr 120px 160px 80px',
                  padding: '14px 20px', alignItems: 'center',
                  borderBottom: '1px solid rgba(255,255,255,0.04)',
                  background: i % 2 === 0 ? 'transparent' : 'rgba(255,255,255,0.01)',
                  transition: 'background 0.15s',
                }}>
                  <div style={{ color: '#546E7A', fontSize: '13px' }}>#{u.id}</div>
                  <div style={{ color: '#E0E0E0', fontSize: '14px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {u.identifier}
                  </div>
                  <div>
                    <span style={{
                      padding: '3px 10px', borderRadius: '20px', fontSize: '11px', fontWeight: 700,
                      background: u.isVerified ? 'rgba(38,198,218,0.15)' : 'rgba(255,167,38,0.15)',
                      color: u.isVerified ? '#26C6DA' : '#FFA726',
                      border: `1px solid ${u.isVerified ? 'rgba(38,198,218,0.3)' : 'rgba(255,167,38,0.3)'}`,
                    }}>
                      {u.isVerified ? '✓ Verified' : '⏳ Pending'}
                    </span>
                  </div>
                  <div style={{ color: '#546E7A', fontSize: '13px' }}>
                    {u.createdAt ? new Date(u.createdAt).toLocaleDateString('en-IN') : '—'}
                  </div>
                  <div>
                    <button
                      onClick={() => deleteUser(u.id)}
                      style={{
                        padding: '6px 12px', background: 'rgba(229,57,53,0.1)',
                        border: '1px solid rgba(229,57,53,0.3)', borderRadius: '6px',
                        color: '#EF9A9A', cursor: 'pointer', fontSize: '12px', fontWeight: 600,
                      }}
                    >
                      🗑 Delete
                    </button>
                  </div>
                </div>
              ))}

              {/* Footer */}
              <div style={{ padding: '12px 20px', background: 'rgba(46,125,50,0.05)', borderTop: '1px solid rgba(46,125,50,0.1)' }}>
                <span style={{ color: '#546E7A', fontSize: '13px' }}>
                  Showing {filteredUsers.length} of {users.length} users
                </span>
              </div>
            </div>
          </div>
        )}

        {/* ── MESSAGES TAB ── */}
        {activeTab === 'messages' && (
          <div>
            {loading ? (
              <div style={{ textAlign: 'center', color: '#546E7A', padding: '60px' }}>Loading messages...</div>
            ) : messages.length === 0 ? (
              <div style={{ textAlign: 'center', color: '#546E7A', padding: '60px' }}>No messages yet</div>
            ) : (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '20px' }}>
                {[...messages].reverse().map(m => (
                  <div key={m.id} style={{
                    background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(46,125,50,0.15)',
                    borderRadius: '16px', padding: '24px', position: 'relative',
                    transition: 'border-color 0.2s',
                  }}>
                    {/* Delete button */}
                    <button
                      onClick={() => deleteMessage(m.id)}
                      style={{
                        position: 'absolute', top: '16px', right: '16px',
                        padding: '5px 10px', background: 'rgba(229,57,53,0.1)',
                        border: '1px solid rgba(229,57,53,0.3)', borderRadius: '6px',
                        color: '#EF9A9A', cursor: 'pointer', fontSize: '12px',
                      }}
                    >
                      🗑
                    </button>

                    {/* Sender info */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                      <div style={{
                        width: '40px', height: '40px', borderRadius: '50%',
                        background: 'linear-gradient(135deg, #4527A0, #7B1FA2)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: '16px', fontWeight: 700, color: '#fff', flexShrink: 0,
                      }}>
                        {m.name.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <div style={{ color: '#E0E0E0', fontWeight: 700, fontSize: '15px' }}>{m.name}</div>
                        <div style={{ color: '#4CAF50', fontSize: '13px' }}>{m.email}</div>
                      </div>
                    </div>

                    {/* Message */}
                    <p style={{
                      color: '#90A4AE', fontSize: '14px', lineHeight: '1.6', margin: '0 0 16px',
                      padding: '12px', background: 'rgba(255,255,255,0.02)',
                      borderRadius: '8px', borderLeft: '3px solid rgba(46,125,50,0.4)',
                    }}>
                      {m.message}
                    </p>

                    {/* Date */}
                    {m.createdAt && (
                      <div style={{ color: '#455A64', fontSize: '12px' }}>
                        📅 {new Date(m.createdAt).toLocaleString('en-IN')}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ── INVENTORY TAB ── */}
        {activeTab === 'inventory' && (
          <div>
            {/* Search */}
            <div style={{ marginBottom: '20px' }}>
              <input
                type="text"
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="🔍  Search by product name..."
                style={{
                  width: '100%', maxWidth: '400px', padding: '12px 16px', boxSizing: 'border-box',
                  background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(46,125,50,0.3)',
                  borderRadius: '10px', color: '#fff', fontSize: '14px', outline: 'none',
                }}
              />
            </div>

            {/* Table */}
            <div style={{
              background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(46,125,50,0.15)',
              borderRadius: '16px', overflow: 'hidden',
            }}>
              <div style={{
                display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 2fr 1.5fr',
                padding: '14px 20px', background: 'rgba(46,125,50,0.1)',
                borderBottom: '1px solid rgba(46,125,50,0.2)',
                fontSize: '12px', fontWeight: 700, color: '#81C784',
                textTransform: 'uppercase', letterSpacing: '0.5px',
              }}>
                <div>Product Name</div>
                <div>Available</div>
                <div>Total</div>
                <div>Stock Status</div>
                <div>Action</div>
              </div>

              {loading ? (
                <div style={{ padding: '40px', textAlign: 'center', color: '#546E7A' }}>Loading inventory...</div>
              ) : products.filter(p => p.name.toLowerCase().includes(search.toLowerCase())).length === 0 ? (
                <div style={{ padding: '40px', textAlign: 'center', color: '#546E7A' }}>No products found</div>
              ) : products.filter(p => p.name.toLowerCase().includes(search.toLowerCase())).map((p, i) => {
                const isEditing = editingProdId === p.id;
                const percent = p.totalStock > 0 ? Math.round((p.availableStock / p.totalStock) * 100) : 0;
                
                let barColor = '#4CAF50';
                if (percent < 20) barColor = '#EF5350';
                else if (percent < 50) barColor = '#FFA726';

                return (
                  <div key={p.id} style={{
                    display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 2fr 1.5fr',
                    padding: '14px 20px', alignItems: 'center',
                    borderBottom: '1px solid rgba(255,255,255,0.04)',
                    background: i % 2 === 0 ? 'transparent' : 'rgba(255,255,255,0.01)',
                  }}>
                    <div>
                      <div style={{ color: '#E0E0E0', fontSize: '14px', fontWeight: 600 }}>{p.name}</div>
                      <div style={{ color: '#546E7A', fontSize: '11px' }}>{p.id}</div>
                    </div>

                    <div>
                      {isEditing ? (
                        <input
                          type="number"
                          value={editAvailableStock}
                          onChange={e => setEditAvailableStock(Math.max(0, parseInt(e.target.value) || 0))}
                          style={{
                            width: '70px', padding: '6px 8px', background: 'rgba(0,0,0,0.3)',
                            border: '1px solid #4CAF50', borderRadius: '6px', color: '#fff', fontSize: '14px',
                          }}
                        />
                      ) : (
                        <span style={{
                          color: p.availableStock === 0 ? '#EF5350' : p.availableStock < 50 ? '#FFA726' : '#E0E0E0',
                          fontWeight: 700, fontSize: '14px'
                        }}>
                          {p.availableStock}
                        </span>
                      )}
                    </div>

                    <div>
                      {isEditing ? (
                        <input
                          type="number"
                          value={editTotalStock}
                          onChange={e => setEditTotalStock(Math.max(0, parseInt(e.target.value) || 0))}
                          style={{
                            width: '70px', padding: '6px 8px', background: 'rgba(0,0,0,0.3)',
                            border: '1px solid #4CAF50', borderRadius: '6px', color: '#fff', fontSize: '14px',
                          }}
                        />
                      ) : (
                        <span style={{ color: '#90A4AE', fontSize: '14px' }}>
                          {p.totalStock}
                        </span>
                      )}
                    </div>

                    <div style={{ paddingRight: '20px' }}>
                      <div style={{ display: 'flex', justifycontent: 'space-between', fontSize: '11px', color: '#78909C', marginBottom: '4px' }}>
                        <span>{percent}% available</span>
                        {p.availableStock === 0 && <span style={{ color: '#EF5350', fontWeight: 700 }}>OUT OF STOCK</span>}
                      </div>
                      <div style={{ width: '100%', height: '6px', background: 'rgba(255,255,255,0.05)', borderRadius: '3px', overflow: 'hidden' }}>
                        <div style={{ width: `${Math.min(100, percent)}%`, height: '100%', background: barColor, borderRadius: '3px' }} />
                      </div>
                    </div>

                    <div>
                      {isEditing ? (
                        <div style={{ display: 'flex', gap: '8px' }}>
                          <button
                            onClick={() => handleSaveStock(p.id)}
                            disabled={savingStock}
                            style={{
                              padding: '6px 12px', background: '#2E7D32', border: 'none', borderRadius: '6px',
                              color: '#fff', cursor: 'pointer', fontSize: '12px', fontWeight: 600,
                            }}
                          >
                            {savingStock ? 'Saving...' : '💾 Save'}
                          </button>
                          <button
                            onClick={() => setEditingProdId(null)}
                            disabled={savingStock}
                            style={{
                              padding: '6px 12px', background: 'rgba(255,255,255,0.05)',
                              border: '1px solid rgba(255,255,255,0.1)', borderRadius: '6px',
                              color: '#90A4AE', cursor: 'pointer', fontSize: '12px',
                            }}
                          >
                            Cancel
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => {
                            setEditingProdId(p.id);
                            setEditTotalStock(p.totalStock);
                            setEditAvailableStock(p.availableStock);
                          }}
                          style={{
                            padding: '6px 12px', background: 'rgba(46,125,50,0.15)',
                            border: '1px solid rgba(46,125,50,0.4)', borderRadius: '6px',
                            color: '#81C784', cursor: 'pointer', fontSize: '12px', fontWeight: 600,
                          }}
                        >
                          ✏️ Edit Stock
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </main>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
        @keyframes slideIn { from { transform: translateX(20px); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
        * { scrollbar-width: thin; scrollbar-color: rgba(46,125,50,0.3) transparent; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-thumb { background: rgba(46,125,50,0.3); border-radius: 3px; }
      `}</style>
    </div>
  );
};
