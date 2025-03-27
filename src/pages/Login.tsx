
import React from 'react';
import { Navigate } from 'react-router-dom';
import LoginForm from '../components/auth/LoginForm';
import { useAuth } from '../context/AuthContext';
import { Toaster } from '@/components/ui/sonner';

const Login = () => {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-primary/5">
      <div className="absolute inset-0 bg-grid-slate-900/[0.04] -z-10" />
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <div className="text-center mb-8 animate-fade-in">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Aerospace Inventory Management</h1>
          <p className="text-muted-foreground">Advanced sensor inventory and material tracking</p>
        </div>
        <LoginForm />
      </div>
      <Toaster position="top-right" />
    </div>
  );
};

export default Login;
