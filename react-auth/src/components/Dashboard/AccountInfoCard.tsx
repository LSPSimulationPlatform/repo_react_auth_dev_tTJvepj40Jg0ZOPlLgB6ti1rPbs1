// Import React and necessary components from external libraries
import React from "react"; // Core React library for building components
import { Card, Row, Col, Typography, Space } from "antd"; // UI components from Ant Design
import { UserOutlined } from "@ant-design/icons"; // User icon from Ant Design Icons library

// Extract Text component from Typography for convenience
const { Text } = Typography;

// Define TypeScript interface for the component's props
interface Props {
  uid?: string; // Optional: User ID
  emailVerified?: boolean; // Optional: Whether the email is verified
  lastSignInTime?: string; // Optional: Last time user signed in
  formatDate: (date: string) => string; // Function to format date strings
}

// Define a React functional component using the Props interface
const AccountInfoCard: React.FC<Props> = ({ uid, emailVerified, lastSignInTime, formatDate }) => (
  // Ant Design Card component acts as the container for user account information
  <Card
    title={
      // The card title contains an icon and text, aligned horizontally using Space
      <Space>
        <UserOutlined style={{ color: "#667eea" }} /> {/* Blue user icon */}
        <span>Account Information</span> {/* Title text */}
      </Space>
    }
    // Styling for rounded corners and subtle shadow
    style={{
      borderRadius: "12px",
      boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
    }}
  >
    {/* Layout: Ant Design Row with spacing between columns */}
    <Row gutter={[24, 16]}>
      {/* First column: User ID */}
      <Col xs={24} md={12}>
        <Text strong>User ID</Text> {/* Bold label */}
        <Text code>{uid}</Text> {/* Displays the user ID in a code-style box */}
      </Col>

      {/* Second column: Email Verified status */}
      <Col xs={24} md={12}>
        <Text strong>Email Verified</Text> {/* Bold label */}
        <Text
          // Green if verified, red if not
          style={{ color: emailVerified ? "#52c41a" : "#ff4d4f" }}
        >
          {emailVerified ? "Yes" : "No"} {/* Conditional display */}
        </Text>
      </Col>

      {/* Third column: Last Sign-In Time */}
      <Col xs={24} md={12}>
        <Text strong>Last Sign In</Text> {/* Bold label */}
        <Text>
          {/* If a sign-in time exists, format it; otherwise display "N/A" */}
          {lastSignInTime ? formatDate(lastSignInTime) : "N/A"}
        </Text>
      </Col>

      {/* Fourth column: Provider type (hardcoded here) */}
      <Col xs={24} md={12}>
        <Text strong>Provider</Text> {/* Bold label */}
        <Text>Email/Password</Text> {/* Static text for auth provider */}
      </Col>
    </Row>
  </Card>
);

// Export the component as default so it can be imported elsewhere
export default AccountInfoCard;