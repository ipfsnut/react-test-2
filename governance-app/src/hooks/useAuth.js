// src/hooks/useAuth.js

import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  // Return a stable user object
  return {
    ...context,
    user: { address: 'osmo1cc4cv58rp7wh4dn7ekaulan60s556za662whalc7fw6ugegy20rsjsd6e4' },
  };
};