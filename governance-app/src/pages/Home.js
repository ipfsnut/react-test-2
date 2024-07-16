// src/pages/Home.js
import React from 'react';
import { Container, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Typography variant="h2" component="h1" gutterBottom>
        Welcome to DAO Governance
      </Typography>
      <Typography variant="h5" component="h2" gutterBottom>
        Participate in decentralized decision-making
      </Typography>
      <Button variant="contained" component={Link} to="/dashboard" sx={{ mt: 2 }}>
        Go to Dashboard
      </Button>
    </Container>
  );
};

export default Home;