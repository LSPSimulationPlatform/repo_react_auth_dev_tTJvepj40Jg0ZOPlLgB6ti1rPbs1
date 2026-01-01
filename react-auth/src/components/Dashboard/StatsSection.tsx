// Import React core library
import React from "react";

// Import UI components from Ant Design
import { Row, Col, Card, Statistic } from "antd";

// Import icons from Ant Design Icons
import { CalendarOutlined, TrophyOutlined, HeartOutlined } from "@ant-design/icons";

// Define TypeScript interface for component props
interface Props {
  daysActive: number; // Number of days the user has been active
}

// Define functional component with typed props
const StatsSection: React.FC<Props> = ({ daysActive }) => (
  // Ant Design Row: grid container with gutter spacing
  <Row gutter={[16, 16]} style={{ marginBottom: "24px" }}>
    
    {/* First column: Days Active statistic */}
    <Col xs={24} sm={8}>
      <Card
        style={{
          borderRadius: "12px", // Rounded corners
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)", // Blue-purple gradient background
          border: "none", // No border for a cleaner look
        }}
      >
        <Statistic
          // Title with semi-transparent white color
          title={<span style={{ color: "rgba(255, 255, 255, 0.8)" }}>Days Active</span>}
          // Dynamic value passed as prop
          value={daysActive}
          // White, large, bold number style
          valueStyle={{ color: "white", fontSize: "32px", fontWeight: "bold" }}
          // Calendar icon shown before the value
          prefix={<CalendarOutlined />}
        />
      </Card>
    </Col>

    {/* Second column: Account Status statistic */}
    <Col xs={24} sm={8}>
      <Card
        style={{
          borderRadius: "12px", // Rounded corners
          background: "linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)", // Soft orange gradient
          border: "none", // Removes default card border
        }}
      >
        <Statistic
          // Light black text for title
          title={<span style={{ color: "rgba(0, 0, 0, 0.6)" }}>Account Status</span>}
          // Static value "Verified"
          value="Verified"
          // Warm orange text style
          valueStyle={{ color: "#d17842", fontSize: "24px", fontWeight: "bold" }}
          // Trophy icon before the value
          prefix={<TrophyOutlined />}
        />
      </Card>
    </Col>

    {/* Third column: Security Level statistic */}
    <Col xs={24} sm={8}>
      <Card
        style={{
          borderRadius: "12px", // Rounded corners
          background: "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)", // Teal-pink gradient background
          border: "none", // Clean card border
        }}
      >
        <Statistic
          // Title color for good contrast
          title={<span style={{ color: "rgba(0, 0, 0, 0.6)" }}>Security Level</span>}
          // Static value "High"
          value="High"
          // Green text style to suggest positive security level
          valueStyle={{ color: "#2d9e8a", fontSize: "24px", fontWeight: "bold" }}
          // Heart icon symbolizing security or protection
          prefix={<HeartOutlined />}
        />
      </Card>
    </Col>
  </Row>
);

// Export component so it can be used elsewhere
export default StatsSection;