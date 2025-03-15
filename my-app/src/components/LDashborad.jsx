import React from 'react';
import { Typography, Box, Button } from '@mui/material';
import './styles.css'; // Import external CSS file

function Dashboard() {
  // Sample data
  const stats = [
    { label: "Active Students", value: "2,547", context: "Increase of 12% from last month", type: "primary" },
    { label: "Scholarships", value: "126", context: "Over $450,000 in funds", type: "secondary" },
    { label: "Mentors", value: "89", context: "From 35 different countries", type: "success" },
    { label: "Internships", value: "64", context: "Posted in the last 30 days", type: "warning" }
  ];

  const features = [
    {
      title: "Learning Paths",
      subtitle: "Structured education tracks",
      description: "Follow our customized learning paths designed by education experts. Track your progress and earn certificates as you advance through the material.",
      icon: "🎓"
    },
    {
      title: "Mentor Connect",
      subtitle: "One-on-one guidance",
      description: "Get matched with experienced mentors in your field of interest. Schedule virtual meetings and get personalized advice for your educational journey.",
      icon: "👨‍🏫"
    },
    {
      title: "Scholarship Hub",
      subtitle: "Financial aid opportunities",
      description: "Browse through available scholarships filtered by your qualifications. We'll help you prepare and submit strong applications.",
      icon: "💰"
    }
  ];

  const activities = [
    {
      title: "New Computer Science Track Added",
      time: "Today, 10:35 AM",
      content: "A new learning path for Advanced Web Development has been added with 24 modules."
    },
    {
      title: "Scholarship Application Deadline",
      time: "Tomorrow",
      content: "Last day to apply for the STEM Excellence Scholarship for the upcoming academic year."
    },
    {
      title: "Virtual Mentorship Session",
      time: "Mar 18, 2:00 PM",
      content: "Group mentorship session on 'Preparing for Tech Careers' with industry professionals."
    },
    {
      title: "New Corporate Partner",
      time: "Mar 20",
      content: "TechCorp has joined as a partner offering 15 new internship positions for our students."
    }
  ];

  const quickActions = [
    { label: "Find Mentor", icon: "👨‍🏫" },
    { label: "Apply for Funds", icon: "💸" },
    { label: "Internships", icon: "💼" },
    { label: "Donate", icon: "❤️" },
    { label: "Community", icon: "👥" },
    { label: "Resources", icon: "📚" }
  ];

  return (
    <Box className="dashboard-container">
      <Typography variant="h4" gutterBottom className="dashboard-title">
        Welcome to EduEase
      </Typography>
      <Typography variant="body1" className="dashboard-description">
        This revolutionary platform bridges the educational divide with quality education, mentorship,
        scholarships, donations, and internship opportunities. Track your progress, connect with mentors,
        and access resources all in one place.
      </Typography>

      {/* Key Stats Section */}
      <div className="stats-grid">
        {stats.map((stat, index) => (
          <div key={index} className={`stat-card ${stat.type}`}>
            <div className="stat-label">{stat.label}</div>
            <div className="stat-number">{stat.value}</div>
            <div className="stat-context">{stat.context}</div>
          </div>
        ))}
      </div>

      {/* Featured Sections */}
      <div className="feature-cards">
        {features.map((feature, index) => (
          <div key={index} className="feature-card">
            <div className="feature-card-header">
              <div className="feature-card-icon">{feature.icon}</div>
              <Typography className="feature-card-title">{feature.title}</Typography>
              <Typography className="feature-card-subtitle">{feature.subtitle}</Typography>
            </div>
            <div className="feature-card-content">
              <Typography variant="body2">{feature.description}</Typography>
            </div>
            <div className="feature-card-action">
              <Button size="small" style={{ color: 'var(--primary)', fontWeight: 600 }}>
                Learn More
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Activity Timeline */}
      <div className="activity-timeline">
        <Typography className="timeline-title">Recent Activity</Typography>
        <div className="timeline-list">
          {activities.map((activity, index) => (
            <div key={index} className="timeline-item">
              <Typography className="timeline-item-title">{activity.title}</Typography>
              <Typography className="timeline-item-subtitle">{activity.time}</Typography>
              <Typography className="timeline-item-content">{activity.content}</Typography>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions Section */}
      <div className="quick-actions">
        <Typography className="quick-actions-title">Quick Actions</Typography>
        <div className="quick-actions-grid">
          {quickActions.map((action, index) => (
            <div key={index} className="quick-action-card">
              <div className="quick-action-icon">{action.icon}</div>
              <div className="quick-action-label">{action.label}</div>
            </div>
          ))}
        </div>
      </div>
    </Box>
  );
}

export default Dashboard;