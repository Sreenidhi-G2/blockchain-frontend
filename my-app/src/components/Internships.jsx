import React, { useState, useEffect } from 'react';
import { TextField, Button, Box, Typography, List, ListItem } from '@mui/material';
import axios from 'axios';
import './styles.css'; // Import external CSS file

function Internships() {
  const [internships, setInternships] = useState([]);
  const [applications, setApplications] = useState([]);
  const [postForm, setPostForm] = useState({
    employer: '',
    title: '',
    description: ''
  });
  const [applyForm, setApplyForm] = useState({
    internshipId: '',
    applicant: '',
    resume: ''
  });

  const fetchInternships = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/internships');
      setInternships(res.data);
    } catch (error) {
      console.error('Error fetching internships', error);
    }
  };

  const fetchApplications = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/internships/applications');
      setApplications(res.data);
    } catch (error) {
      console.error('Error fetching applications', error);
    }
  };

  useEffect(() => {
    fetchInternships();
    fetchApplications();
  }, []);

  const handlePostChange = (e) => {
    setPostForm({ ...postForm, [e.target.name]: e.target.value });
  };

  const handleApplyChange = (e) => {
    setApplyForm({ ...applyForm, [e.target.name]: e.target.value });
  };

  const handlePostSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/internships/post', postForm);
      alert('Internship posted successfully!');
      setPostForm({ employer: '', title: '', description: '' });
      fetchInternships();
    } catch (error) {
      alert('Error posting internship');
    }
  };

  const handleApplySubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/internships/apply', applyForm);
      alert('Applied successfully!');
      setApplyForm({ internshipId: '', applicant: '', resume: '' });
      fetchApplications();
    } catch (error) {
      alert('Error applying for internship');
    }
  };

  return (
    <Box className="internship-container">
      <Typography variant="h4" gutterBottom className="internship-title">
        Internship Opportunities
      </Typography>

      

      {/* Employer Section */}
      <Box className="internship-section">
        <Typography variant="h5">Post an Internship (Employers)</Typography>
        <Box component="form" onSubmit={handlePostSubmit} className="form-container">
          <TextField 
            label="Employer Name" 
            name="employer" 
            value={postForm.employer} 
            onChange={handlePostChange} 
            required 
            variant="outlined"
          />
          <TextField 
            label="Internship Title" 
            name="title" 
            value={postForm.title} 
            onChange={handlePostChange} 
            required 
            variant="outlined"
          />
          <TextField 
            label="Internship Description" 
            name="description" 
            value={postForm.description} 
            onChange={handlePostChange} 
            required 
            multiline 
            rows={3} 
            variant="outlined"
          />
          <Button variant="contained" type="submit">Post Internship</Button>
        </Box>
      </Box>

      {/* Available Internships */}
      <Box className="internship-section">
        <Typography variant="h5">Available Internships</Typography>
        <List className="internships-list">
          {internships.length === 0 ? (
            <Typography className="empty-state">No internships available at the moment.</Typography>
          ) : (
            internships.map(internship => (
              <ListItem key={internship.id} className="internship-item">
                <div className="internship-details">
                  <strong className="internship-title">{internship.title}</strong>
                  <div className="internship-company">{internship.employer}</div>
                  <p>{internship.description}</p>
                  <div className="internship-meta">
                    <span className="internship-tag">Remote</span>
                    <span className="internship-tag">Full-time</span>
                  </div>
                </div>
              </ListItem>
            ))
          )}
        </List>
      </Box>

      {/* Student Section */}
      <Box className="internship-section">
        <Typography variant="h5">Apply for an Internship (Students)</Typography>
        <Box component="form" onSubmit={handleApplySubmit} className="form-container">
          <TextField 
            label="Internship ID" 
            name="internshipId" 
            value={applyForm.internshipId} 
            onChange={handleApplyChange} 
            required 
            variant="outlined"
          />
          <TextField 
            label="Your Name" 
            name="applicant" 
            value={applyForm.applicant} 
            onChange={handleApplyChange} 
            required 
            variant="outlined"
          />
          <TextField 
            label="Resume / Summary" 
            name="resume" 
            value={applyForm.resume} 
            onChange={handleApplyChange} 
            required 
            multiline 
            rows={3} 
            variant="outlined"
          />
          <Button variant="contained" type="submit">Apply Now</Button>
        </Box>
      </Box>

      {/* Applications List */}
      <Box className="internship-section">
        <Typography variant="h5">Internship Applications</Typography>
        <List className="internships-list">
          {applications.length === 0 ? (
            <Typography className="empty-state">No applications submitted yet.</Typography>
          ) : (
            applications.map(app => (
              <ListItem key={app.id} className="internship-item">
                <div className="internship-details">
                  <div>
                    <strong>Application #{app.id}</strong>
                    <span className={`status-badge ${app.verified ? 'status-verified' : 'status-pending'}`}>
                      {app.verified ? 'Verified' : 'Pending'}
                    </span>
                  </div>
                  <div className="application-info">
                    <p>Internship ID: {app.internshipId}</p>
                    <p>Applicant: {app.applicant}</p>
                  </div>
                </div>
              </ListItem>
            ))
          )}
        </List>
      </Box>
    </Box>
  );
}

export default Internships;