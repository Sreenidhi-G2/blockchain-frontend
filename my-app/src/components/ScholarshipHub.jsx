import React, { useState, useEffect } from 'react';
import { TextField, Button, Box, Typography, List, ListItem, Divider, Chip } from '@mui/material';
import axios from 'axios';
import "./styles.css";

function ScholarshipHub() {
  const [applications, setApplications] = useState([]);
  const [form, setForm] = useState({
    studentId: '',
    name: '',
    score: ''
  });
  const [showForm, setShowForm] = useState(false);

  const fetchApplications = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/scholarships');
      setApplications(res.data);
    } catch (error) {
      console.error('Error fetching applications', error);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/scholarships/apply', form);
      alert('Application submitted successfully!');
      setForm({ studentId: '', name: '', score: '' });
      fetchApplications();
      setShowForm(false);
    } catch (error) {
      alert('Error submitting application');
    }
  };

  return (
    <Box className="scholarship-container">
      <Typography variant="h4" className="page-title">Scholarship Hub</Typography>
      <Typography variant="body1" className="page-subtitle">
        Apply for scholarships and view current applications
      </Typography>
      
      {!showForm ? (
        <Box className="action-section">
          <Typography variant="body1" className="action-text">
            Ready to apply for a scholarship?
          </Typography>
          <Button 
            variant="contained" 
            className="action-button"
            onClick={() => setShowForm(true)}
          >
            Start Application
          </Button>
        </Box>
      ) : (
        <Box component="form" onSubmit={handleSubmit} className="application-form">
          <div className="form-header">
            <Typography variant="h6">New Scholarship Application</Typography>
            <span 
              className="form-close" 
              onClick={() => setShowForm(false)}
            >
              &times;
            </span>
          </div>
          
          <TextField 
            label="Student ID" 
            name="studentId" 
            value={form.studentId} 
            onChange={handleChange} 
            required 
            className="input-field"
            variant="outlined"
            placeholder="Enter your student ID"
          />
          
          <TextField 
            label="Full Name" 
            name="name" 
            value={form.name} 
            onChange={handleChange} 
            required 
            className="input-field"
            variant="outlined"
            placeholder="Enter your full name"
          />
          
          <TextField 
            label="Academic Score" 
            name="score" 
            type="number" 
            value={form.score} 
            onChange={handleChange} 
            required 
            className="input-field"
            variant="outlined"
            placeholder="Enter your academic score"
            helperText="Score should be between 0-100"
          />
          
          <Button 
            variant="contained" 
            type="submit" 
            className="submit-button"
          >
            Submit Application
          </Button>
        </Box>
      )}
      
      <Box className="applications-section">
        <Typography variant="h5" className="section-title">Current Applications</Typography>
        <Divider className="section-divider" />
        
        {applications.length === 0 ? (
          <Typography variant="body1" className="no-applications">
            No applications available at the moment.
          </Typography>
        ) : (
          <List className="scholarship-list">
            {applications.map(app => (
              <ListItem key={app.id} className="scholarship-item">
                <div className="application-info">
                  <Typography variant="subtitle1" className="applicant-name">{app.name}</Typography>
                  <Typography variant="body2" className="applicant-id">ID: {app.studentId}</Typography>
                  <div className="application-details">
                    <div className="score-badge">
                      Score: <span className="score-value">{app.score}</span>
                    </div>
                    <Chip 
                      label={app.verified ? "Verified" : "Pending"} 
                      className={`status-chip ${app.verified ? "verified" : "pending"}`}
                    />
                  </div>
                </div>
              </ListItem>
            ))}
          </List>
        )}
      </Box>
    </Box>
  );
}

export default ScholarshipHub;