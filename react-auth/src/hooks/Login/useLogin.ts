// Import custom authentication context to access signIn function
import { useAuth } from "@/context/AuthContext";

// Import React hook for managing component state
import { useState } from "react";

// Import React Router hooks for navigation and route location
import { useNavigate, useLocation } from "react-router-dom";

// --------------------------------------------
// 🔹 Define TypeScript interface for form data
// --------------------------------------------
interface LoginFormValues {
  email: string;    // User email input
  password: string; // User password input
}

// --------------------------------------------
// 🔹 Custom hook for handling user login logic
// --------------------------------------------
export const useLogin = () => {
  // Loading state for showing spinner or disabling form during submission
  const [loading, setLoading] = useState(false);

  // Destructure signIn function from authentication context
  const { signIn } = useAuth();

  // React Router hook for redirecting user after login
  const navigate = useNavigate();

  // React Router hook for getting current location (used for redirecting back)
  const location = useLocation();

  // Determine redirect target after login
  // If user came from a protected route, redirect there; otherwise go to /dashboard
  const from = location.state?.from?.pathname || "/dashboard";

  // --------------------------------------------
  // 🔹 Login handler function
  // --------------------------------------------
  const handleLogin = async (values: LoginFormValues) => {
    setLoading(true); // Start loading spinner

    try {
      // Attempt to sign in using provided credentials
      await signIn(values.email, values.password);

      // Redirect user to target page after successful login
      navigate(from, { replace: true });
    } catch (error) {
      // Log any errors that occur during login
      console.error("Login error:", error);
    } finally {
      // Stop loading spinner regardless of success or failure
      setLoading(false);
    }
  };

  // Return loading state and login handler for use in components
  return { loading, handleLogin };
};