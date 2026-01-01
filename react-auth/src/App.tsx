// Import React library
import React from 'react';

// Import React Router components for navigation and route setup
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Import Ant Design's ConfigProvider to apply global UI theme settings
import { ConfigProvider } from 'antd';

// Import custom authentication context provider and hook
import { AuthProvider, useAuth } from "./context/AuthContext";

// Import page components
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";

// --------------------------------------------
// 🔹 RootRedirect Component
// --------------------------------------------
// Handles redirection when user visits the root route ("/")
// Automatically sends logged-in users to /dashboard and others to /login
const RootRedirect: React.FC = () => {
  // Access current user and loading state from AuthContext
  const { currentUser, loading } = useAuth();

  // While checking authentication state, show loading indicator
  if (loading) {
    return <div>Loading...</div>;
  }

  // If user is logged in, redirect to dashboard
  // If not, redirect to login page
  return currentUser ? (
    <Navigate to="/dashboard" replace />
  ) : (
    <Navigate to="/login" replace />
  );
};

// --------------------------------------------
// 🔹 Main App Component
// --------------------------------------------
// Wraps entire app with Ant Design theme, Auth provider, and router
const App = () => (
  // Configure Ant Design global theme (colors, borders, etc.)
  <ConfigProvider
    theme={{
      token: {
        colorPrimary: '#667eea', // Custom brand color (used in buttons, links, etc.)
        borderRadius: 8, // Global default border radius
      },
    }}
  >
    {/* Provide authentication context to the whole app */}
    <AuthProvider>
      {/* Setup React Router for client-side routing */}
      <BrowserRouter>
        <Routes>
          {/* Root route — automatically redirects based on login state */}
          <Route path="/" element={<RootRedirect />} />

          {/* Public routes */}
          <Route path="/login" element={<Login />} />

          {/* Protected route placeholder — replace with real dashboard component later */}
          <Route 
            path="/dashboard" 
            element={
              <>DashBoard</> // Temporary placeholder for dashboard content
            } 
          />

          {/* Catch-all route for undefined paths (shows 404 page) */}
          {/* ⚠️ Always keep this route last */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  </ConfigProvider>
);

// Export App as the default component
export default App;