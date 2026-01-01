// Import React hooks and types from React and Firebase
import { createContext, useContext, useState } from 'react';
import type { User } from 'firebase/auth'; // Import the User type from Firebase Auth

// Define the shape of the authentication context data
interface AuthContextType {
  currentUser: User | null; // The currently authenticated user (null if not logged in)
  loading: boolean; // Whether authentication state is still being determined
}

// Create the authentication context with an initial undefined value
// (we'll provide it later in the AuthProvider)
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Custom hook to easily access the AuthContext in any component
export const useAuth = () => {
  // Retrieve the context value using useContext
  const context = useContext(AuthContext);

  // Throw an error if the hook is used outside of the AuthProvider
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  // Return the context value (currentUser and loading)
  return context;
};

// Define the props for the AuthProvider component
interface AuthProviderProps {
  children: React.ReactNode; // React nodes (child components) that will be wrapped by this provider
}

// Create the AuthProvider component that supplies authentication context
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  // State to hold the currently logged-in Firebase user
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  // State to indicate if authentication initialization is still in progress
  const [loading, setLoading] = useState(true);

  // Value object that will be passed to the context consumers
  const value: AuthContextType = {
    currentUser,
    loading,
  };

  // Return the provider component, wrapping the children and passing down the auth context
  return (
    <AuthContext.Provider value={value}>
      {children} {/* Render all child components inside the provider */}
    </AuthContext.Provider>
  );
};