// Import React and necessary hooks for managing state and context
import React, { createContext, useContext, useEffect, useState } from 'react';

// Import Firebase authentication utilities and types
import type { User, UserCredential } from 'firebase/auth';

import {
  createUserWithEmailAndPassword, // Firebase function to create user
  signInWithEmailAndPassword, // Firebase function to log in user
  signOut as firebaseSignOut, // Firebase function to log out user
  onAuthStateChanged, // Listener for changes in authentication state
} from 'firebase/auth';

// Import the configured Firebase auth instance
import { auth } from '../firebase/config';

// Import message component from Ant Design for showing notifications
import { message } from 'antd';

// Define the shape of the authentication context
interface AuthContextType {
  currentUser: User | null; // Currently authenticated user
  loading: boolean; // Loading state for async operations
  signUp: (email: string, password: string) => Promise<UserCredential>; // Function to sign up
  signIn: (email: string, password: string) => Promise<UserCredential>; // Function to sign in
}

// Create a new context for authentication, initially undefined
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Custom hook for using the AuthContext safely
export const useAuth = () => {
  const context = useContext(AuthContext);
  
  // Throw error if used outside of AuthProvider
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  
  return context;
};

// Define props for AuthProvider component
interface AuthProviderProps {
  children: React.ReactNode; // React children (nested components)
}

// Main AuthProvider component to wrap around the app
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  // State for the currently signed-in user
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  // State for tracking loading status (useful during initialization)
  const [loading, setLoading] = useState(true);

  // --------------------------
  // 🔹 SIGN UP FUNCTION
  // --------------------------
  const signUp = async (email: string, password: string): Promise<UserCredential> => {
    try {
      // Create a new user with Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      
      // Get the user's token (for secure session storage)
      const token = await userCredential.user.getIdToken();

      // Store authentication token and user ID in localStorage
      localStorage.setItem('authToken', token);
      localStorage.setItem('userId', userCredential.user.uid);

      // Show success message to user
      message.success('Account created successfully!');
      
      return userCredential;
    } catch (error: any) {
      // Handle signup errors gracefully
      message.error(error.message || 'Failed to create account');
      throw error;
    }
  };

  // --------------------------
  // 🔹 SIGN IN FUNCTION
  // --------------------------
  const signIn = async (email: string, password: string): Promise<UserCredential> => {
    try {
      // Attempt to sign in with Firebase Auth
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      
      // Retrieve token and store it for authenticated API calls
      const token = await userCredential.user.getIdToken();
      localStorage.setItem('authToken', token);
      localStorage.setItem('userId', userCredential.user.uid);

      // Display success message
      message.success('Signed in successfully!');
      
      return userCredential;
    } catch (error: any) {
      // Handle sign-in errors gracefully
      message.error(error.message || 'Failed to sign in');
      throw error;
    }
  };

  // --------------------------
  // 🔹 AUTH STATE LISTENER (optional but recommended)
  // --------------------------
  useEffect(() => {
    // Listen for authentication state changes (login/logout)
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user); // Update current user
      setLoading(false); // Set loading to false once user state is known
    });

    // Clean up the listener when component unmounts
    return () => unsubscribe();
  }, []);

  // --------------------------
  // 🔹 CONTEXT VALUE
  // --------------------------
  const value: AuthContextType = {
    currentUser, // Authenticated user object
    loading, // Loading state
    signUp, // Signup function
    signIn, // Signin function
  };

  // --------------------------
  // 🔹 PROVIDER RETURN
  // --------------------------
  return (
    // Provide auth-related values and functions to all child components
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};