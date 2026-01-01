// Import React core functions and hooks
import React, { createContext, useContext, useEffect, useState } from 'react';

import type { User, UserCredential } from "firebase/auth";

// Import Firebase authentication methods and types
import {
  createUserWithEmailAndPassword, // Creates a new user
  signInWithEmailAndPassword, // Signs in an existing user
  signOut as firebaseSignOut, // Signs out the current user
  onAuthStateChanged, // Listens for changes in authentication state
} from 'firebase/auth';

// Import initialized Firebase auth instance
import { auth } from '../firebase/config';

// Import Ant Design's message API for showing notifications
import { message } from 'antd';

// Define the shape (type) of authentication context
interface AuthContextType {
  currentUser: User | null; // Current authenticated user (null if none)
  loading: boolean; // Loading state for auth operations
  signUp: (email: string, password: string) => Promise<UserCredential>; // Function to register new user
  signIn: (email: string, password: string) => Promise<UserCredential>; // Function to log in existing user
  signOut: () => Promise<void>; // Function to log out user
}

// Create the actual React Context with default undefined value
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Custom hook to consume authentication context
export const useAuth = () => {
  const context = useContext(AuthContext); // Access context value

  // Ensure hook is used inside AuthProvider
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context; // Return the context for usage
};

// Define props for the AuthProvider component
interface AuthProviderProps {
  children: React.ReactNode; // Nested components inside provider
}

// Define AuthProvider component that wraps the app and provides auth context
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  // Store currently authenticated user
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  // Track loading state (e.g., while checking session)
  const [loading, setLoading] = useState(true);

  // --- SIGN UP FUNCTION ---
  const signUp = async (email: string, password: string): Promise<UserCredential> => {
    try {
      // Create a new user with Firebase
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      
      // Get user's authentication token
      const token = await userCredential.user.getIdToken();

      // Store token and user ID locally
      localStorage.setItem('authToken', token);
      localStorage.setItem('userId', userCredential.user.uid);

      // Success message
      message.success('Account created successfully!');
      return userCredential;
    } catch (error: any) {
      // Handle errors gracefully
      message.error(error.message || 'Failed to create account');
      throw error;
    }
  };

  // --- SIGN IN FUNCTION ---
  const signIn = async (email: string, password: string): Promise<UserCredential> => {
    try {
      // Sign in existing user with Firebase
      const userCredential = await signInWithEmailAndPassword(auth, email, password);

      // Get and store user token and ID locally
      const token = await userCredential.user.getIdToken();
      localStorage.setItem('authToken', token);
      localStorage.setItem('userId', userCredential.user.uid);

      // Notify user of success
      message.success('Signed in successfully!');
      return userCredential;
    } catch (error: any) {
      // Handle sign-in errors
      message.error(error.message || 'Failed to sign in');
      throw error;
    }
  };

  // --- SIGN OUT FUNCTION ---
  const signOut = async (): Promise<void> => {
    try {
      // Use Firebase's signOut method
      await firebaseSignOut(auth);

      // Remove stored authentication data
      localStorage.removeItem('authToken');
      localStorage.removeItem('userId');

      // Notify user
      message.success('Signed out successfully!');
    } catch (error: any) {
      // Handle sign-out errors
      message.error(error.message || 'Failed to sign out');
      throw error;
    }
  };

  // --- LISTEN FOR AUTH STATE CHANGES ---
  useEffect(() => {
    // Firebase listener to detect login/logout automatically
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user); // Update user state

      if (user) {
        // If user is logged in
        try {
          // Retrieve token and store it
          const token = await user.getIdToken();
          localStorage.setItem('authToken', token);
          localStorage.setItem('userId', user.uid);
        } catch (error) {
          console.error('Error getting user token:', error);
        }
      } else {
        // If user logs out, clear stored data
        localStorage.removeItem('authToken');
        localStorage.removeItem('userId');
      }

      // Set loading to false once auth check completes
      setLoading(false);
    });

    // Cleanup listener on component unmount
    return unsubscribe;
  }, []);

  // Context value containing everything the app needs for authentication
  const value: AuthContextType = {
    currentUser,
    loading,
    signUp,
    signIn,
    signOut
  };

  // Provide the auth context to all children components
  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};