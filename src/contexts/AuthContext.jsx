import { createContext, useContext, useState, useCallback } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const stored = localStorage.getItem('mini-ecom-user');
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });

  const login = useCallback((email, password) => {
    // Simulation: accept any valid-format login
    const userData = { email, name: email.split('@')[0], id: Date.now() };
    setUser(userData);
    localStorage.setItem('mini-ecom-user', JSON.stringify(userData));
    return userData;
  }, []);

  const signup = useCallback((name, email, password) => {
    const userData = { email, name, id: Date.now() };
    setUser(userData);
    localStorage.setItem('mini-ecom-user', JSON.stringify(userData));
    return userData;
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem('mini-ecom-user');
  }, []);

  const value = { user, login, signup, logout, isAuthenticated: !!user };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
