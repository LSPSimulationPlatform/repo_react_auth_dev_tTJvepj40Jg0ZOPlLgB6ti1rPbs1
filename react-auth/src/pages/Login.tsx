// Import AuthCard component — contains the login UI (form, titles, and buttons)
import AuthCard from "@/components/Login/AuthCard";

// Import custom login hook that manages login logic and navigation
import { useLogin } from "@/hooks/Login/useLogin";

// Import React for component creation
import React from "react";

// --------------------------------------------
// 🔹 Login Page Component
// --------------------------------------------
// This page renders a centered login card with a gradient background.
const Login: React.FC = () => {
  // Destructure loading state and login handler from useLogin hook
  const { loading, handleLogin } = useLogin();

  return (
    // Outer container for full-screen layout
    <div
      style={{
        minHeight: "100vh", // Full viewport height
        display: "flex", // Use flexbox for centering
        justifyContent: "center", // Center horizontally
        alignItems: "center", // Center vertically
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)", // Gradient background
        padding: "20px", // Padding for spacing on smaller screens
      }}
    >
      {/* AuthCard handles the actual login form and button UI */}
      <AuthCard onSubmit={handleLogin} loading={loading} />
    </div>
  );
};

// Export Login component as the default export
export default Login;