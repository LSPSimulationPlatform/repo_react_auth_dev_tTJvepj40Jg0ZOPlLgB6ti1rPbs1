// Import React library
import React from "react";

// Import Ant Design components for form, input, and button
import { Form, Input, Button } from "antd";

// Import icons for email and password fields
import { MailOutlined, LockOutlined } from "@ant-design/icons";

// Define TypeScript interface for the component's props
interface Props {
  // Function to handle form submission with email and password values
  onSubmit: (values: { email: string; password: string }) => void;

  // Boolean flag to show loading state during submission
  loading: boolean;
}

// Define the functional component using React.FC with props
const LoginForm: React.FC<Props> = ({ onSubmit, loading }) => {
  // Create a form instance to manage form data and actions
  const [form] = Form.useForm();

  // Return the login form layout
  return (
    <Form
      form={form} // Connect the form instance
      name="login" // Give the form a name (used internally by Ant Design)
      onFinish={onSubmit} // Trigger when form is successfully submitted
      layout="vertical" // Stack form fields vertically
      size="large" // Use large input and button sizes
    >
      {/* Email input field */}
      <Form.Item
        name="email" // Field name (used by Ant Design form data)
        label="Email" // Label displayed above the input
        rules={[
          { required: true, message: "Please input your email!" }, // Required field rule
          { type: "email", message: "Please enter a valid email!" }, // Email format validation
        ]}
      >
        <Input
          prefix={<MailOutlined />} // Add email icon before input
          placeholder="Enter your email" // Placeholder text
          style={{ borderRadius: "8px" }} // Rounded corners for the input box
        />
      </Form.Item>

      {/* Password input field */}
      <Form.Item
        name="password" // Field name
        label="Password" // Label text
        rules={[
          { required: true, message: "Please input your password!" }, // Required rule
          { min: 6, message: "Password must be at least 6 characters!" }, // Minimum length rule
        ]}
      >
        <Input.Password
          prefix={<LockOutlined />} // Add lock icon before input
          placeholder="Enter your password" // Placeholder text
          style={{ borderRadius: "8px" }} // Rounded corners for input
        />
      </Form.Item>

      {/* Submit button */}
      <Form.Item style={{ marginBottom: "16px" }}>
        <Button
          type="primary" // Use primary Ant Design button style
          htmlType="submit" // Submit form when clicked
          loading={loading} // Show loading spinner if true
          style={{
            width: "100%", // Full-width button
            height: "48px", // Consistent height
            borderRadius: "8px", // Rounded corners
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)", // Gradient background
            border: "none", // Remove border
            fontSize: "16px", // Slightly larger font
            fontWeight: "500", // Medium bold text
          }}
        >
          {/* Show different text depending on loading state */}
          {loading ? "Signing In..." : "Sign In"}
        </Button>
      </Form.Item>
    </Form>
  );
};

// Export the component for use in other files
export default LoginForm;