// Import React for defining components
import React from 'react';

// Import React Router components for routing and navigation
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Import Ant Design’s ConfigProvider for theme customization
import { ConfigProvider } from 'antd';

// Import custom authentication context provider and hook
import { AuthProvider, useAuth } from "./context/AuthContext";

// Import page components
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import NotFound from "./pages/NotFound";
import Dashboard from './pages/Dashboard';

// --- ROOT REDIRECT COMPONENT ---
// This component handles redirecting users from the root ("/") route
// to either the Dashboard (if authenticated) or Login (if not)
const RootRedirect: React.FC = () => {
  const { currentUser, loading } = useAuth(); // Access auth state and loading flag
  
  // Display a temporary loading message while Firebase initializes
  if (loading) {
    return <div>Loading...</div>;
  }

  // Redirect based on authentication status
  // Authenticated users → Dashboard
  // Unauthenticated users → Login
  return currentUser ? <Navigate to="/dashboard" replace /> : <Navigate to="/login" replace />;
};

// --- MAIN APPLICATION COMPONENT ---
const App = () => (
  // Global theme configuration for Ant Design components
  <ConfigProvider
    theme={{
      token: {
        colorPrimary: '#667eea', // Primary theme color (purple-blue gradient tone)
        borderRadius: 8, // Default border radius for UI elements
      },
    }}
  >
    {/* Authentication provider wrapping the entire app */}
    {/* This ensures all routes have access to auth state and methods */}
    <AuthProvider>
      {/* BrowserRouter enables client-side routing */}
      <BrowserRouter>
        <Routes>
          {/* --- ROOT REDIRECT ROUTE --- */}
          <Route path="/" element={<RootRedirect />} />

          {/* --- AUTHENTICATION ROUTES --- */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/dashboard" element={<Dashboard />} />

          {/* --- CATCH-ALL 404 ROUTE --- */}
          {/* This route will match any unknown path and show the NotFound page */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  </ConfigProvider>
);

// Export the App component as the default export
export default App;