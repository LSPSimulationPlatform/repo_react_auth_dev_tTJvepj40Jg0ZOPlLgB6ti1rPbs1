// Import React for component creation
import React from 'react'

// Import router utilities for navigation and route configuration
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"

// Import Ant Design's ConfigProvider for global theming
import { ConfigProvider, Spin } from 'antd'

// Import the AuthProvider (context) and useAuth hook to manage authentication state
import { AuthProvider, useAuth } from "./context/AuthContext"

import NotFound from "./pages/NotFound"
import Login from './pages/Login'

// ===============================
// RootRedirect Component
// ===============================

// Handles redirecting users based on authentication state
const RootRedirect: React.FC = () => {
  // Access currentUser and loading state from authentication context
  const { currentUser, loading } = useAuth()

  // If auth state is still loading, display a temporary loading screen
  if (loading) {
    return <div style={{
      display:'flex',
      alignItems:'center',
      justifyContent:'center',
      width:'100%',
      height:'100vh'
    }}><Spin/></div>
  }

  // Once loading finishes:
  // - If the user is logged in, redirect to the dashboard
  // - If not logged in, redirect to the login page
  return currentUser
    ? <Navigate to="/dashboard" replace />
    : <Navigate to="/login" replace />
}

// ===============================
// App Component
// ===============================

// Main app component that wraps everything inside providers and routers
const App = () => (
  // Ant Design ConfigProvider allows global theme customization
  <ConfigProvider
    theme={{
      token: {
        colorPrimary: '#667eea', // Sets the main brand color (purple-blue)
        borderRadius: 8,         // Global border radius for buttons, cards, etc.
      },
    }}
  >
    {/* AuthProvider gives access to auth context across the app */}
    <AuthProvider>
      {/* BrowserRouter handles client-side routing */}
      <BrowserRouter>
        {/* Routes define which component renders for each URL path */}
        <Routes>
          {/* Root route redirects depending on login state */}
          <Route path="/" element={<RootRedirect />} />

          {/* Authentication routes */}
          <Route path="/login" element={<Login/>} />

          {/* Catch-all route for undefined paths → renders 404 page */}
          {/* Add new routes ABOVE this line to avoid overriding */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  </ConfigProvider>
)

// Export the App component as default
export default App