'use client'

import React, { useEffect } from 'react';
import { useAuth } from "@/context/AuthContext";
import { useRouter } from 'next/navigation';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/auth/login');
    }
  }, [user, isLoading, router]);

  // Show loading state while checking authentication
  if (isLoading) {
    return; // You can replace this with a proper loading component
  }

  // Only render children if user is authenticated
  return user ? <>{children}</> : null;
};

export default ProtectedRoute;