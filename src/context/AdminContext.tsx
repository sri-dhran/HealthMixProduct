import React, { createContext, useContext, useState, useEffect } from 'react';

interface AdminContextType {
  adminToken: string | null;
  adminEmail: string | null;
  isAdminLoggedIn: boolean;
  adminLogin: (token: string, email: string) => void;
  adminLogout: () => void;
}

const AdminContext = createContext<AdminContextType>({
  adminToken: null,
  adminEmail: null,
  isAdminLoggedIn: false,
  adminLogin: () => {},
  adminLogout: () => {},
});

export const AdminProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [adminToken, setAdminToken] = useState<string | null>(
    localStorage.getItem('adminToken')
  );
  const [adminEmail, setAdminEmail] = useState<string | null>(
    localStorage.getItem('adminEmail')
  );

  const adminLogin = (token: string, email: string) => {
    localStorage.setItem('adminToken', token);
    localStorage.setItem('adminEmail', email);
    setAdminToken(token);
    setAdminEmail(email);
  };

  const adminLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminEmail');
    setAdminToken(null);
    setAdminEmail(null);
  };

  return (
    <AdminContext.Provider
      value={{
        adminToken,
        adminEmail,
        isAdminLoggedIn: !!adminToken,
        adminLogin,
        adminLogout,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => useContext(AdminContext);
