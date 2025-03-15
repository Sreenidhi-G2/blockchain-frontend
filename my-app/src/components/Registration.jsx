import React, { useState } from 'react';
import { TextField, Button, MenuItem, Box, Typography, FormHelperText } from '@mui/material';
import axios from 'axios';
import './styles.css'; // Import the external CSS file

function Registration() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    role: 'student', // Options: 'student' or 'teacher'
    password: ''
  });
  
  const [roleView, setRoleView] = useState(true); // Toggle between role selection and form

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const selectRole = (role) => {
    setForm({ ...form, role });
    setRoleView(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/users/register', form);
      alert('Registration successful: ' + JSON.stringify(res.data.user));
    } catch (error) {
      alert('Error: ' + (error.response?.data?.error || 'Registration failed'));
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} className="registration-form">
      <Typography variant="h4" className="form-title">Join Our Community</Typography>
      <Typography variant="body1" className="form-subtitle">
        Create an account to access educational resources and opportunities
      </Typography>
      
      {roleView ? (
        <>
          <Typography variant="body1" sx={{ textAlign: 'center', mb: 2 }}>
            I want to join as:
          </Typography>
          <div className="role-option">
            <div 
              className={`role-card ${form.role === 'student' ? 'active' : ''}`} 
              onClick={() => selectRole('student')}
            >
              <div className="role-icon">👨‍🎓</div>
              <div className="role-title">Student</div>
              <div className="role-description">Access learning resources and apply for opportunities</div>
            </div>
            <div 
              className={`role-card ${form.role === 'teacher' ? 'active' : ''}`} 
              onClick={() => selectRole('teacher')}
            >
              <div className="role-icon">👨‍🏫</div>
              <div className="role-title">Teacher/Volunteer</div>
              <div className="role-description">Share knowledge and post opportunities</div>
            </div>
          </div>
          <Button 
            variant="contained" 
            className="submit-button"
            onClick={() => setRoleView(false)}
          >
            Continue
          </Button>
        </>
      ) : (
        <>
          <div className="form-progress">
            <Typography variant="body2" sx={{ color: 'var(--primary)', fontWeight: 500 }}>
              Selected Role: {form.role === 'student' ? 'Student' : 'Teacher/Volunteer'} 
              <span 
                className="form-link" 
                onClick={() => setRoleView(true)}
                style={{ marginLeft: '8px', cursor: 'pointer' }}
              >
                (change)
              </span>
            </Typography>
          </div>

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
            label="Email Address" 
            name="email" 
            type="email"
            value={form.email} 
            onChange={handleChange} 
            required 
            className="input-field"
            variant="outlined"
            placeholder="your.email@example.com"
          />
          
          <TextField 
            label="Password" 
            type="password" 
            name="password" 
            value={form.password} 
            onChange={handleChange} 
            required 
            className="input-field"
            variant="outlined"
            placeholder="Create a secure password"
            helperText="At least 8 characters with letters and numbers"
          />
          
          <Button 
            variant="contained" 
            type="submit" 
            className="submit-button"
          >
            Create Account
          </Button>
          
          <div className="form-footer">
            Already have an account? 
            <span className="form-link" style={{ marginLeft: '5px' }}>
              Log In
            </span>
          </div>
        </>
      )}
    </Box>
  );
}

export default Registration;