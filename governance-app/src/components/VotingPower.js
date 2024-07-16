// src/components/VotingPower.js

import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

// Helper function to format large numbers
const formatLargeNumber = (num) => {
  if (!num) return 'N/A';
  const n = typeof num === 'string' ? parseInt(num, 10) : num;
  if (isNaN(n)) return 'N/A';
  return n.toLocaleString('en-US');
};

const VotingPower = ({ votingPower }) => {
  if (!votingPower) return null;

  return (
    <Card>
      <CardContent>
        <Typography variant="h5" component="div">
          Your Voting Power
        </Typography>
        <Typography variant="h4">
          {formatLargeNumber(votingPower.power)}
        </Typography>
        <Typography variant="body2">
          At height: {votingPower.height || 'N/A'}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default VotingPower;