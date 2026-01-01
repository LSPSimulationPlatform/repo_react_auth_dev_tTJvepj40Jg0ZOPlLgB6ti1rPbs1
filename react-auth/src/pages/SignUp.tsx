// Import React to define and render the component
import React from 'react';

// Import Ant Design components for layout and typography
import { Card, Typography, Space } from 'antd';

// Import icon for the sign-up header
import { UserAddOutlined } from '@ant-design/icons';

// Import the separate SignUpForm component that handles form logic
import SignUpForm from '@/components/SignUp/SignUpForm';

// Extract Title and Text from Typography for easier use
const { Title, Text } = Typography;

// --- MAIN SIGN-UP PAGE COMPONENT ---
const SignUp: React.FC = () => {
  return (
    // Full-screen container centered using Flexbox
    <div
      style={{
        minHeight: '100vh', // Make the container fill the viewport height
        display: 'flex', // Use Flexbox layout
        justifyContent: 'center', // Center content horizontally
        alignItems: 'center', // Center content vertically
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', // Purple-blue gradient background
        padding: '20px', // Add padding for mobile responsiveness
      }}
    >
      {/* --- CARD CONTAINER --- */}
      {/* Ant Design Card to hold the sign-up form */}
      <Card
        style={{
          width: '100%', // Full width up to the max limit
          maxWidth: 400, // Restrict width for a compact form
          borderRadius: '12px', // Rounded corners for a modern look
          boxShadow: '0 10px 30px rgba(0,0,0,0.1)', // Soft shadow for depth
        }}
      >
        {/* Space component to organize content vertically with even spacing */}
        <Space direction="vertical" size="large" style={{ width: '100%' }}>
          {/* --- HEADER SECTION --- */}
          <div style={{ textAlign: 'center' }}>
            {/* User-add icon for visual context */}
            <UserAddOutlined
              style={{
                fontSize: '48px',
                color: '#667eea',
                marginBottom: '16px',
              }}
            />

            {/* Page title */}
            <Title level={2} style={{ margin: 0, color: '#262626' }}>
              Create Account
            </Title>

            {/* Subtitle / secondary text */}
            <Text type="secondary">Sign up to get started</Text>
          </div>

          {/* --- SIGN-UP FORM SECTION --- */}
          {/* The form is separated into its own component for reusability and cleaner code */}
          <SignUpForm />
        </Space>
      </Card>
    </div>
  );
};

// Export the SignUp component for use in routing
export default SignUp;