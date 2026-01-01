// Import the authentication context to access current user and sign-out function
import { useAuth } from "@/context/AuthContext";

// Import navigation hook from React Router for redirecting users
import { useNavigate } from "react-router-dom";

// Define the custom hook to manage dashboard-related data and actions
export const useDashboardData = () => {
  // Destructure currentUser (logged-in user) and signOut (logout function) from auth context
  const { currentUser, signOut } = useAuth();

  // Initialize navigation hook for redirecting after logout
  const navigate = useNavigate();

  // --- SIGN OUT HANDLER ---
  // Function to handle user sign-out and redirect them to login page
  const handleSignOut = async () => {
    try {
      await signOut(); // Perform Firebase sign-out
      navigate("/login"); // Redirect user to login page
    } catch (error) {
      console.error("Sign out error:", error); // Log any errors that occur
    }
  };

  // --- DATE FORMATTER ---
  // Converts a timestamp string into a readable date format (e.g., "January 10, 2025")
  const formatDate = (timestamp: string) => {
    return new Date(timestamp).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // --- DAYS ACTIVE CALCULATION ---
  // Calculates how many days the user has been active based on account creation date
  const daysActive = currentUser?.metadata?.creationTime
    ? Math.floor(
        (Date.now() - // Current time in milliseconds
          new Date(currentUser.metadata.creationTime).getTime()) / // Account creation time in ms
          (1000 * 60 * 60 * 24) // Convert ms to days
      )
    : 0; // If no user, set daysActive to 0

  // Return all data and helper functions for use in dashboard components
  return { currentUser, handleSignOut, formatDate, daysActive };
};