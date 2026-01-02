// Import React to define the functional component
import React from 'react';

// Import Ant Design components for building form layout and UI elements
import { Form, Input, Button, Typography, Divider } from 'antd';

// Import icons for input fields
import { LockOutlined, MailOutlined } from '@ant-design/icons';

// Import Link for navigation to the login page
import { Link } from 'react-router-dom';

// Import custom hook that manages signup logic (form state, validation, submission)
import { useAuthForm } from '@/hooks/SignUp/useAuthForm';
import ReCaptcha from '../ReCaptcha'

// Extract Text component from Typography for better readability
const { Text } = Typography;

// Define the functional component for the Sign-Up form
const SignUpForm: React.FC = () => {
  // Use custom authentication hook for signup functionality
  // Provides form instance, loading state, and onFinish submit handler
  const { form, loading, onFinish, setCaptchaToken } = useAuthForm('signup');

  return (
    <>
      {/* --- SIGN-UP FORM --- */}
      <Form
        form={form} // Connects to Ant Design's form instance
        name="signup" // Name of the form (useful for debugging)
        onFinish={onFinish} // Executes when the form passes validation
        layout="vertical" // Vertical label + field layout
        size="large" // Larger inputs for better accessibility
      >
        {/* --- EMAIL FIELD --- */}
        <Form.Item
          name="email" // Field key for email
          label="Email" // Label above the field
          // Validation rules for the email field
          rules={[
            { required: true, message: 'Please input your email!' },
            { type: 'email', message: 'Enter valid email!' },
          ]}
        >
          {/* Input field for user email */}
          <Input
            prefix={<MailOutlined />} // Icon on the left side
            placeholder="Enter your email" // Placeholder text
            style={{ borderRadius: '8px' }} // Rounded edges
          />
        </Form.Item>

        {/* --- PASSWORD FIELD --- */}
        <Form.Item
          name="password" // Field key for password
          label="Password" // Label above the input
          // Validation rules for the password field
          rules={[
            { required: true, message: 'Please input your password!' },
            { min: 6, message: 'Min 6 characters!' },
          ]}
        >
          {/* Password input field with visibility toggle */}
          <Input.Password
            prefix={<LockOutlined />} // Lock icon
            placeholder="Enter your password" // Placeholder text
            style={{ borderRadius: '8px' }} // Rounded edges
          />
        </Form.Item>

        {/* --- CONFIRM PASSWORD FIELD --- */}
        <Form.Item
          name="confirmPassword" // Field key for password confirmation
          label="Confirm Password" // Label text
          dependencies={['password']} // Revalidate if password changes
          // Validation rules for confirming password match
          rules={[
            { required: true, message: 'Please confirm your password!' },
            ({ getFieldValue }) => ({
              validator(_, value) {
                // Ensure passwords match
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve(); // Valid
                }
                // If mismatch, reject with custom error
                return Promise.reject(new Error('The two passwords do not match!'));
              },
            }),
          ]}
        >
          {/* Password confirmation input */}
          <Input.Password
            prefix={<LockOutlined />} // Lock icon
            placeholder="Confirm your password" // Placeholder text
            style={{ borderRadius: '8px' }} // Rounded corners
          />
        </Form.Item>

        <Form.Item style={{ marginTop: 16 }}>
          <ReCaptcha onChange={setCaptchaToken} />
        </Form.Item>

        {/* --- SUBMIT BUTTON --- */}
        <Form.Item>
          {/* Submit button with gradient background and loading state */}
          <Button
            type="primary" // Primary styled button
            htmlType="submit" // Form submission trigger
            loading={loading} // Displays spinner during submission
            style={{
              width: '100%', // Full width for better layout
              height: '48px', // Taller for easier clicking
              borderRadius: '8px', // Rounded corners
              background: 'linear-gradient(135deg, #667eea, #764ba2)', // Gradient color
              border: 'none', // Remove border outline
              fontSize: '16px', // Larger font for readability
              fontWeight: '500', // Medium weight for emphasis
            }}
          >
            {/* Change button text while loading */}
            {loading ? 'Creating Account...' : 'Create Account'}
          </Button>
        </Form.Item>
      </Form>

      {/* --- DIVIDER SECTION --- */}
      <Divider>
        <Text type="secondary" style={{ fontSize: '14px' }}>
          Already have an account?
        </Text>
      </Divider>

      {/* --- NAVIGATION TO LOGIN PAGE --- */}
      <Link to="/login">
        <Button
          type="text" // Text-only button for minimal look
          style={{
            width: '100%', // Full width
            height: '48px', // Consistent height with submit button
            borderRadius: '8px', // Rounded corners
            color: '#667eea', // Brand color
            fontWeight: '500', // Medium font weight
          }}
        >
          Sign In Instead
        </Button>
      </Link>
    </>
  );
};

// Export the component to be used on the signup page
export default SignUpForm;