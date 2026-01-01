// Import React core library
import React from 'react';

// Import React Router components for navigation and route handling
import { Navigate, useLocation } from 'react-router-dom';

// Import loading spinner component from Ant Design
import { Spin } from 'antd';

// Import custom authentication context hook
import { useAuth } from '../context/AuthContext';

// Define TypeScript interface for component props
interface ProtectedRouteProps {
  children: React.ReactNode; // React elements that will be rendered if the user is authenticated
}

// Define the ProtectedRoute functional component
const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  // Extract currentUser and loading state from custom AuthContext hook
  const { currentUser, loading } = useAuth();

  // Get current route location (to remember where user wanted to go)
  const location = useLocation();

  // --- STEP 1: Handle loading state ---
  // While checking authentication status (e.g., waiting for Firebase),
  // show a centered loading spinner to prevent flickering.
  if (loading) {
    return (
      <div
        style={{
          display: 'flex', // Use flexbox to center content
          justifyContent: 'center', // Horizontally center spinner
          alignItems: 'center', // Vertically center spinner
          height: '100vh', // Full viewport height
        }}
      >
        <Spin size="large" /> {/* Ant Design large loading spinner */}
      </div>
    );
  }

  // --- STEP 2: Handle unauthenticated users ---
  // If there’s no authenticated user, redirect to the login page.
  // The 'state' prop keeps track of the page the user tried to visit,
  // allowing redirection back after successful login.
  if (!currentUser) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // --- STEP 3: Authenticated user ---
  // If authentication is successful, render the protected component(s)
  return <>{children}</>;
};

// Export component so it can wrap protected routes in the app
export default ProtectedRoute;