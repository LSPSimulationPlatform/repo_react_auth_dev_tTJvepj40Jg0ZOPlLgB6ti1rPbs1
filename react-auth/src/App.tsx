import React from 'react'; // Import React core library
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"; // Import routing components
import { ConfigProvider } from 'antd'; // Import Ant Design theme configuration
import { AuthProvider, useAuth } from "./context/AuthContext"; // Import authentication context and hook
import ProtectedRoute from "./components/ProtectedRoute"; // Import route guard for authenticated pages
import Login from "./pages/Login"; // Import Login page
import SignUp from "./pages/SignUp"; // Import SignUp page
import Dashboard from "./pages/Dashboard"; // Import Dashboard page (protected)
import NotFound from "./pages/NotFound"; // Import 404 Not Found page

// Component to handle redirection when user visits the root path "/"
const RootRedirect: React.FC = () => {
  const { currentUser, loading } = useAuth(); // Get current user and loading state from AuthContext
  
  if (loading) { // If authentication state is still loading
    return <div>Loading...</div>; // Show temporary loading text
  }

  // If user is authenticated, redirect to dashboard; otherwise, redirect to login
  return currentUser ? <Navigate to="/dashboard" replace /> : <Navigate to="/login" replace />;
};

// Main App component containing routes and global configuration
const App = () => (
  <ConfigProvider // Ant Design global theme configuration
    theme={{
      token: {
        colorPrimary: '#667eea', // Primary color used throughout the app
        borderRadius: 8, // Global border radius for components
      },
    }}
  >
    <AuthProvider> {/* Provides authentication state and functions to entire app */}
      <BrowserRouter> {/* Enables routing functionality */}
        <Routes> {/* Define all application routes */}
          <Route path="/" element={<RootRedirect />} /> {/* Root path redirects based on auth status */}
          <Route path="/login" element={<Login />} /> {/* Public login page */}
          <Route path="/signup" element={<SignUp />} /> {/* Public sign-up page */}
          
          {/* Protected route: Only accessible to authenticated users */}
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute> {/* Checks authentication before showing Dashboard */}
                <Dashboard /> {/* Dashboard page content */}
              </ProtectedRoute>
            } 
          />

          {/* Catch-all route for any undefined path — shows 404 page */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  </ConfigProvider>
);

export default App; // Export the main App component