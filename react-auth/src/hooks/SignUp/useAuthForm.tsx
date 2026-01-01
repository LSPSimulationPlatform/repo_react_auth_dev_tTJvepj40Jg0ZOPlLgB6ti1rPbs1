// Import React hook for state management
import { useState } from 'react';

// Import navigation utilities from React Router
import { useNavigate, useLocation } from 'react-router-dom';

// Import Ant Design's Form for managing form instance and validation
import { Form } from 'antd';

// Import authentication context to use Firebase sign-in and sign-up methods
import { useAuth } from '@/context/AuthContext';

// --- INTERFACE DEFINITIONS ---

// Define structure for authentication form values
interface AuthFormValues {
  email: string; // User's email address
  password: string; // User's password
  confirmPassword?: string; // Optional field for password confirmation (used in signup)
}

// Define the authentication mode: either "login" or "signup"
type Mode = 'login' | 'signup';

// --- CUSTOM HOOK DEFINITION ---
// This hook manages login/signup logic, form state, and navigation
export const useAuthForm = (mode: Mode) => {
  // Create Ant Design form instance to control and validate fields
  const [form] = Form.useForm();

  // Manage loading state during async operations
  const [loading, setLoading] = useState(false);

  // Destructure authentication methods from context
  const { signIn, signUp } = useAuth();

  // Initialize navigation hook to redirect after success
  const navigate = useNavigate();

  // Access the current route for determining redirect paths
  const location = useLocation();

  // Determine where to redirect after successful login/signup
  // If redirected from a protected route, return to that page; otherwise, go to dashboard
  const from = (location.state as any)?.from?.pathname || '/dashboard';

  // --- FORM SUBMISSION HANDLER ---
  // Executes when the form is submitted successfully
  const onFinish = async (values: AuthFormValues) => {
    setLoading(true); // Enable loading indicator
    try {
      if (mode === 'login') {
        // If in login mode, attempt to sign in the user
        await signIn(values.email, values.password);

        // Redirect user to previous page or dashboard
        navigate(from, { replace: true });
      } else {
        // If in signup mode, create a new user account
        await signUp(values.email, values.password);

        // Redirect new users directly to dashboard
        navigate('/dashboard');
      }
    } catch (error) {
      // Log any errors encountered during login or signup
      console.error(`${mode} error:`, error);
    } finally {
      // Always disable loading spinner once operation completes
      setLoading(false);
    }
  };

  // Return useful variables and handlers to be used by form components
  return { form, loading, onFinish };
};