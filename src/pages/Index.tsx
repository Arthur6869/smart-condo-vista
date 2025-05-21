
import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import Layout from "@/components/Layout";
import Dashboard from "@/pages/Dashboard";

// Simulate authentication
const isAuthenticated = () => {
  return localStorage.getItem("isAuthenticated") === "true";
};

const Index: React.FC = () => {
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);
  
  // Simulate checking authentication status
  useEffect(() => {
    const checkAuth = async () => {
      // For demo purposes, set authentication to true
      // In a real app, we would check with a backend API
      localStorage.setItem("isAuthenticated", "true");
      const auth = isAuthenticated();
      setAuthenticated(auth);
      setCheckingAuth(false);
    };
    
    checkAuth();
  }, []);
  
  if (checkingAuth) {
    return (
      <div className="flex h-screen w-screen items-center justify-center">
        <div className="flex flex-col items-center gap-2">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-300 border-t-blue-600"></div>
          <p className="text-muted-foreground">Carregando...</p>
        </div>
      </div>
    );
  }
  
  if (!authenticated) {
    return <Navigate to="/login" replace />;
  }
  
  return (
    <Layout>
      <Dashboard />
    </Layout>
  );
};

export default Index;
