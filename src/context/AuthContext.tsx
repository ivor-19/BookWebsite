'use client'

import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import axios from '@/utils/axios';


interface User {
  _id: string;
  username: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  setUserData: (user: User | null) => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Only fetch user data once when the component mounts
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get('/api/auth/login');
        setUser(response.data);
      } catch (error) {
        // Clear user data if request fails
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };
    fetchUserData();
  }, [user]); 

  const setUserData = (userData: User | null) => {
    setUser(userData);
  };

  return (
    <AuthContext.Provider value={{ user, setUserData, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};