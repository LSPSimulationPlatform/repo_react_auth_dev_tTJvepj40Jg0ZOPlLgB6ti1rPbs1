// Import React core library
import React from "react";

// Import Ant Design Layout component for page structure
import { Layout } from "antd";

// Import child components that make up the dashboard layout
import DashboardHeader from "@/components/Dashboard/DashboardHeader"; // Header with sign-out button
import { useDashboardData } from "@/hooks/Dashboard/useDashboardData"; // Custom hook with dashboard logic
import WelcomeCard from "@/components/Dashboard/WelcomeCard"; // Top card greeting the user
import StatsSection from "@/components/Dashboard/StatsSection"; // Section showing user statistics
import AccountInfoCard from "@/components/Dashboard/AccountInfoCard"; // Card displaying account info

// Destructure Content from Ant Design Layout
const { Content } = Layout;

// Define the main Dashboard component
const Dashboard: React.FC = () => {
  // Extract useful data and functions from custom hook
  const { currentUser, handleSignOut, formatDate, daysActive } = useDashboardData();

  // Return the dashboard layout
  return (
    // Main layout wrapper from Ant Design
    <Layout style={{ minHeight: "100vh" }}> {/* Full viewport height */}
      
      {/* Header section with sign-out functionality */}
      <DashboardHeader onSignOut={handleSignOut} />

      {/* Main content area */}
      <Content
        style={{
          padding: "24px", // Inner spacing
          background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)", // Subtle gradient background
          minHeight: "calc(100vh - 64px)", // Fills the screen below header
        }}
      >
        {/* Container to center and limit width of content */}
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          
          {/* Welcome section — greets user and shows email + member since date */}
          <WelcomeCard
            email={currentUser?.email}
            creationTime={currentUser?.metadata.creationTime}
            formatDate={formatDate}
          />

          {/* Statistics section — shows account-related stats like active days */}
          <StatsSection daysActive={daysActive} />

          {/* Account information card — displays UID, email verification, provider info */}
          <AccountInfoCard
            uid={currentUser?.uid}
            emailVerified={currentUser?.emailVerified}
            lastSignInTime={currentUser?.metadata.lastSignInTime}
            formatDate={formatDate}
          />
        </div>
      </Content>
    </Layout>
  );
};

// Export Dashboard component for use in routing
export default Dashboard;