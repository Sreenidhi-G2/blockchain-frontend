import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { Container, AppBar, Toolbar, Button } from '@mui/material';
import Registration from './components/Registration';
import Dashboard from './components/LDashborad';
import ScholarshipHub from './components/ScholarshipHub';
import Donation from './components/Donation';
import Internships from './components/Internships';
import './components/styles.css'; // Import the styles

function App() {
  return (
    <>
      <AppBar position="static" className="appbar">
        <Toolbar className="toolbar">
          <Button color="inherit" component={Link} to="/" className="nav-button">Dashboard</Button>
          <Button color="inherit" component={Link} to="/register" className="nav-button">Register</Button>
          <Button color="inherit" component={Link} to="/scholarships" className="nav-button">Scholarship Hub</Button>
          <Button color="inherit" component={Link} to="/donate" className="nav-button">Donate</Button>
          <Button color="inherit" component={Link} to="/internships" className="nav-button">Internships</Button>
        </Toolbar>
      </AppBar>
      <Container className="main-container">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/register" element={<Registration />} />
          <Route path="/scholarships" element={<ScholarshipHub />} />
          <Route path="/donate" element={<Donation />} />
          <Route path="/internships" element={<Internships />} />
        </Routes>
      </Container>
    </>
  );
}

export default App;
