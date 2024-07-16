// src/pages/UserProfile.js
import React from 'react';
import { Container, Typography, Paper, Box } from '@mui/material';
import { useAuth } from '../hooks/useAuth';

const UserProfile = () => {
  const { user } = useAuth();

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ p: 3 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          User Profile
        </Typography>
        <Box sx={{ mt: 2 }}>
          <Typography variant="body1">
            <strong>Address:</strong> {user.address}
          </Typography>
          <Typography variant="body1">
            <strong>Name:</strong> {user.name}
          </Typography>
          {/* Add more user details as needed */}
        </Box>
      </Paper>
    </Container>
  );
};

export default UserProfile;