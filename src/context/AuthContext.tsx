import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface AuthContextType {
  isLoggedIn: boolean;
  userIdentifier: string | null;
  login: (token: string, identifier: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userIdentifier, setUserIdentifier] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('auth_token');
    const identifier = localStorage.getItem('auth_identifier');
    if (token && identifier) {
      setIsLoggedIn(true);
      setUserIdentifier(identifier);
    }
  }, []);

  const login = (token: string, identifier: string) => {
    localStorage.setItem('auth_token', token);
    localStorage.setItem('auth_identifier', identifier);
    setIsLoggedIn(true);
    setUserIdentifier(identifier);
  };

  const logout = () => {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('auth_identifier');
    setIsLoggedIn(false);
    setUserIdentifier(null);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, userIdentifier, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
}
