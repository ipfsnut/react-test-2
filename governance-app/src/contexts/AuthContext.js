import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // This will be replaced with Dynamic authentication later
  useEffect(() => {
    // Simulating auth check
    const checkAuth = async () => {
      // This will be replaced with actual Dynamic auth check
      const mockUser = { address: '0x123...', name: 'Mock User' };
      setUser(mockUser);
    };
    checkAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};