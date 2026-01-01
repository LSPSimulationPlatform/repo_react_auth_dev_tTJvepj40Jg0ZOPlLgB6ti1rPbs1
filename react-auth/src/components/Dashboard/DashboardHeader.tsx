// Import core React library
import React from "react";

// Import UI components from Ant Design library
import { Layout, Typography, Button } from "antd";

// Import icons from Ant Design Icons
import { LogoutOutlined, RocketOutlined } from "@ant-design/icons";

// Destructure specific components for easier use
const { Header } = Layout; // The Header layout component
const { Title } = Typography; // Typography Title component for headings

// Define TypeScript interface for the component's props
interface Props {
  onSignOut: () => void; // Function to handle the sign-out action
}

// Define the functional component with props
const DashboardHeader: React.FC<Props> = ({ onSignOut }) => (
  // The Ant Design Header component serves as the top navigation bar
  <Header
    style={{
      // Gradient background color
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      // Horizontal padding on both sides
      padding: "0 24px",
      // Flexbox layout for aligning items horizontally
      display: "flex",
      justifyContent: "space-between", // Space between title and button
      alignItems: "center", // Vertically center items
      // Soft shadow for visual depth
      boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
    }}
  >
    {/* Left side: Icon and Dashboard title */}
    <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
      {/* Rocket icon symbolizing a dashboard or launch area */}
      <RocketOutlined style={{ fontSize: "24px", color: "white" }} />
      {/* Dashboard title text */}
      <Title level={3} style={{ margin: 0, color: "white" }}>
        Dashboard
      </Title>
    </div>

    {/* Right side: Sign Out button */}
    <Button
      type="text" // Text-only button (no background)
      icon={<LogoutOutlined />} // Logout icon
      onClick={onSignOut} // Calls the function passed via props when clicked
      style={{
        color: "white", // White text for contrast
        display: "flex", // Align icon and text horizontally
        alignItems: "center", // Vertically center them
        gap: "8px", // Space between icon and text
        fontWeight: "500", // Slightly bold text for readability
      }}
    >
      Sign Out {/* Button label */}
    </Button>
  </Header>
);

// Export the component so it can be used in other files
export default DashboardHeader;