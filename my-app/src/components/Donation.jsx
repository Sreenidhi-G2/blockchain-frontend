import React, { useState } from 'react';
import { ethers } from 'ethers';
import { TextField, Button, Box, Typography, CircularProgress, Alert } from '@mui/material';
import './styles.css';

// Replace with your deployed contract address
const EduPlatformAddress = "YOUR_DEPLOYED_CONTRACT_ADDRESS";

const EduPlatformABI = [
  "function donate() public payable"
];

function Donation() {
  const [amount, setAmount] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState({ type: '', message: '' });
  const [showForm, setShowForm] = useState(true);

  const handleDonate = async () => {
    if (!amount || isNaN(amount) || parseFloat(amount) <= 0) {
      setStatus({ type: 'error', message: 'Please enter a valid amount' });
      return;
    }

    if (!window.ethereum) {
      setStatus({ type: 'error', message: 'Please install MetaMask to make donations!' });
      return;
    }

    setIsLoading(true);
    setStatus({ type: '', message: '' });

    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(EduPlatformAddress, EduPlatformABI, signer);
      
      const tx = await contract.donate({ value: ethers.utils.parseEther(amount) });
      setStatus({ type: 'info', message: 'Transaction submitted! Waiting for confirmation...' });
      
      await tx.wait();
      setStatus({ type: 'success', message: 'Donation successful! Thank you for your contribution.' });
      setAmount("");
      setShowForm(false);
    } catch (error) {
      console.error(error);
      setStatus({ 
        type: 'error', 
        message: error.message || 'Donation failed. Please try again.'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const startNewDonation = () => {
    setShowForm(true);
    setStatus({ type: '', message: '' });
  };

  return (
    <Box className="donation-container">
      <Typography variant="h4" className="donation-title">Support Our Mission</Typography>
      <Typography variant="body1" className="donation-subtitle">
        Your contribution helps provide educational resources to students in need
      </Typography>

      {!showForm && status.type === 'success' ? (
        <Box className="donation-success">
          <div className="success-icon">✓</div>
          <Typography variant="h6" className="success-title">Thank You!</Typography>
          <Typography variant="body1" className="success-message">
            Your donation has been processed successfully.
          </Typography>
          <Button 
            variant="outlined" 
            className="restart-button"
            onClick={startNewDonation}
          >
            Make Another Donation
          </Button>
        </Box>
      ) : (
        <Box className="donation-form-wrapper">
          <div className="donation-info">
            <div className="info-item">
              <div className="info-icon">🔒</div>
              <div className="info-text">Secure blockchain transaction</div>
            </div>
            <div className="info-item">
              <div className="info-icon">⚡</div>
              <div className="info-text">Fast processing</div>
            </div>
            <div className="info-item">
              <div className="info-icon">🌍</div>
              <div className="info-text">Direct impact</div>
            </div>
          </div>

          {status.message && (
            <Alert severity={status.type} className="donation-alert">
              {status.message}
            </Alert>
          )}

          <TextField
            label="Amount in ETH"
            type="text"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="donation-input"
            variant="outlined"
            placeholder="e.g. 0.05"
            helperText="Enter the amount you wish to donate in ETH"
            disabled={isLoading}
          />

          <Button 
            className="donation-button" 
            variant="contained" 
            onClick={handleDonate}
            disabled={isLoading}
          >
            {isLoading ? <CircularProgress size={24} color="inherit" /> : 'Make Donation'}
          </Button>

          <div className="donation-footer">
            <Typography variant="body2" className="donation-disclaimer">
              By donating, you agree to our terms and conditions. Donations are non-refundable.
            </Typography>
          </div>
        </Box>
      )}
    </Box>
  );
}

export default Donation;