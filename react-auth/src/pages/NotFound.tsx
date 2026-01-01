// Import React and the useEffect hook
import React, { useEffect } from "react"

// Import React Router utilities for navigation and route information
import { useLocation, Link } from "react-router-dom"

// Import Ant Design UI components for layout and styling
import { Button } from "antd"

// Import a home icon for the "Back Home" button
import { HomeOutlined } from "@ant-design/icons"

// Define the NotFound component (renders when no route matches)
const NotFound: React.FC = () => {
  // useLocation gives access to the current URL path
  const location = useLocation()

  // useEffect logs an error message whenever the user visits a non-existent route
  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    )
  }, [location.pathname]) // Runs again if the route changes

  // Return the 404 error page layout
  return (
    <div
      style={{
        minHeight: "100vh", // Full viewport height
        display: "flex", // Enables flexbox
        justifyContent: "center", // Centers horizontally
        alignItems: "center", // Centers vertically
        background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)", // Soft gradient background
      }}
    >
      {/* Simple custom 404 card to avoid AntD Result JSX typing issues */}
      <div
        style={{
          textAlign: "center",
          padding: "40px",
          background: "white",
          borderRadius: "12px",
          boxShadow: "0 4px 16px rgba(0,0,0,0.08)",
          minWidth: 320,
        }}
      >
        <h1 style={{ fontSize: 64, margin: 0 }}>404</h1>
        <p style={{ marginTop: 12, color: "#666", fontSize: 16 }}>
          Sorry, the page you visited does not exist.
        </p>
        <div style={{ marginTop: 24 }}>
          <Link to="/">
            <Button
              type="primary"
              icon={<HomeOutlined />}
              style={{
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                border: "none",
                borderRadius: "8px",
                height: "40px",
                fontWeight: "500",
              }}
            >
              Back Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

// Export the component for routing usage
export default NotFound