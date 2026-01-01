// Import necessary React library
import React from "react";

// Import UI components from Ant Design
import { Card, Space, Typography, Divider, Button } from "antd";

// Import icon from Ant Design icons
import { UserOutlined } from "@ant-design/icons";

// Import Link component from react-router for navigation
import { Link } from "react-router-dom";

// Import custom LoginForm component
import LoginForm from "./LoginForm";

// Destructure specific components from Typography for easier use
const { Title, Text } = Typography;

// Define TypeScript interface for props passed into AuthCard component
interface Props {
  // Function to handle form submission
  onSubmit: (values: { email: string; password: string }) => void;

  // Boolean to show loading state (for buttons, forms, etc.)
  loading: boolean;
}

// Define the functional React component with TypeScript typing
const AuthCard: React.FC<Props> = ({ onSubmit, loading }) => (
  // Outer Card container for the authentication UI
  <Card
    style={{
      width: "100%", // Make card take full width of its container
      maxWidth: 400, // Limit maximum width for better appearance
      borderRadius: "12px", // Rounded corners
      boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)", // Subtle shadow for depth
    }}
  >
    {/* Vertical spacing wrapper for layout */}
    <Space orientation="vertical" size="large" style={{ width: "100%" }}>
      {/* Header section with icon and welcome text */}
      <div style={{ textAlign: "center" }}>
        {/* User icon at the top */}
        <UserOutlined
          style={{ fontSize: "48px", color: "#667eea", marginBottom: "16px" }}
        />

        {/* Title text */}
        <Title level={2} style={{ margin: 0, color: "#262626" }}>
          Welcome Back
        </Title>

        {/* Subtitle text */}
        <Text type="secondary">Sign in to your account</Text>
      </div>

      {/* Login form component */}
      <LoginForm onSubmit={onSubmit} loading={loading} />

      {/* Divider separating login form and sign-up section */}
      <Divider style={{ margin: "8px 0" }}>
        <Text type="secondary" style={{ fontSize: "14px" }}>
          Don't have an account?
        </Text>
      </Divider>

      {/* Sign-up link */}
      <Link to="/signup" style={{ textDecoration: "none" }}>
        <Button
          type="text"
          style={{
            width: "100%", // Full-width button
            height: "48px", // Consistent button height
            borderRadius: "8px", // Rounded button corners
            color: "#667eea", // Primary color for text
            fontWeight: "500", // Medium font weight for emphasis
          }}
        >
          Create New Account
        </Button>
      </Link>
    </Space>
  </Card>
);

// Export the component for use in other parts of the app
export default AuthCard;