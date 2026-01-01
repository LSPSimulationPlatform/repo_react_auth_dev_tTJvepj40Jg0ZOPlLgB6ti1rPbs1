// Import core React library
import React from "react";

// Import UI components from Ant Design
import { Card, Space, Avatar, Typography } from "antd";

// Import icons from Ant Design Icons
import { UserOutlined, MailOutlined, CalendarOutlined } from "@ant-design/icons";

// Destructure Typography components for easier access
const { Title, Text } = Typography;

// Define TypeScript interface for the component's props
interface Props {
  email?: string; // Optional: user's email address
  creationTime?: string; // Optional: account creation date
  formatDate: (date: string) => string; // Function to format a date string
}

// Define the functional component with typed props
const WelcomeCard: React.FC<Props> = ({ email, creationTime, formatDate }) => (
  // Ant Design Card component - serves as a container for welcome info
  <Card
    style={{
      marginBottom: "24px", // Space below the card
      borderRadius: "12px", // Rounded corners for a modern look
      background: "white", // White background for contrast
      boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)", // Soft drop shadow
    }}
  >
    {/* Space component arranges child elements horizontally with spacing */}
    <Space size="large" style={{ width: "100%" }}>
      {/* Avatar with user icon and gradient background */}
      <Avatar
        size={80} // Avatar size (large)
        icon={<UserOutlined />} // Default user icon
        style={{
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)", // Gradient background
          display: "flex", // Flexbox for centering icon
          alignItems: "center",
          justifyContent: "center",
        }}
      />

      {/* Right section containing text details */}
      <div>
        {/* Large title greeting the user */}
        <Title level={2} style={{ margin: 0, color: "#262626" }}>
          Welcome back! 🎉
        </Title>

        {/* Vertical stack for email and member info */}
        <Space direction="vertical" size="small">
          
          {/* Email row with icon and address */}
          <Space>
            <MailOutlined style={{ color: "#667eea" }} /> {/* Email icon */}
            <Text strong>{email}</Text> {/* User's email */}
          </Space>

          {/* Account creation date row */}
          <Space>
            <CalendarOutlined style={{ color: "#667eea" }} /> {/* Calendar icon */}
            <Text type="secondary">
              Member since {creationTime ? formatDate(creationTime) : "N/A"} {/* Show formatted date or 'N/A' */}
            </Text>
          </Space>

        </Space>
      </div>
    </Space>
  </Card>
);

// Export the component so it can be used in other files
export default WelcomeCard;