// Import React and required hooks
import React, { createContext, useContext, useEffect, useState } from 'react';

import type { User, UserCredential } from "firebase/auth";

// Import Firebase authentication methods and types
import {
  createUserWithEmailAndPassword, // Function to create a new user
  signInWithEmailAndPassword, // Function to sign in existing users
  signOut as firebaseSignOut, // Function to sign out
  onAuthStateChanged, // Observer for auth state changes
} from 'firebase/auth';

// Import configured Firebase auth instance
import { auth } from '../firebase/config';

// Import Ant Design message component for success/error notifications
import { message } from 'antd';

// --- INTERFACE DEFINITIONS ---

// Define the shape of the authentication context
interface AuthContextType {
  currentUser: User | null; // Currently authenticated user
  loading: boolean; // Loading state for auth initialization
  signUp: (email: string, password: string) => Promise<UserCredential>; // Function to register user
  signIn: (email: string, password: string) => Promise<UserCredential>; // Function to login user
  signOut: () => Promise<void>; // Function to log out user
}

// Create the authentication context (initially undefined)
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// --- CUSTOM HOOK: useAuth ---
// Helper hook to easily access authentication context from any component
export const useAuth = () => {
  const context = useContext(AuthContext); // Retrieve context
  if (context === undefined) {
    // Ensure hook is used within a provider
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// --- PROVIDER COMPONENT PROPS INTERFACE ---
interface AuthProviderProps {
  children: React.ReactNode; // Child components that will use the context
}

// --- AUTH PROVIDER COMPONENT ---
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  // State to store the currently authenticated user
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  // State to track whether Firebase is initializing/loading
  const [loading, setLoading] = useState(true);

  // --- SIGN UP FUNCTION ---
  const signUp = async (email: string, password: string): Promise<UserCredential> => {
    try {
      // Create user account in Firebase
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);

      // Retrieve user token and store in localStorage
      const token = await userCredential.user.getIdToken();
      localStorage.setItem('authToken', token);
      localStorage.setItem('userId', userCredential.user.uid);

      // Notify success
      message.success('Account created successfully!');
      return userCredential;
    } catch (error: any) {
      // Handle signup errors gracefully
      message.error(error.message || 'Failed to create account');
      throw error;
    }
  };

  // --- SIGN IN FUNCTION ---
  const signIn = async (email: string, password: string): Promise<UserCredential> => {
    try {
      // Sign in user using Firebase Authentication
      const userCredential = await signInWithEmailAndPassword(auth, email, password);

      // Retrieve token and persist in localStorage
      const token = await userCredential.user.getIdToken();
      localStorage.setItem('authToken', token);
      localStorage.setItem('userId', userCredential.user.uid);

      // Show success message
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
      // Sign out the current user
      await firebaseSignOut(auth);

      // Clear stored authentication data
      localStorage.removeItem('authToken');
      localStorage.removeItem('userId');

      // Notify user of successful sign-out
      message.success('Signed out successfully!');
    } catch (error: any) {
      // Handle sign-out errors
      message.error(error.message || 'Failed to sign out');
      throw error;
    }
  };

  // --- AUTH STATE LISTENER ---
  useEffect(() => {
    // Subscribe to Firebase authentication state changes
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user); // Update user state

      if (user) {
        // If user is signed in, fetch and store token
        try {
          const token = await user.getIdToken();
          localStorage.setItem('authToken', token);
          localStorage.setItem('userId', user.uid);
        } catch (error) {
          console.error('Error getting user token:', error);
        }
      } else {
        // If user signs out, clear localStorage
        localStorage.removeItem('authToken');
        localStorage.removeItem('userId');
      }

      // Set loading to false once initialization completes
      setLoading(false);
    });

    // Cleanup: unsubscribe from listener on unmount
    return unsubscribe;
  }, []);

  // --- CONTEXT VALUE OBJECT ---
  const value: AuthContextType = {
    currentUser, // Authenticated user
    loading, // Initialization/loading flag
    signUp, // Sign-up method
    signIn, // Sign-in method
    signOut // Sign-out method
  };

  // --- PROVIDER RETURN ---
  return (
    // Make authentication context available to child components
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};